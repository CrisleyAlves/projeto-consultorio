const mongoose = require("mongoose");
const Exam = require('../models/exam');

exports.getAll = (req, res, next)=>{
    Exam.find()
    .select("_id description price")
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            exams: docs.map(doc =>{
                return{
                    _id: doc.id,
                    description: doc.description,
                    price: doc.price
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

    console.log(req.params);

    Exam.findById(req.params.examId)
    .select('_id description price')
    .exec()
    .then( result =>{
        res.status(200).json({
            _id: result.id,
            description: result.description,
            price: result.price
        })
    })
    .catch( err => {
        res.status(500).json({
            message: "Ocorreu um erro ao carregar o pedido informado",
            error: err
        })
    });
};

exports.insert = (req, res, next) => {
    Exam.findById(req.body.examId)
    .exec()
    .then(product => {
        const exam = new Exam({
            _id: mongoose.Types.ObjectId(),
            description: req.body.description,
            price: req.body.price
        });
        exam.save()
        .then(result => {
            res.status(201).json({
                message: "Exame cadastrado com sucesso",
                exam: {
                    _id: result.id,
                    description: result.description,
                    price: result.price
                }
            })
        })
        .catch( err => {
            res.status(500).json({
                message: "Ocorreu um erro ao realizar a operação",
                error: err    
            })
        })
    })
    .catch( err => {
        res.status(404).json({
            message: "O exame selecionado não existe",
            error: err
        })
    });
};


exports.patch = (req, res, next)=>{

    const $id = req.body._id;

    var exam = {
        description: req.body.description,
        price: req.body.price
    }

    Exam.update({_id: $id}, { $set : exam })
    .exec()
    .then(result =>{
        res.status(200).json({
                message: 'Exame atualizado com sucesso',
                request: {
                    type: 'GET',
                    url: process.env.PROJECT_SERVER_PATH+'/products/'+$id
                }       
            });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            message: "Ocorreu um erro atualizar o exame",
            error: err
        });
    });
};

exports.delete = (req, res, next)=>{
    const id = req.params.examId;
    Exam.remove({ _id: id })
    .exec()
    .then( result => {
        res.status(200).json({
            message: "Exame excluído com sucesso"
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: res
        })
    })
};