const mongoose = require("mongoose");
const Doctor = require('../models/doctor');
const Bcript = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAll = (req, res, next)=>{
    Doctor.find()
    .select("_id name email crm phone")
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            doctors: docs.map(doc =>{
                return{
                    _id: doc.id,
                    name: doc.name,
                    email: doc.email,
                    crm: doc.crm,
                    phone: doc.phone
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

exports.getById = (req, res, next) => {

    Doctor.findById(req.params.doctorId)
    .select('_id name crm email phone ')
    .exec()
    .then( result =>{
        res.status(200).json({
            _id: result.id,
            name: result.name,
            email: result.email,
            crm: result.crm,
            phone: result.phone
        })
    })
    .catch( err => {
        res.status(500).json({
            message: "Ocorreu um erro ao carregar o doutor informado",
            error: err
        })
    });
};


exports.insert = (req, res, next) => {
    Doctor.find({ email: req.body.email })
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
                    const doctor = new Doctor({
                        _id: mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        crm: req.body.crm,
                        phone: req.body.phone,
                        password: hash
                    });
        
                    doctor.save().then( result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Doutor criado com sucesso',
                            doctor: {
                                id: result.id,
                                name: result.name,
                                email: result.email,
                                crm: result.crm,
                                phone: result.phone,
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
    const id = req.params.doctorId;
    Doctor.remove({ _id: id })
    .exec()
    .then( result => {
        res.status(200).json({
            message: "Doutor excluído com sucesso"
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: res
        })
    })
};

exports.patch = (req, res, next)=>{

    const $id = req.body._id;
            
    var $doctor = {
        name: req.body.name,
        email: req.body.email,
        crm: req.body.crm,
        phone: req.body.phone
    }

    Doctor.update({_id: $id}, { $set : $doctor })
    .exec()
    .then(result =>{
        res.status(200).json({
                message: 'Médico atualizado com sucesso',
                request: {
                    type: 'GET',
                    url: process.env.PROJECT_SERVER_PATH+'/products/'+$id
                }       
            });
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            message: "Ocorreu um erro atualizar o médico",
            error: err
        });
    });
};


exports.getByCrm = (req, res, next) => {

    const crm = req.params.crm;

    Doctor.findOne({ 'crm': crm }, 'name crm', function (err, doctor) {
        if(err){
            console.log(err);
            res.status(404).json({
                message: "Nenhuma informação encontrada",
                error: error
            });
        }
        if(doctor != null){
            res.status(200).json({
                doctor: {
                    _id: doctor.id,
                    name: doctor.name,
                    crm: doctor.crm
                }
            })
        }else{
            res.status(404).json({
                message: 'Not found'
            })
        }
        

    });
};