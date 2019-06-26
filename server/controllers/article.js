const Article  = require('../models/article')
// const Client  = require('../helpers/googleVision')



class ArticleController{

    static getAll(req,res,next){
        let queryTag = req.query.tag
        Article
        .find({})
        .then(articles =>{
            if(queryTag){
                let result = []
                articles.forEach(article =>{
                    let tagArray = article.tags.split(',')
                    if(tagArray.indexOf(`${queryTag}`) !== -1){
                        result.push(article)
                    }
                })
                res.status(200).json(result)
            }else{
                res.status(200).json(articles)
            }
        })
        .catch(next)
    }

    static getOne(req,res,next){
        Article
        .findById(req.params.articleId)
        .populate('userId')
        .then(article =>{
            // console.log('ini di controller',article);
            
            res.status(200).json(article)
        })
        .catch(next)
    }

    // static getUserArticle(req,res,next){
    //     console.log('req logged user',req.loggedUser.id);
    //     Article
    //     .find({userId : req.params.userId})
    //     .then(articles =>{
    //         res.status(200).json(articles)
    //     })
    //     .catch(next)
    // }

    static getUserArticle(req,res,next){
        console.log('masuk get user controller');
        Article
        .find({userId : req.params.userId})
        .then(data =>{
            console.log('data nya',data);
            
            res.status(200).json(data)
        })
        .catch(next)
    }

    static localTag(req,res,next){
        console.log('ini reqfile di controller local tag',req.file);
        if(req.file.tags.length != 0){
            res.status(200).json(req.file.tags)
        }else{
            res.status(404).json({
                message : 'no recommendation tags found'
            })
        }
    }

    static create(req,res,next){
        console.log('logged user ====>',req.loggedUser);
        console.log('req.body di yoi',req.body);
        
        let date = new Date()
        let dateFix = `${date.getFullYear()}-${date.getDate()}-${date.getMonth()}` 
        if(req.file != undefined){
            let newArt = new Article({
                title: req.body.title,
                description: req.body.description,
                author: req.loggedUser.id,
                content: req.body.content,
                tags: req.body.tags,
                created_at: new Date(),
                image : req.file.cloudStoragePublicUrl,
                userId : req.loggedUser.id
            })
            newArt.save()
            .then(article =>{
                res.status(200).json({
                    msg : `successfully created article`,
                    article
                })
            })
            .catch(next)
        }else{
            console.log('masuk kkookok sini');
            
            let newArt = new Article({
                title: req.body.title,
                description: req.body.description,
                author: req.loggedUser.id,
                content: req.body.content,
                tags : req.body.tags,
                created_at: new Date(),
                image : '',
                userId : req.loggedUser.id
            })
            newArt.save()
            .then(article =>{
                res.status(200).json({
                    msg : `successfully created article`,
                    article
                })
            })
            .catch(next)
        }
    }

    static update(req,res,next){
        console.log('masuk ke update');
        console.log(req.file);
        let setVal = {}
        if(req.file){
            req.body.title && (setVal.title = req.body.title) 
            req.body.description && (setVal.description = req.body.description) 
            req.body.content && (setVal.content = req.body.content)
            req.body.tags && (setVal.tags = req.body.tags)
            req.file.cloudStoragePublicUrl && (setVal.image = req.file.cloudStoragePublicUrl) 
        }else{
            req.body.title && (setVal.title = req.body.title) 
            req.body.description && (setVal.description = req.body.description) 
            req.body.content && (setVal.content = req.body.content)
            req.body.tags && (setVal.tags = req.body.tags)
        }

        // let input = req.body
        Article
        .findById(req.params.articleId)
        .then(article =>{
            article.set(setVal)
            return article.save()
        })
        .then(updated =>{
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static delete(req,res,next){
        Article
        .findByIdAndDelete(req.params.articleId)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

}

module.exports = ArticleController