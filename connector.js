var mysql = require('mysql2');
const config = require("./config.json");

var pool = mysql.createPool({
    host    : 'classmysql.engr.oregonstate.edu',
    user    : config.db.user,
    password    : config.db.password,
    database    : config.db.database
})

module.exports.pool = pool;