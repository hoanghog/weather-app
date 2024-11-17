require('express-async-errors');

import express from 'express';
import config from 'config';
import actuator from 'express-actuator';
import swaggerUi from 'swagger-ui-express';

import ActuatorService from '#v1-services/actuator-service';

import weatherRouter from '#v1-routes/weather-route';

import MongoDB from '#lib/mongo-db';
import Agenda from '#lib/agenda';

import error from '#middlewares/error-middleware';

async function start() {
  const PORT = 3001;
  const app = express();
  const port = config.get<number>('server.port') || PORT;

  await MongoDB.connect();
  await Agenda.initialize();

  app.use(
    actuator({
      basePath: '/mngmt',
      infoGitMode: 'full',
      customEndpoints: [
        {
          id: 'readiness',
          controller: async (req, res) => {
            try {
              await ActuatorService.isReady();
              res.sendStatus(200);
            } catch (e) {
              res.sendStatus(502);
            }
          }
        },
        {
          id: 'liveness',
          controller: async (req, res) => {
            try {
              await ActuatorService.isReady();
              res.sendStatus(200);
            } catch (e) {
              res.sendStatus(502);
            }
          }
        }
      ]
    })
  );

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: '50mb' }));

  app.use('/v1/weather', weatherRouter);

  try {
    const swaggerDocument = require('../swagger.json');
    app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (err: any) {
    console.error(err, undefined, 'Unable to read swagger.json, try to call "npm run swagger" before application start.');
  }

  app.use(error);

  app.listen(port);
  console.log(`Listening on ${port} port.`);
}

start();
