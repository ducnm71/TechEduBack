
const mongoose = require('mongoose');

const connectDatabase = async () => {
  // Connect den database
  try {
    const dbConfig = 'mongodb+srv://sa:sa@cluster0.krx6pfc.mongodb.net/TechEdu?retryWrites=true&w=majority';
    const connect = await mongoose.connect(dbConfig);
    console.log(`Mongodb connected: ${connect.connection.host}`);
  } catch (e) {
    console.log('Error connect to mongodb');
  }
}

module.exports = connectDatabase;