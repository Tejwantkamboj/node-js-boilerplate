import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import routes from './routes/index.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.options('*', cors());

// v1 api routes
app.use('/v1', routes);

app.listen(7000, () => {
  console.log('server is listening');
});
