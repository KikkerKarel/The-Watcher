const sql = require('mssql');

const sqlConfig= {
    user: 'sa',
    password: 'JeMoeder69!',
    server: 'localhost',
    database: 'Watcher',
    options: {
        encrypt: false,
        trustedServerCertificate: true
    }
};

let connection = sql.connect(sqlConfig, (err) => {
    if(err) throw err;
    console.log("Connected");
});

module.exports = sqlConfig;