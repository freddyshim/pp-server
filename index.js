require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// initialize mongoose
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// initialize express
const app = express();

// initialize express middleware
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// initialize routes
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
app.get('/', (req, res) => {
  res.send({ data: 'YEA BOIIIIIIIII' });
});

// start server
app.listen(3000);
