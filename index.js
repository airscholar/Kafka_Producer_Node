const express = require('express');
const { Kafka } = require('kafkajs');
const mongoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');
const app = express();
const KafkaModel = require('./models/Kafka');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();
app.use(express.json());

app.post('/api/kafka', async (req, res, next) => {
  const { kafka_id: id } = req.body;
  const is_exist = await KafkaModel.find({kafka_id: id});

  if (!is_exist) {
    const kafkadata = await KafkaModel.create(req.body);
    console.log(kafkadata)
    res.status(201).json({
      success: true,
      message: kafkadata,
    });
  }
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
