const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const { IP, PORT } = require('./utils/ip');
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
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://${IP}:${PORT}`);
});
