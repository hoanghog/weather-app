#!/bin/bash
sudo yum update -y
sudo amazon-linux-extras enable docker
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker

aws configure set default.region eu-central-1

OPEN_AI_API_KEY=$(aws ssm get-parameter --name "/prod/open_ai_api_key" --with-decryption --query "Parameter.Value" --output text)
GOOGLE_MAP_API_KEY=$(aws ssm get-parameter --name "/prod/google_map_api_key" --with-decryption --query "Parameter.Value" --output text)
WEATHER_API_KEY=$(aws ssm get-parameter --name "/prod/weather_api_key" --with-decryption --query "Parameter.Value" --output text)
MONGODB_CONNECTION_STRING=$(aws ssm get-parameter --name "/prod/mongo_db_connection_string" --with-decryption --query "Parameter.Value" --output text)

sudo cat <<EOF > ./app.env
OPEN_AI_API_KEY=$OPEN_AI_API_KEY
GOOGLE_MAP_API_KEY=$GOOGLE_MAP_API_KEY
WEATHER_API_KEY=$WEATHER_API_KEY
MONGODB_CONNECTION_STRING=$MONGODB_CONNECTION_STRING
EOF

docker run -d -p 3001:3001 --env-file /app.env hoanghog/weather-app