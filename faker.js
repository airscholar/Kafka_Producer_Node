const faker = require('faker');

const aric_mock_data = {
  severity: faker.random.arrayElement(['confirmed', 'unconfirmed']),
  financialValue: faker.random.float(10000),
  durationInSeconds: faker.random.float({ min: 0, max: 5 }),
  rules: faker.random.arrayElements(
    [
      'Large Withdrawal After High Inbound Velocity',
      'Multiple Debits Into Customer Account',
      'Repeated Incorrect Login Violations',
      'Repeated Logins at odd hours',
    ],
    faker.random.number({ min: 1, max: 2 })
  ),
  eventType: 'reviewedalert_v_3_11_' + faker.vehicle.vin(),
  modelOutputs: [
    {
      score: faker.random.float({ min: 0, max: 5 }),
      modelId: 'Anti Money Laundering -' + faker.vehicle.vin(),
    },
  ],
  tags: faker.random.arrayElements(
    [
      '_tag:Large Withdrawal',
      '_tag:Excessive Cash Out',
      '_tag:Repeated Debits',
      '_tag:Failed Logins',
      '_tag:Odd Hours Activity',
    ],
    faker.random.number({ min: 1, max: 4 })
  ),
  score: faker.random.float({ min: 0, max: 5 }),
  riskReasons: faker.random.arrayElement([
    'Large Withdrawal After High Inbound Velocity, Money Laundering is suspected',
    'Another reason best known to me 🍔',
  ]),
  comment: faker.random.arrayElement([
    'suspicious activity',
    'non suspicious activity',
  ]),
  reviewStatus: faker.random.arrayElement([
    'risk',
    'low risk',
    'high risk',
    'medium risk',
  ]),
  originatingEvent: {
    eventId: faker.random.uuid(),
    amount: {
      currency: faker.finance.currencyCode(),
      value: faker.random.float(10000),
    },
    schemaVersion: faker.random.number(1, 2),
    method: faker.random.arrayElement(['In Branch', 'ATM', 'POS']),
    eventType: faker.random.arrayElement(['withdrawal', 'transfer', 'payment']),
    transactionId: 'TXN' + faker.finance.account(),
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
      eventType: faker.random.arrayElement([
        'withdrawal',
        'transfer',
        'payment',
      ]),
      searchable: {
        eventId: faker.vehicle.vin(),
        amount: {
          currency: faker.finance.currencyCode(),
          value: faker.random.float(10000),
        },
        schemaVersion: 1,
        method: faker.random.arrayElement(['In branch', 'ATM', 'POS']),
        rules: faker.random.arrayElements([
          'Large Withdrawal After High Inbound Velocity',
          'Multiple Debits Into Customer Account',
          'Repeated Incorrect Login Violations',
          'Repeated Logins at odd hours',
        ]),
        eventType: faker.random.arrayElement([
          'withdrawal',
          'transfer',
          'payment',
        ]),
        transactionId: faker.name.findName(),
        tags: faker.random.arrayElement([
          'Large Withdrawal',
          'Excessive Cash Out',
        ]),
        accountId: 'C21786BD43G8A23B',
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
  originalEventType: faker.random.arrayElement([
    'withdrawal',
    'transfer',
    'payment',
  ]),
  user: faker.helpers.slugify(faker.name.findName()),
  entity: {
    id: faker.name.findName(),
    type: faker.random.arrayElement(['customer', 'employee', 'administrator']),
    tenant: 'DEFAULT_TENANT',
  },
  timestamp: faker.time.recent(),
  customReview: {},
};

module.exports = aric_mock_data;
