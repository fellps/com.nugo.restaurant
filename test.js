

try {

  const escpos = require('escpos')

  // Select the adapter based on your printer type
  const device = new escpos.USB()
  // const device  = new escpos.Network('localhost');
  // const device  = new escpos.Serial('/dev/usb/lp0');
console.log(device)
  const printer = new escpos.Printer(device)
console.log(printer)
  device.on('close', () => {
    // process.send({ success: true })
    console.log('closed')
    process.exit()
  })

  device.open(function () {
    console.log('opening')
    printer
      .feed(1)
      .font('a')
      .size(1, 1)
      .text('HELLOW WORLD', '857')
      .feed(7)
      .cut()
      .close()
    console.log('closing')
    // device
    //   .close((e) => { console.log(e) })
  })
} catch (err) {
  console.log(err)
  process.exit()
}
