const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(){
    return function(req,rest,next){
        var role = req.body.role;
        //cek atuhorization header
        var tokenWithBearer = req.headers.token;
        if(tokenWithBearer){
            var token = tokenWithBearer;
            //verifikasi
            jwt.verify(token,config.secret,function(error,decoded){
                if(error){
                    return rest.status(401).send({auth:false,message:"token tidak valid!"})
                }else{
                    if(role ==2){
                        req.auth = decoded;
                        next()
                    }else{
                        return rest.status(401).send({auth:false,message:"autharization role failed!"})
                    }
                }
            })
        }else{
            return rest.status(401).send({auth:false,message:"need token!"})
        }
    }
}

module.exports = verifikasi