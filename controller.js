"use strict";

var response = require("./rest");
var connection = require("./koneksi");
const conn = require("./koneksi");

exports.index = function (req, res) {
  response.ok("Aplikasi rest api start", res);
};

//menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function (req, res) {
  connection.query("select * from mahasiswa", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menampilkan semua data mahasiswa berdasarkan id
exports.tampilberdasarkanid = function (req, res) {
  let id = req.params.id;
  connection.query(
    "select * from mahasiswa where id_mahasiswa = ?",
    [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menambahkan data mahasiswa
exports.tambahmahasiswa = function (req, res) {
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;
  connection.query(
    "insert into mahasiswa (nim,nama,jurusan) values(?,?,?)",
    [nim, nama, jurusan],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil tambah data", res);
      }
    }
  );
};

//update data berdasarkan id
exports.ubahdatamahasiswa = function (req, res) {
  var id = req.body.id_mahasiswa;
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query(
    "update mahasiswa set nim=?,nama=?,jurusan=? where id_mahasiswa = ?",
    [nim, nama, jurusan, id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data berhasil diedit", res);
      }
    }
  );
};

//delete data mahasiswa with id
exports.hapusmahasiswa = function (req, res) {
  var id = req.body.id_mahasiswa;
  connection.query(
    "delete from mahasiswa where id_mahasiswa = ?",
    [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data berhasil dihapus", res);
      }
    }
  );
};

//menampilkan matakuliah group

exports.tampilgroupmatakuliah = function (req,res){
    connection.query('select mahasiswa.nama,mahasiswa.id_mahasiswa, mahasiswa.nim,mahasiswa.jurusan,matakuliah.matakuliah,matakuliah.sks from krs join matakuliah join mahasiswa where krs.id_matakuliah = matakuliah.id_matakuliah and krs.id_mahasiswa = mahasiswa.id_mahasiswa order by mahasiswa.id_mahasiswa',
    function (error,rows,fields){
        if(error){
            console.log(error)
        }else{
            response.oknested(rows,res)
        }
    })
}
