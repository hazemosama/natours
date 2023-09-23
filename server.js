/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  console.log('DB Connection succesful!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
