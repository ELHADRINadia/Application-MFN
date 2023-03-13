const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const entrepriseSchema = mongoose.Schema(
    {
        companyName:{
            type: String,
            required: true,
        },
        Founder:{
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
            type: String,
            required: true,
        },
        address:
            {
                Latitude :{
                    type: Number,
                    required: true,
                },
                Longitude:{
                    type: Number,
                    required: true,
                }
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