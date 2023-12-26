require('dotenv').config();


const http = require('http')
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






mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, 
useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("database connected successfully...");
}).catch(err => {
    console.log("connection failed...");
});

// session store

let store = new MongoStore({
   mongoUrl: url,
   collection: "sessions"
});

 // session config

 app.use(session({
   secret: "MySecret",
   resave: false,
   store: store,
   saveUninitialized: false,
   cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
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