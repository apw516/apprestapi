var connection = require("../koneksi");
var mysql = require("mysql");
var md5 = require("md5");
var response = require("../rest");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");

//controller register
exports.registrasi = function (req, res) {
  var post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tanggal_daftar: new Date(),
    //array yang menangkap data dari inputan postman dll
  };

  var query = "SELECT email from ?? WHERE ?? = ?";
  var table = ["user","email",post.email];

  query= mysql.format(query,table);
  connection.query(query,function(error,rows){
     if(error){
         console.log(error);
     }else{
         //cek email apakah sudah terdaftar
         if(rows.length == 0){
             //jka email belum terdaftar
             var query ="INSERT INTO ?? SET ?";
             var table = ["user",];
             //insert ke tabel user dengan inputan post dari user
             query = mysql.format(query,table);
             connection.query(query,post,function(error,rows){
                 if(error){
                    console.log(error)
                 }else{
                    response.ok("Berhasil registrasi user baru",res)
                 }
             })
         }else{
             //jika email sudah terdaftar
             response.ok("Email sudah terdaftar!",res)
         }
     }
  })
};
