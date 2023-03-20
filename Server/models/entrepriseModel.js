const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const entrepriseSchema = mongoose.Schema(
    {
        companyName:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
        phone:{
            type: Number,
            required: true,
        },
        latitude:
            {
            type: Number,
            required: true,   
            },
        longitude:
            {
            type: Number,
            required: true,
            },
        ICE:{
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

entrepriseSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Entreprise', entrepriseSchema);