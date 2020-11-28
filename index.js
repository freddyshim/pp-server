const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./services/passport');

// initialize express
const app = express();
const PORT = process.env.PORT || 8000;

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
  res.send('YEA BOIIIIIII');
});

// start server
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
