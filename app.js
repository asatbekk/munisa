require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app = express();
const PORT = process.env.PORT || 5000;
  
// Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://asatcom26:CvxofHyNZV8of8UO@cluster0.gp5wbn9.mongodb.net/blog"
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}));

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.locals.isActiveRoute = isActiveRoute; 


app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT, ()=> {
  console.log(`App listening on port ${PORT}`);
});
