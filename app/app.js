const express = require("express");
const app = express();
const session = require('express-session');
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");

// view engine setup
app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));

const sessionSettings = {
  secret: '4f5bc421495bd6ba115647561c52403c',
  resave: false,
  saveUninitialized: true,
  cookie: {}
};

if (app.get('env') === 'production') {
  sessionSettings.cookie.secure = true // serve secure cookies
}

app.use(session(sessionSettings));

app.use('/', homeRoutes);
app.use('/auth', authRoutes);

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send(err.message);
// });

module.exports = app;