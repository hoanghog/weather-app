variable "vpc_cidr_block" {
  description = "CIDR Block for the VPC"
  type        = string
}

variable "region" {
  description = "AWS Region"
  type        = string
}

variable "web_subnet" {
  description = "Web Subnet"
  type        = string
}

variable "app_port" {
  description = "Nodejs application port"
  type        = string
}

variable "subnet_zone" {

}

variable "main_vpc_name" {

}

variable "public_key" {

}