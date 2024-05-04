var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gRouter = require('./routes/grid');
var rRouter = require('./routes/pick');
var wRouter = require('./routes/watches');
var watch = require("./models/watches");
var resouce = require("./routes/resource");
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username })
  .then(function (user){
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })
  .catch(function(err){
  return done(err)
  })
  })
  )

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gRouter);
app.use('/img', rRouter);
app.use('/watches', wRouter);
app.use('/resource', resouce);
//app.use('/watches', wRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});
// We can seed the collection if needed on server start
async function recreateDB(){
// Delete everything
await watch.deleteMany();
let instance1 = new
watch({watch_brand:"ghost", watch_type:'large',
cost:15.4});
instance1.save().then(doc=>{
console.log("First object saved")}
).catch(err=>{
console.error(err)
});
//await watch.deleteMany();
let instance2 = new
watch({watch_brand:"fossil", watch_type:'large',
cost:15.4});
instance2.save().then(doc=>{
console.log("First object saved")}
).catch(err=>{
console.error(err)
});
//await watch.deleteMany();
let instance3 = new
watch({watch_brand:"rolex", watch_type:'large',
cost:15.4});
instance3.save().then(doc=>{
console.log("First object saved")}
).catch(err=>{
console.error(err)
});
}
let reseed = true;
if (reseed) {recreateDB();}

module.exports = app;
