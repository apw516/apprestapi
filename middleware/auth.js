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

exports.login = function (req,res){
    var post = {
        password : req.body.password,
        email : req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    var table = ["user","password",md5(post.password),"email",post.email];
    query = mysql.format(query,table);
    connection.query(query, function(error,rows){
        if(error){
            console.log(error)
        }else{
            if(rows.length == 1){
                //jika usernya ada maka membuat token denan jwt
                var token = jwt.sign({rows},config.secret,{
                    expiresIn:1440
                });
                id_user = rows[0].id;
                //tampung data yang sudah dibuat dengan jwt dan ip ke dalam array data
                //expiresin untuk mengatur expired token
                var data = {
                    id_user : id_user,
                    access_token : token,
                    ip_address : ip.address()
                }
                //insert ke tabel akses token
                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"]

                query = mysql.format(query,table);
                connection.query(query,data, function(error,rows){
                    if(error){
                        console.log(error)
                    }else{
                        //memberikan response data berupa array berisi token dll untuk digunakan mengakses halaman yang membutuhkan token
                        res.json({
                            success: true,
                            message: 'Token ',
                            token :token,
                            currUser:data.id_user
                        })
                    }
                })
            }else{
                res.json({
                    "error" : true, "message" : "email atau password salah"
                })
            }
        }
    })
}
