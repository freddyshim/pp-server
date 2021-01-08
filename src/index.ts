import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import bodyParser from 'body-parser';
import { Keys } from './config/Keys';
import { AppRouter } from './AppRouter';
import { Network } from './utils/Network';

import './models/User';
import './services/passport';
import './controllers/RootController';
import './controllers/AuthController';

// initialize mongoose
mongoose.connect(
  Keys.mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (error): void => {
    if (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
      console.log('Connection to database failed. Try restarting the server.');
    }
  }
);

// initialize express
const app = express();

// initialize express middleware
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// initialize routes
app.use(AppRouter.instance);

// start server
app.listen(3000, () => {
  console.log(`Server is running at ${Network.address}`);
});
