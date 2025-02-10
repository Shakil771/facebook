const {Schema, model, default: mongoose} = require('mongoose')

const facebookSchema = new Schema({
    
    email:{
        type: String,
        required: true,
        trim: true
    },

    password:{
        type: String,
        trim: true,
        required: true
    },
    createat: {
        type: Date,
        default: Date.now,
        required: true
    },

})

const FaceBook= model('Comments', facebookSchema);
module.exports = FaceBook