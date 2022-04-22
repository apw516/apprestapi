const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(roles){
    return function(req,rest,next){
        //cek atuhorization header
        var tokenWithBearer = req.headers.auhorization;
        if(tokenWithBearer){
            var token = tokenWithBearer.split(' ')[1];
            //verifikasi
            jwt.verify(token,config.secret,function(error,decoded){
                if(error){
                    return rest.status(401).send({auth:false,message:"token tidak valid!"})
                }else{
                    if(roles==2){
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