const mongoose = require('mongoose');
const connectDB = async () => {
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect("mongodb+srv://asatcom26:CvxofHyNZV8of8UO@cluster0.gp5wbn9.mongodb.net/blog");
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }

}

module.exports = connectDB;