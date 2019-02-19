const mongoose = require("mongoose");
const User = require('../models/user');
const Bcript = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAll = (req, res, next)=>{
    User.find()
    .select("_id name email admin")
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            users: docs.map(doc =>{
                return{
                    _id: doc.id,
                    name: doc.name,
                    email: doc.email,
                    admin: doc.admin
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
};

exports.insert = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then( result => {
        if (result.length >= 1){
            res.status(409).json({
                message: "O e-mail já existe em nossa base de dados"
            });
        }else{
            Bcript.hash(req.body.password, 10, (err, hash) =>{
                if(err){
                    res.status(500).json({
                        message: 'Ocorreu um erro ao criptografar a senha',
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        photo: req.body.photo,
                        admin: req.body.admin
                    });
        
                    user.save().then( result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Usuário criado com sucesso',
                            user: {
                                id: result.id,
                                name: result.name,
                                email: result.email,
                                photo: result.photo,
                                admin: result.admin
                            }
                        })
                    })
                    .catch( err => {
                        res.status(500).json({
                            message: 'Ocorreu um erro ao realizar o cadastro',
                            error: err
                        })
                    })
                }
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            message: "Ocorreu um erro durante a solicitação",
            error: err
        })
    });    
};

exports.getById = (req, res, next) => {

    User.findById(req.params.userId)
    .select('_id name email password admin')
    .exec()
    .then( result =>{
        res.status(200).json({
            _id: result.id,
            name: result.name,
            email: result.email,
            admin: result.admin,
            password: result.password,
        })
    })
    .catch( err => {
        res.status(500).json({
            message: "Ocorreu um erro ao carregar o usuário informado",
            error: err
        })
    });
};

exports.login = (req, res, next)=>{

    User.find( {email: req.body.email} )
    .exec()
    .then( user => {
        if(user.length === 0){
            res.status(401).json({
                message: "A autenticação falhou",
                error: err
            });
        }
        
        Bcript.compare(req.body.password, user[0].password, (err, result) =>{
            if(!result){
                res.status(401).json({
                    message: "A autenticação falhou",
                    error: err
                });
            }else{
                
                const token = jwt.sign({
                    id: user[0]._id,
                    email: user[0].email
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: '1h'
                });

                res.status(200).json({
                    message: "Login realizado com sucesso",
                    user: {
                        _id: user[0]._id,
                        name: user[0].name,
                        email: user[0].email,
                        photo: user[0].photo,
                        admin: user[0].admin
                    },
                    token: token
                })
            }
        })
    })
    .catch(err => {
        res.status(401).json({
            message: "A autenticação falhou",
            error: err
        })
    })
};

exports.delete = (req, res, next)=>{
    const id = req.params.userId;
    User.remove({ _id: id })
    .exec()
    .then( result => {
        res.status(200).json({
            message: "Usuário excluído com sucesso"
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: res
        })
    })
};


exports.uploadFile = (req, res, next)=>{
    
    res.status(200).json({});
    
}