const mongoose = require("mongoose");

const appointmentModel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true},
    pacient: { type: mongoose.Schema.Types.ObjectId, ref: 'Pacient', required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: { type: Date, required: true },
    beforeAppointment: { type: String},
    afterAppointment: { type: String},
    totalPrice: { type: Number, required: true },
    exams: [
        {
             type: mongoose.Schema.Types.ObjectId, ref: 'Exam'
        }
    ]
});

module.exports = mongoose.model("Appointment", appointmentModel);