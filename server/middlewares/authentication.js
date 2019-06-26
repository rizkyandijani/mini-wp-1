const { verify } = require('../helpers/jwt')
const User = require('../models/user')
module.exports = function(req,res,next){
    if(req.headers.hasOwnProperty('token')){
        let decoded = verify(req.headers.token,`${process.env.SECRET_KEY}`)
        console.log('ini decoded',decoded);
        let option = {}
            option = {
                email : decoded.email
            }
        User.findOne(option)
        .then(user =>{
            console.log('ini user authen',user);
            if(user){
                    req.loggedUser = decoded
                    console.log('oke logged user keisi');
                    
                    next()
            }else {
                next({msg : `token is not recognized`,code : 404})
            }
        })
        .catch(next)
        // console.log('ini decoded',decoded);
        // req.loggedUser = decoded
        // console.log(req.loggedUser)
    }
    else{
        next({msg : `you need to login first`, code: 401})
    }
}