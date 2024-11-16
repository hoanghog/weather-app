import Agenda, { Job } from 'agenda';
import config from 'config';

import WeatherService from '#v1-services/weather-service';

import AgendaDb from '#v1-database/agenda-db';

const mongoConnectionString = config.get<string>('mongodb.connection-string');

const HOUR = 3600000;

class AgendaClass {
  private _agenda: Agenda;
  constructor() {
    this._agenda = new Agenda({ db: { address: mongoConnectionString } });

    this.agenda.define('generateForecastBratislava', async () => {
      await WeatherService.generateNews('Bratislava');
    });

    this.agenda.define('generateForecastMunich', async () => {
      await WeatherService.generateNews('Munich');
    });

    this.agenda.define('generateForecastParis', async () => {
      await WeatherService.generateNews('Paris');
    });

    this.agenda.define('generateForecastWarsaw', async () => {
      await WeatherService.generateNews('Warsaw');
    });

    this.agenda.define('generateForecastPrague', async () => {
      await WeatherService.generateNews('Prague');
    });

    this.agenda.on('fail', async (err: Error, job: Job) => {
      if (job?.attrs?.failCount && job.attrs.failCount < 5) {
        const date = new Date();
        date.setTime(date.getTime() + HOUR);
        job.attrs.nextRunAt = date;
        job.save();
      } else {
        await AgendaDb.create(job.attrs);
      }

      console.error(err);
    });
  }

  async initialize() {
    await this.agenda.start();
    // Needs to wait cause rate limit on ChatGPT side
    await this.agenda.every('0 14 * * *', 'generateForecastBratislava');
    await this.agenda.every('7 14 * * *', 'generateForecastMunich');
    await this.agenda.every('15 14 * * *', 'generateForecastParis');
    await this.agenda.every('22 14 * * *', 'generateForecastWarsaw');
    await this.agenda.every('30 14 * * *', 'generateForecastPrague');
  }

  private get agenda() {
    return this._agenda;
  }
}

export default new AgendaClass();
