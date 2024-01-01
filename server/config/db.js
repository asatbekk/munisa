const mongoose = require('mongoose');
const connectDB = async () => {
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect("mongodb+srv://asatcom26:CvxofHyNZV8of8UO@cluster0.gp5wbn9.mongodb.net/blog"|| process.env.MONGODB_URI  ||'mongodb://192.168.1.249:27017/');
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }

}

module.exports = connectDB;