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
    if (req.method === 'POST'){
        let data = '';
        req.on('data', (d) =>{
            data += d;
        })
        req.on('end', ()=> {
            const json_data = JSON.parse(data);
            conn.connect().then((pool) => {
                console.log('Connected');
                const request = pool.request();
                request.input('fac', sql.NVarChar(10), json_data['faculty'])
                request.input('fac_name', sql.NVarChar(100), json_data['faculty_name'])
                request.query('set language english;insert faculty(faculty,faculty_name) values(@fac,@fac_name)', (err,result) => {
                    if (err) {
                        res.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
                        res.end(JSON.stringify({error: err.message}));
                    }
                    else res.end(data);
                });
            });
        })
    }
    else writeHTTPError(405, 'Error 405', res);
}

const server = http.createServer()
    .listen(3000)
    .on('error', err => {console.log(err.message)})
    .on('request', http_handler);

