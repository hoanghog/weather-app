require('express-async-errors');

import express from 'express';
import config from 'config';
import actuator from 'express-actuator';

import ActuatorService from '#v1-services/actuator-service';

import weatherRouter from '#v1-routes/weather-route';

async function start() {
  const PORT = 3001;
  const app = express();
  const port = config.get<number>('server.port') || PORT;
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

  app.use('/weather', weatherRouter);

  app.listen(port);
  console.log(`Listening on ${port} port.`);
}

start();
