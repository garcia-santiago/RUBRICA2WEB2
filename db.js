let mysql = require('mysql2');
let connection; 
const {db_config} = require('./config')

function connectDatabase() {
    if (!connection) {
        connection = mysql.createPool(db_config);

        connection.on('connection', function(conn){
            conn.query('SET @@session.group_concat_max_len = 100000;')
        })
    }
    return connection;
}

module.exports = connectDatabase();