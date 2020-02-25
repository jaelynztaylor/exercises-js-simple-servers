let net = require('net');

let serverLog = require('./lib/serverLog');

let SERVER_PORT = 2004;

let server = net.createServer(function(connection) {
  let clientAddress = connection.remoteAddress;

  serverLog('CONNECT', `Client at ${clientAddress} connected`);
  let fs = require('fs');
  connection.on('data', function(clientData) {
    let fileName = clientData.toString().trimRight();
    // trimRight gets rid of white space at the end of the string
    let file = fs.readFileSync(`./files/${fileName}`);
    console.log('Please enter a file name found in the directory files: ');
    connection.write(file);
  });
});
server.listen(SERVER_PORT, function() {
  serverLog('LISTENING', `DOCUMENT server listening on port ${SERVER_PORT}`);
});
