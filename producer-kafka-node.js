var kafka = require("kafka-node");
const ip = require("ip");
const faker = require("faker");
const { nanoid } = require("nanoid");

const Producer = kafka.Producer;
const KeyedMessage = kafka.KeyedMessage;
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
// client = new kafka.KafkaClient();
producer = new Producer(client);
km = new KeyedMessage("key", "message");

const sendMessage = () => {
  let incidenceOutmessage = {
    kafka_id: nanoid(5),
    severity: faker.random.arrayElement(["confirmed", "unconfirmed"]),
    financialValue: faker.random.number({ min: 100, max: 10000 }),
    durationInSeconds: faker.random.number({ min: 0, max: 5 }),
    rules: faker.random.arrayElements(
      [
        "Large Withdrawal After High Inbound Velocity",
        "Multiple Debits Into Customer Account",
        "Repeated Incorrect Login Violations",
        "Repeated Logins at odd hours",
      ],
      faker.random.number({ min: 1, max: 2 })
    ),
    eventType: "reviewedalert_v_3_11_" + faker.vehicle.vin(),
    modelOutputs: [
      {
        score: faker.random.float({ min: 0, max: 5 }),
        modelId: "Anti Money Laundering -" + faker.vehicle.vin(),
      },
    ],
    tags: faker.random.arrayElements(
      ["_tag:Large Withdrawal", "_tag:Excessive Cash Out", "_tag:Repeated Debits", "_tag:Failed Logins", "_tag:Odd Hours Activity"],
      faker.random.number({ min: 1, max: 4 })
    ),
    score: faker.random.float({ min: 0, max: 5 }),
    riskReasons: faker.random.arrayElement(["Large Withdrawal After High Inbound Velocity, Money Laundering is suspected", "Another reason best known to me 🍔"]),
    comment: faker.random.arrayElement(["suspicious activity", "non suspicious activity"]),
    reviewStatus: faker.random.arrayElement(["risk", "low risk", "high risk", "medium risk"]),
    originatingEvent: {
      eventId: faker.random.uuid(),
      amount: {
        currency: faker.finance.currencyCode(),
        value: faker.random.float(10000),
      },
      schemaVersion: faker.random.number(1, 2),
      method: faker.random.arrayElement(["In Branch", "ATM", "POS"]),
      eventType: faker.random.arrayElement(["withdrawal", "transfer", "payment"]),
      transactionId: "TXN" + faker.finance.account(),
      accountId: faker.random.uuid(),
      countryCode: faker.address.countryCode(),
      eventTime: faker.date.recent(),
      tenantId: `Bank_ ${faker.random.number(0, 1)}`,
      customerId: faker.name.findName(),
      details: `In Branch Withdrawal: ${faker.address.state()} Branch`,
      _metadata: {
        eventId: faker.random.uuid(),
        execution: {
          expectResponse: faker.random.boolean(),
        },
        financialValue: faker.random.float(10000),
        systemEventId: faker.random.uuid(),
        entities: {
          account: faker.finance.account(),
          customer: faker.name.findName(),
        },
        receivedTime: faker.time.recent(),
        eventTime: faker.time.recent(),
        deduplicationOff: faker.random.boolean(),
        eventType: faker.random.arrayElement(["withdrawal", "transfer", "payment"]),
        searchable: {
          eventId: faker.vehicle.vin(),
          amount: {
            currency: faker.finance.currencyCode(),
            value: faker.random.float(10000),
          },
          schemaVersion: 1,
          method: faker.random.arrayElement(["In branch", "ATM", "POS"]),
          rules: faker.random.arrayElements([
            "Large Withdrawal After High Inbound Velocity",
            "Multiple Debits Into Customer Account",
            "Repeated Incorrect Login Violations",
            "Repeated Logins at odd hours",
          ]),
          eventType: faker.random.arrayElement(["withdrawal", "transfer", "payment"]),
          transactionId: faker.name.findName(),
          tags: faker.random.arrayElement(["Large Withdrawal", "Excessive Cash Out"]),
          accountId: "C21786BD43G8A23B",
          alert: faker.random.boolean(),
          countryCode: faker.address.countryCode(),
          eventTime: faker.time.recent(),
          tenantId: `Bank_ ${faker.random.number(0, 1)}`,
          customerId: faker.name.findName(),
          details: `In Branch Withdrawal: ${faker.address.state()} Branch`,
          account: {
            accountNumber: faker.finance.account(),
            sortCode: faker.finance.bic(),
          },
        },
      },
      account: {
        accountNumber: faker.finance.account(),
        sortCode: faker.finance.bic(),
      },
    },
    attributeReviews: [],
    incidentListId: faker.finance.iban(),
    originalEventType: faker.random.arrayElement(["withdrawal", "transfer", "payment"]),
    user: faker.helpers.slugify(faker.name.findName()),
    entity: {
      id: faker.name.findName(),
      type: faker.random.arrayElement(["customer", "employee", "administrator"]),
      tenant: "DEFAULT_TENANT",
    },
    timestamp: faker.time.recent(),
    customReview: {},
  };
  let cardRTEvent = {
    eventId: nanoid(10),
    eventType: "cardRT",
    eventTime: faker.date.recent(),
    schemaVersion: 1,
    tenantId: faker.random.arrayElement([
      "ISW_ACCESS_NG",
      "ISW_ACCESS_GH",
      "ISW_ACCESS_SL",
      "ISW_ACCESS_UK",
      "ISW_UBA_NG",
      "ISW_UBA_GH",
      "ISW_UBA_SL",
      "ISW_UBA_UG",
      "ISW_UBA_UK",
      "ISW_GTB_NG",
      "ISW_GTB_GH",
      "ISW_GTB_UK",
    ]),
    msgStatus: "confirmed",
    direction: faker.random.arrayElement(["inflow", "outflow"]),
    toId: faker.name.findName(),
    msgType: faker.random.arrayElement(["withdrawal", "transfer", "payment"]),
    msgReason: faker.random.arrayElement(["withdrawal", "transfer", "payment"]),
    merchantCategoryCode: faker.random.arrayElement(["CATEG_01", "CATEG_02", "CATEG_03", "CATEG_04"]),
    mccEntityId: nanoid(10),
    cardId: nanoid(20),
    cardEntityId: faker.finance.creditCardNumber(),
    maskedCardId: faker.finance.creditCardNumber(),
    cardProductType: faker.random.arrayElement(["Visa", "Mastercard", "Verve"]),
    transactionType: faker.finance.transactionType(),
    localDateTime: faker.date.recent(),
    systemTraceAuditNumber: nanoid(8),
    retrievalReferenceNumber: nanoid(15),
    transactionId: faker.finance.routingNumber(),
    amount: {
      value: faker.finance.amount(1000, 100000),
      currency: faker.random.arrayElement(["USD", "GBP", "EUR", "NGN", "GHC"]),
    },
  };
  const faker_data = [
    {
      topic: "cardRT",
      messages: JSON.stringify(cardRTEvent),
    },
  ];
  console.log(faker_data);
  producer.send(faker_data, function (err, data) {
    console.log("Saved!", data);
  });
  return faker_data;
};
producer.on("ready", function () {
  setInterval(sendMessage, 2000);
});

producer.on("error", function (err) {
  console.log(err);
});
