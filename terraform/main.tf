terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket         = "terraform-weather"
    key            = "weather-app/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "terraform-lock"
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "eu-central-1"
}

# Creating a VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = {
    "Name" = "Weather challenge"
  }
}

# Creating a subnet in the VPC
resource "aws_subnet" "web" {
  count = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    "Name" = "Web subnet"
  }
}

data "aws_availability_zones" "available" {}

# Creating an Intenet Gateway
resource "aws_internet_gateway" "my_web_igw" {
  vpc_id = aws_vpc.main.id
  tags = {
    "Name" = "challenge IGW"
  }
}

# #  Associating the IGW to the default RT
resource "aws_default_route_table" "main_vpc_default_rt" {
  default_route_table_id = aws_vpc.main.default_route_table_id

  route {
    cidr_block = "0.0.0.0/0" # default route
    gateway_id = aws_internet_gateway.my_web_igw.id
  }
  tags = {
    "Name" = "Default RT"
  }
}

# Default Security Group
resource "aws_default_security_group" "default_sec_group" {
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    "Name" = "Default Security Group"
  }
}

resource "aws_security_group" "alb_sg" {
  name        = "alb-sg"
  description = "Allow HTTP traffic to ALB"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" 
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Weather ALB SG"
  }
}
resource "aws_lb" "my_alb" {
  name               = "weather-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = aws_subnet.web[*].id

  tags = {
    Name = "Weather ALB"
  }
}

data "aws_ami" "latest_amazon_linux2" {
  owners      = ["amazon"]
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-kernel-*-x86_64-gp2"]
  }
  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}

resource "aws_key_pair" "key_pair" {
  key_name   = "challenge_ssh_key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDT3ZzLbzYUrtZC2X0dPtyPubrGYYJDqsHa0IX4OfJB5wkhARPCioAl99hG1CK6c6n7FDv4GEllQt2Y4Kn7i3+h6znQ2wXRrorLnsRNCvxLb/OJy5LwT7WOrvvsUaF62j3BWkiZ0c52SVbLuW5umo6AEKfMQaXhD+EvSLgtZXfkcrFCsQDeG3lnPyrOZhzHNqHK6TRDDhgpfyrveLD7cjL92dIz8ikuGTczfIO6XoiLSuBEmAQXV6eWMrbCYYyjDodVPIU5eRh3jpr9roXCgMluhhgSOCraMU/CtU+CEzqLQ2CQDH8FY2sUy2gKXtKtINdVw4akJ2qwnlERqxvn/YZV martinhoangdev@gmail.com"
}

data "aws_iam_role" "ec2_role" {
  name = "ec2-role"
}

resource "aws_instance" "weather_app" {
  ami                         = data.aws_ami.latest_amazon_linux2.id
  instance_type               = "t2.micro"
  subnet_id                   = aws_subnet.web[0].id
  vpc_security_group_ids      = [aws_default_security_group.default_sec_group.id]
  associate_public_ip_address = true
  key_name                    = aws_key_pair.key_pair.key_name
  iam_instance_profile        = data.aws_iam_role.ec2_role.name
  user_data                   = file("script.sh")

  tags = {
    "Name" : "Amazon Linux 2023"
  }
}

resource "aws_lb_target_group" "my_target_group" {
  name     = "weather-tg"
  port     = 3001
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    path                = "/mngmt/liveness"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  tags = {
    Name = "Weather TG"
  }
}

resource "aws_lb_target_group_attachment" "my_target_attachment" {
  count             = 1
  target_group_arn  = aws_lb_target_group.my_target_group.arn
  target_id         = aws_instance.weather_app.id
  port              = 3001
}

resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.my_alb.arn 
  port              = 80               
  protocol          = "HTTP"           

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.my_target_group.arn
  }
}
