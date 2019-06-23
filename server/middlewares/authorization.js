const jwt = require('jsonwebtoken')
const Article = require('../models/article')

module.exports = function(req,res,next){
    // let todoId = req.params.id 
    // let userId = req.loggedUser.id
    let option = {
        id : req.params.id,
        UserId : req.loggedUser.id
    }
    Article.findOne(option)
    .then(article =>{
        console.log('masuk authorize ok',article);
        if(article){
            next()
        }else {
            next({code : 401, msg : `you're not authorized`})
        }
    })
    .catch(next)
    
}