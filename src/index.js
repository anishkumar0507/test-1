const express = require('express');
const { connectToDatabase } = require('./config/db');
const { port } = require('./config/env');
const webhookRoutes = require('./routes/webhookRoutes');
const path = require('path');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/webhook', webhookRoutes);
app.use('/', healthRoutes);

const start = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`AI voice agent backend listening on port ${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

start();
