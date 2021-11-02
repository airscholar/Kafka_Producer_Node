const { default: Axios } = require('axios');
const ip = require('ip');
const axios = require('axios');

const { Kafka } = require('kafkajs');

const HOST = process.env.HOST_IP || ip.address();
const PORT = process.env.PORT || 9092;

const kafka = new Kafka({
  // brokers: [`${HOST}:${PORT}`],
  brokers: ['localhost:9092'],
  clientId: 'anp-kafka-consumer',
});

const topic = 'anp_kafka_data';
const consumer = kafka.consumer({ groupId: 'anp-consumer-group-id' });

const run = async () => {
  //   let i = 0;
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: false });
  await consumer.run({
    eachBatchAutoResolve: true,
    eachBatch: async ({
      batch,
      resolveOffset,
      heartbeat,
      isRunning,
      isStale,
    }) => {
      for (let message of batch.messages) {
        if (!isRunning() || isStale()) break;
        console.log({
          key: message.key.toString(),
          value: message.value.toString(),
          headers: message.headers,
        });
        resolveOffset(message.offset);
        await heartbeat();
      }
    },
    // eachMessage: async ({ topic, partition, message }) => {
    //   console.log({
    //     key: message.key.toString(),
    //     value: message.value.toString(),
    //     headers: message.headers,
    //   });
    // const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;

    // let data_to_send = {
    //   data: message.value.toString(),
    // };

    // let aml_data = JSON.parse(data_to_send.data);

    // let final_data = aml_data;

    // // if (i % 2 === 0) {
    // final_data = { ...aml_data, aml_flag: true };
    // // }

    // await axios
    //   .post('http://localhost:6000/api/kafka/consumer/v1', final_data)
    //   .then(res => console.log('saved!', i++));
    // //   }
    // },
  });
};

run().catch(e => console.error(`${e.message}`, e));

const errorTypes = ['unhandledRejection', 'uncaughtException'];
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

errorTypes.map(type => {
  process.on(type, async e => {
    try {
      console.log(`process.on ${type}`);
      console.error(e);
      await consumer.disconnect();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
});

signalTraps.map(type => {
  process.once(type, async () => {
    try {
      await consumer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});
