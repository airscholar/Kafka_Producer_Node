const mongoose = require('mongoose');

var KafkaSchema = new mongoose.Schema(
  {
    kafka_id: { type: String, required: true, unique: true },
    name: String,
  },
  { strict: false }
);
module.exports = mongoose.model('Kafka', KafkaSchema);
