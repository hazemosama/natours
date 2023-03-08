/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  console.log('DB Connection succesful!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
