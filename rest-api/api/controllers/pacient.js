const mongoose = require("mongoose");
const Pacient = require('../models/pacient');
const Bcript = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAll = (req, res, next)=>{
    Pacient.find()
    .select("_id name email cpf photo")
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            pacients: docs.map(doc =>{
                return{
                    _id: doc.id,
                    name: doc.name,
                    email: doc.email,
                    cpf: doc.cpf,
                    photo: doc.photo
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    })
};

exports.getById = (req, res, next) => {

    Pacient.findById(req.params.pacientId)
    .select('_id name email phone cpf')
    .exec()
    .then( result =>{
        res.status(200).json({
            _id: result.id,
            name: result.name,
            email: result.email,
            phone: result.phone,
            cpf: result.cpf
        })
    })
    .catch( err => {
        res.status(500).json({
            message: "Ocorreu um erro ao carregar o paciente informado",
            error: err
        })
    });
};


exports.insert = (req, res, next) => {
    Pacient.find({ email: req.body.email })
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
                    console.log(req.body.photo);
                    const pacient = new Pacient({
                        _id: mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        cpf: req.body.cpf,
                        phone: req.body.phone,
                        password: hash,
                        photo: req.body.photo
                    });
        
                    pacient.save().then( result => {
                        res.status(201).json({
                            message: 'Paciente criado com sucesso',
                            pacient: {
                                id: result.id,
                                name: result.name,
                                email: result.email,
                                photo: result.photo
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

exports.delete = (req, res, next)=>{
    const id = req.params.pacientId;
    Pacient.remove({ _id: id })
    .exec()
    .then( result => {
        res.status(200).json({
            message: "Paciente excluído com sucesso"
        });
    })
    .catch( err => {
        res.status(500).json({
            error: res
        })
    })
}

exports.uploadFile = (req, res, next)=>{
    
    res.status(200).json({});
    
}

exports.patch = (req, res, next)=>{

    const $id = req.body._id;
            
    var $pacient = {
        name: req.body.name,
        email: req.body.email,
        cpf: req.body.cpf,
        phone: req.body.phone
    }

    Pacient.update({_id: $id}, { $set : $pacient })
    .exec()
    .then(result =>{
        res.status(200).json({
                message: 'Paciente atualizado com sucesso',
                request: {
                    type: 'GET',
                    url: process.env.PROJECT_SERVER_PATH+'/products/'+$id
                }       
            });
    }).catch(err =>{
        res.status(500).json({
            message: "Ocorreu um erro atualizar o paciente",
            error: err
        });
    });
};

exports.getByCpf = (req, res, next) => {

    const cpf = req.params.cpf;

    Pacient.findOne({ 'cpf': cpf }, 'name cpf', function (err, pacient) {
        if(err){
            res.status(404).json({
                message: "Nenhuma informação encontrada",
                error: error
            });
        }

        if(pacient != null){
            res.status(200).json({
                pacient: {
                    _id: pacient.id,
                    name: pacient.name,
                    cpf: pacient.cpf
                }
            })
        }else{
            res.status(404).json({
                message: 'Not found'
            })
        }

    });
};

exports.login = (req, res, next)=>{

    Pacient.find( {email: req.body.email} )
    .exec()
    .then( pacient => {
        if(pacient.length === 0){
            res.status(401).json({
                message: "A autenticação falhou",
                error: err
            });
        }

        Bcript.compare(req.body.password, pacient[0].password, (err, result) =>{
            if(!result){
                res.status(401).json({
                    message: "A autenticação falhou",
                    error: err
                });
            }else{
                
                const token = jwt.sign({
                    id: pacient[0]._id,
                    email: pacient[0].email
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: '1h'
                });

                res.status(200).json({
                    message: "Login realizado com sucesso",
                    pacient: {
                        _id: pacient[0]._id,
                        name: pacient[0].name,
                        email: pacient[0].email,
                        cpf: pacient[0].cpf,
                        photo: pacient[0].photo,
                        phone: pacient[0].phone,
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