/* eslint-disable no-console */
import mongoose from 'mongoose';
import { Server } from 'http';
import config from './app/config';
import app from './app';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server
async function main() {
  try {
    mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

//* asynchronous code error handle: server off if asynchronous code error get  
process.on('unhandledRejection', () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//* synchronous code error handle: server off if synchronous code error get
process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});


