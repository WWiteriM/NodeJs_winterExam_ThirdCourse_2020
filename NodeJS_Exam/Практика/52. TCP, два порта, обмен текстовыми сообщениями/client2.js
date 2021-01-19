const net = require('net');

let HOST = '127.0.0.1';
let PORT = 5000;

let client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log(`Client connected: ${client.remoteAddress}:${client.remotePort}`);

    let input = process.stdin;
    input.on('data', data => {
        client.write(data);
    });

    client.on('data', (data) => {
        console.log(data.toString());
    });
});


client.on('data', data => {
    console.log(`Client data: ${data.toString()}`);
});

client.on('close', () => {
    console.log('Client closed');
});

client.on('error', (e) => {
    console.log('Client error: ', e);
});
