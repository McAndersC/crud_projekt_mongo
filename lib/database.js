const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/Crud';


const database = {};


database.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI)
    .then(() => {

      console.log('Database kontakt etableret.');
    
    })
    .catch((error) => {
      
      console.log('database connection failed. exiting now...');
      console.error(error);
      process.exit(1);
    
    });

};

module.exports = database;