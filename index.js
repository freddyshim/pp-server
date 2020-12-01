const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const { IP, PORT } = require('./utils/ip');
require('./services/passport');

// initialize express
const app = express();

// initialize express middleware
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// initialize routes
require('./routes/authRoutes')(app);
app.get('/', (req, res) => {
  res.send({ data: 'YEA BOIIIIIIIII' });
});

// start server
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://${IP}:${PORT}`);
});
