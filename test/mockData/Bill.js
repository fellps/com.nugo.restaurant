const uuid = require('uuid/v1')
const moment = require('moment')

module.exports = {
  IdBill: 'C1157289-F960-4632-A03B-60AE600FA9C9',
  IdPOSDevice: uuid(),
  IdUserWaiter: uuid(),
  SponsorDocument: '11111111111',
  CardSerialTable: '0000000000',
  CardSerialSponsor: '0000000000',
  TableNumber: 1,
  ArrivalAt: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
  FinishedAt: null,
  AmountPersons: 4,
  IsSyncronized: false,
  IsSponsorForeigner: false,
  SequenceOrder: 1,
  Total: 0
}
