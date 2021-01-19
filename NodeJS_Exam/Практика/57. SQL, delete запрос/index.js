const http = require('http');
const sql = require("mssql/msnodesqlv8");
const url = require('url');
const fs = require('fs');

let writeHTTPError = (code, message, res) => {
    res.statusCode = code;
    res.statusMessage = message;
    res.end(res.statusMessage);
}

const conn = new sql.ConnectionPool({
    database: "nodejs_lab_4",
    server: "DESKTOP-QAM5MPU\\SQLEXPRESS",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
    },
    pool: {max: 10, min: 0}
});

let http_handler = (req,res) => {
    if (req.method === 'DELETE'){
        const decode_uri = decodeURI(url.parse(req.url).pathname);
        let sub_url = decode_uri.replace(decode_uri.split('/')[1], '');
        const param = decode_uri.split('/')[1];
        console.log(param);
        conn.connect().then((pool) => {
            console.log('Connected');
            const request = pool.request();
            request.input('fac', sql.NVarChar(10), param);
            request.query(`set language english;delete faculty where faculty = @fac`, (err,result) => {
                if (err) {
                    res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                    res.end(JSON.stringify({error: err.message}));
                }
                else res.end(`Element with code ${param} was deleted`);
            });
        });
    }
    else writeHTTPError(405, 'Error 405', res);
}

const server = http.createServer()
    .listen(3000)
    .on('error', err => {console.log(err.message)})
    .on('request', http_handler);

