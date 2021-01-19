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
    if (req.method === 'GET'){
        let employee_array = [];
        conn.connect().then((pool) => {
            console.log('Connected');
            const request = pool.request();
            request.query('use nodejs_lab_4; select * from faculty');
            request.stream = true;

            request.on('row', row => {
                employee_array.push(`${JSON.stringify(row)}`);
            }).on('error', (e) => {
                res.end(JSON.stringify({error:e.message}));
            }).on('done', result => {res.end(JSON.stringify(employee_array))})
        });
    }
    else writeHTTPError(405, 'Error 405', res);
}

const server = http.createServer()
    .listen(3000)
    .on('error', err => {console.log(err.message)})
    .on('request', http_handler);




