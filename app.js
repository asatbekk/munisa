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




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://asatcom26:CvxofHyNZV8of8UO@cluster0.gp5wbn9.mongodb.net/blog?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


const mongoose = require('mongoose');

module.exports = connectDB;




mongoose.connect("mongodb+srv://asatcom26:CvxofHyNZV8of8UO@cluster0.gp5wbn9.mongodb.net/blog" || process.env.MONGODB_URI||'mongodb://192.168.1.249:27017/', {  useCreatendex: true, 
  useFindAndModify: false, 
  useNewUrlParser: true, 
  useUnifiedTopology: true });
const connection = mongoose.connection;


// session store

let store = new MongoStore({
   mongoUrl:"mongodb+srv://asatcom26:CvxofHyNZV8of8UO@cluster0.gp5wbn9.mongodb.net/blog"|| process.env.MONGODB_URI ||'mongodb://192.168.1.249:27017/',
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