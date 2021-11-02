var kafka = require('kafka-node');
const ip = require('ip');
const faker = require('faker');
const { nanoid } = require('nanoid');

const Producer = kafka.Producer;
const KeyedMessage = kafka.KeyedMessage;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
// client = new kafka.KafkaClient();
producer = new Producer(client);
km = new KeyedMessage('key', 'message');

const sendMessage = () => {
  let message = {
    sensor_id: `sensor-${faker.random.number({ min: 0, max: 5 })}`,
    area: faker.random.arrayElement(['wheel', 'motor', 'engine']),
    reading: faker.random.number({ min: 50, max: 150 }),
    reading_date: new Date(),
  };
  const faker_data = [
    {
      topic: 'readings',
      messages: JSON.stringify(message),
    },
  ];
  //   faker_data = sendMessage();
  console.log(faker_data);
  producer.send(faker_data, function (err, data) {
    console.log(data);
  });
  //   return faker_data;
};
producer.on('ready', function () {
  setInterval(sendMessage, 5000);
});

producer.on('error', function (err) {
  console.log(err);
});
