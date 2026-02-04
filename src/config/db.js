const mongoose = require('mongoose');
const { mongoUri } = require('./env');

const connectToDatabase = async () => {
  if (!mongoUri) {
    throw new Error('MONGO_URI is not set.');
  }

  await mongoose.connect(mongoUri, {
    autoIndex: true
  });

  return mongoose.connection;
};

module.exports = { connectToDatabase };
