const User = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')
const { nodeMailer } = require('../helpers/nodeMailer')


class userController{
    static getAll(req,res,next){
            User.find({})
            .populate('articleList')
            .then(value =>{
                res.status(200).json(value)
            })
            .catch(next)
        }

    static getOne(req,res,next){
        User
        .findById(req.params.userId)
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(next)
    }

    static update(req,res,next){
        console.log(req.body);
        
        let setVal = {}
        req.body.firstName && (setVal.firstName = req.body.firstName) 
        req.body.lastName && (setVal.lastName = req.body.lastName)
        req.body.email && (setVal.email = req.body.email)
        
        User
        .findById(req.params.userId)
        .then(user =>{
            user.set(setVal)
            return user.save()
        })
        .then(updated =>{
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static create(req,res,next){
        console.log('masuk user controller register',req.body);
        
            let user = new User({
                firstName : req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            })
            user.save()
            .then(value =>{
                nodeMailer(value.email)
                res.status(201).json(value)
            })
            .catch(next)
        }
    
    static login(req,res,next){
        // console.log('masuk login');
        
        console.log('masuk login',req.body);
        
        User.findOne({email : req.body.email})
        .then(user =>{
            if(user){
                console.log('masuk ada email');
                
                let check = compare(req.body.password, user.password)
                if(check){
                    let payload = {
                        id : user._id,
                        email : user.email
                    }
                    let token = sign(payload, `${process.env.SECRET_KEY}`)
                    res.status(200).json({
                        msg : 'logged in',
                        token,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        id : user._id,
                        articleList : user.articleList
                    })
                }else{
                    console.log('error 1');
                    
                    throw ({msg : 'wrong password / email', code : 404})
                }
            }else{
                console.log('error 2');
                
                throw ({msg : 'wrong password / email', code : 404})
            }
        })
        .catch(next)
        }

        static loginGoogle(req,res,next){
            console.log('ini req headers', req.headers.id_token);
            
            console.log('kesini-masuuuuk');
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
            client.verifyIdToken({
                idToken: req.headers.id_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket =>{
                // console.log(ticket);
                const payload = ticket.getPayload()
                console.log(payload,"========")
                User.findOne({email : payload.email})
                .then(user =>{
                    // console.log(user);
                    if(!user){
                        let name = payload.name.split(' ')
                        let firstName = name[0]
                        let lastName = name.slice(1).join(' ')
                        // console.log(name,firstName,lastName);
                        
                        return User.create({
                            firstName :firstName,
                            lastName: lastName,
                            email: payload.email,
                            password: '12345'
                        })
                    }else{
                        return user
                    }
                })
                .then(user =>{
                    console.log('mau buat token',user);
                    let payload = {
                        id : user._id,
                        email : user.email
                    }
                    console.log(payload,'ini google');
                    const token = sign({payload},`${process.env.SECRET_KEY}`)
                    res.status(200).json({
                        token,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        id : user._id
                    })
                })
                .catch(next)
            })
            .catch(next)
        }
        
        static delete(req,res,next){
            User
            .findByIdAndDelete(req.params.userId)
            .then(data =>{
                res.status(200).json(data)
            })
            .catch(next)
        }
    }

module.exports = userController

