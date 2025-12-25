import config from './config';
import app from './server';

const server = app.listen(config.PORT, () => {
  console.log(`Health Metrics API listening on port ${config.PORT}`)
})