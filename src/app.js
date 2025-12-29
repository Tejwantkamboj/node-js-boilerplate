import express from 'express';
import cors from 'cors';
import config from './config/config.js';
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.options('*', cors());

// ✅ test route only
app.use('/v1', (req, res) => {
  res.send('v1 working');
});

app.listen(7000, () => {
  console.log('server is listening');
  console.log("congig",config)
});
