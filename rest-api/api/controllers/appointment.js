const Appointment = require("../models/appointment");
const mongoose = require("mongoose");

exports.getAll = (req, res, next) => {
    Appointment.find()
        .select('_id doctor pacient totalPrice date exams user')
        .populate('doctor', '_id name')
        .populate('pacient', '_id name')
        .populate('exams', '_id description')
        .populate('user', '_id name')
        .exec()
        .then(result => {
            res.status(200).json({
                cout: result.length,
                message: "Requisição realizada com sucesso",
                appointments: result.map(doc => {
                    return {
                        _id: doc._id,
                        doctor: doc.doctor,
                        pacient: doc.pacient,
                        totalPrice: doc.totalPrice,
                        date: doc.date,
                        user: doc.user,
                        exams: doc.exams.map((exam)=>{
                            return{
                                exam: exam
                            }
                        })
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Ocorreu um erro durante a solicitação",
                error: err
            })
        });
};

exports.getById = (req, res, next) => {   
    
    Appointment.findById(req.params.appointmentId)
    .select('_id beforeAppointment afterAppointment doctor pacient totalPrice date exams')
    .populate('doctor', 'id name crm')
    .populate('pacient', 'id name cpf')
    .populate('exams', '_id description price')
    .exec()
    .then( result => {
        res.status(200).json({
            _id: result._id,
            doctor: result.doctor,
            beforeAppointment: result.beforeAppointment,
            afterAppointment: result.afterAppointment,
            pacient: result.pacient,
            totalPrice: result.totalPrice,
            date: result.date,
            exams: result.exams
        })
    })
    .catch( err => {
        res.status(500).json({
            message: "Ocorreu um erro ao carregar a consulta",
            error: err
        })
    });
};

exports.insert = (req, res, next) => {

    const appointment = new Appointment({
        _id: mongoose.Types.ObjectId(),
        doctor: req.body.doctor,
        pacient: req.body.pacient,
        user: req.body.user,
        beforeAppointment: req.body.beforeAppointment,
        afterAppointment: req.body.afterAppointment,
        totalPrice: req.body.totalPrice,
        date: req.body.date,
        exams: req.body.exams
        
    });

    appointment.save()
        .then(result => {
            res.status(201).json({
                message: "Consulta marcada com sucesso",
                order: {
                    _id: result.id,
                    beforeAppiontment: result.beforeAppiontment,
                    afterAppiontment: result.afterAppiontment,
                    totalPrice: result.totalPrice,
                    user: result.user
                }
            })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                message: "Ocorreu um erro ao marcar a consulta",
                error: err    
            })
        })
};

exports.patch = (req, res, next)=>{

    const $id = req.body._id;
            
    var $appointment = {
        doctor: req.body.doctor,
        pacient: req.body.pacient,
        beforeAppointment: req.body.beforeAppointment,
        afterAppointment: req.body.afterAppointment,
        totalPrice: req.body.totalPrice,
        date: req.body.date,
        exams: req.body.exams
    }

    Appointment.update({_id: $id}, { $set : $appointment })
    .exec()
    .then(result =>{
        res.status(200).json({
                message: 'Consulta atualizada com sucesso',
                request: {
                    type: 'GET',
                    url: process.env.PROJECT_SERVER_PATH+'/appointments/'+$id
                }       
            });
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            message: "Ocorreu um erro atualizar a consulta",
            error: err
        });
    });
};

exports.delete = (req, res, next)=>{
    const id = req.params.appointmentId;
    Appointment.remove({ _id: id })
    .exec()
    .then( result => {
        res.status(200).json({
            message: "Consulta excluída com sucesso"
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: res
        })
    })
};