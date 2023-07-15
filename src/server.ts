import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';
import config from './config';

// handle uncaught exceptions
process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

let server: Server;

async function connectDB() {
  try {
    await mongoose.connect(config.database_url as string);
    console.info(`🛢 Database is connected successfully`);
    app.listen(config.port, () => {
      console.info(`Application listening on port: ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to connect database', error);
  }

  // handle unhandled rejection
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

connectDB();

// handle signals termination
process.on('SIGTERM', () => {
  console.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
