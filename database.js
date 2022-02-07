const sql = require('mysql');

const db = sql.createConnection({
    host: 'bn3dgzaujknzhdmgpnxv-mysql.services.clever-cloud.com',
    user: 'ulk7dog7pjdgroys',
    password: 'WauoGn6ztDQVEnsZsg0y',
    database: 'bn3dgzaujknzhdmgpnxv'
});

module.exports = db;