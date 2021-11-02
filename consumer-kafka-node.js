var kafka = require("kafka-node");
const axios = require("axios");

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
consumer = new Consumer(client, [{ topic: "HIGH_RISK_CARDRT_TXNS_GTBNG" }], {
  autoCommit: false,
});
let i = 0;
consumer.on("message", function (message) {
  console.log("Sending to Mongo.....", i++);
  let formatted_message = {
    topic: message.topic,
    value: JSON.parse(message.value),
    offset: message.offset,
    partition: message.partition,
    highWaterOffset: message.highWaterOffset,
    key: message.key,
  };
  // console.log(formatted_message);
  axios.post("http://localhost:4000/api/v1/kafka/consumer", formatted_message).then(res => console.log("saved!", i));
});
