var mysql = require('mysql');

//buat koneksi ke database
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_rest_api'
})

conn.connect((err) => {
    if(err) throw err;
    console.log("Koneksi database berhasil");
})

module.exports = conn;