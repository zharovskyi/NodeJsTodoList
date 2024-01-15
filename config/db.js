import mongoose from 'mongoose';
import DB_PASSWORD from './secret.js';

const URL = `mongodb+srv://olegzhora11:${DB_PASSWORD}@cluster0.wicvwtp.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(URL)
  .then(() => console.log(`Connected to Mongodb`))
  .catch((error) => {
    console.log('Error Connect to Mongo DB ', error);
  });
