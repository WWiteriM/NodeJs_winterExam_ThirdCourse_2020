const udp = require('dgram');

const PORT = 4000;
let server = udp.createSocket('udp4')

server.on('message', (msg, info) => {
    let MsgBuff = msg.toString();

    console.log(MsgBuff);
    MsgBuff = `ECHO:${MsgBuff}`;

    server.send(MsgBuff, info.port, info.address, (err) => {
        if (err) server.close();
        else console.log('Sended');
    });
})

    .on('close', () => console.log('Server CLOSED'))
    .on('error', (err) => {
        console.log('Error: ' + err);
        server.close();
    });

server.bind(PORT);
