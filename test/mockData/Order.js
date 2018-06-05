const uuid = require('uuid/v1')
const moment = require('moment')

module.exports = {
  IdOrder: 'A2257289-F960-4632-A03B-60AE600FA9C8',
  IdOrderReference: null,
  IdBill: 'C1157289-F960-4632-A03B-60AE600FA9C9',
  SequenceOrder: 1,
  IdUserWaiter: uuid(),
  PersonNumber: '11111111111',
  OrderAt: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
  IsSyncronized: false,
  OrderItems: [
    {
      IdOrderItem: uuid(),
      IdOrder: 'A2257289-F960-4632-A03B-60AE600FA9C8',
      IdMenuProduct: uuid(),
      Count: Math.floor((Math.random() * 10) + 1),
      CanceledAt: null,
      Description: 'No description'
    },
    {
      IdOrderItem: uuid(),
      IdOrder: 'A2257289-F960-4632-A03B-60AE600FA9C8',
      IdMenuProduct: uuid(),
      Count: Math.floor((Math.random() * 10) + 1),
      CanceledAt: null,
      Description: 'No description'
    },
    {
      IdOrderItem: uuid(),
      IdOrder: 'A2257289-F960-4632-A03B-60AE600FA9C8',
      IdMenuProduct: uuid(),
      Count: Math.floor((Math.random() * 10) + 1),
      CanceledAt: null,
      Description: 'No description'
    }
  ]
}
