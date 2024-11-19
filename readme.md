# Weather App

Simple WeatherApp for actual and historical forecast data in multiple languages and style of interpretation.

## Dependencies

Application is using GoogleMap API to get coordinates from location, OpenWeatherMap for forecast information, MongoDB to store data and OpenAI for generating forecast newr

## Environmental variables

```
OPEN_AI_API_KEY - OpenAI ApiKey
GOOGLE_MAP_API_KEY - GoogleMap ApiKey
WEATHER_API_KEY - OpenWeatherMap ApiKey
MONGODB_CONNECTION_STRING - MongoDB connection string for data storing
```

# Architecture

Application using express framework for REST API endpoints, Joi validator for input validation, Axios for REST calls. For storing using MongoDB and for generating using Agenda job scheduler.

## CI

For continuous integration using GitHub actions to build NodeJs application and then creating docker image which is published into docker repository.

## CD

For continuous delivery using Terraform IaC on AWS where docker image is deployed on EC2 instance.

## Swagger

Swagger can be found on /apiDocs path.

# Future work

- [ ] Better error handling, with persistency logging
- [ ] Better logging integrated with logging tools such as ELK Stack
- [ ] Write tests
- [ ] Use caching with Redis
- [ ] Minimize docker image size
- [ ] Authorization and authentication
- [ ] High availability with blue green deployments
