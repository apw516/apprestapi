'use strict'

var response = require('./rest');
var connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function(req,res){
    response.ok("Aplikasi rest api start",res)
}

//menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function(req,res){
    connection.query('select * from mahasiswa',function(error,rows,fields){
        if(error){
            connection.log(error)
        }else{
            response.ok(rows,res)
        }
    })
}

//menampilkan semua data mahasiswa berdasarkan id
exports.tampilberdasarkanid = function(req,res){
    let id = req.params.id;
    connection.query('select * from mahasiswa where id_mahasiswa = ?',[id],
     function(error,rows,fields){
         if(error){
             connection.log(error)
         }else{
             response.ok(rows,res)
         }
     })
}