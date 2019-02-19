const mongoose = require("mongoose");

const ExamModel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: { 
        type: String, 
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    }
});

module.exports = mongoose.model("Exam", ExamModel);