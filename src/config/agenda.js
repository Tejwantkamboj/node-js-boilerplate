import { Agenda } from 'agenda';
import { MongoBackend } from '@agendajs/mongo-backend';
import config from './config.js';

const agendaInstance = new Agenda({
  backend: new MongoBackend({
    address: config.mongoose.url,
    collection: 'agendaJobs',
  }),
  processEvery: config.agenda.agendaProcessEvery,
  maxConcurrency: config.agenda.maxConcurrency,
  defaultConcurrency: config.agenda.defaultConcurrency,
  defaultLockLifetime: config.agenda.defaultLockLifetime,
});

export default agendaInstance;
