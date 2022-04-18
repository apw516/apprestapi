'use strict';

const { json } = require('express/lib/response');

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
    .get(jsonku.index);

    app.route('/tampil')
    .get(jsonku.tampilsemuamahasiswa)
}