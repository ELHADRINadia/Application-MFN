//user controller
const Entreprise = require('../models/entrepriseModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');


// register entreprise
const registerEntreprise = asyncHandler(async (req, res) => {
    const
        { companyName, Founder, email, password, phone, address, ICE } = req.body;
    if
        (
        !companyName ||
        !Founder ||
        !email ||
        !password ||
        !phone ||
        !address ||
        !ICE
    ) {
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    //check if entreprise already exists
    const entrepriseExists = await User.findOne({ email });
    if (entrepriseExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create entreprise
    const entreprise = await Entreprise.create({
        companyName,
        Founder,
        email,
        password: hashedPassword,
        phone,
        address,
        ICE,
    });

    if (entreprise) {
        res.status(201).json({
            _id: entreprise._id,
            companyName: entreprise.companyName,
            Founder: entreprise.Founder,
            email: entreprise.email,
            phone: entreprise.phone,
            address: entreprise.address,
            ICE: entreprise.ICE,
            token: generateToken(entreprise._id),
            message: "Entreprise created successfully"
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid entreprise data');
    }
});


//login entreprise
const loginEntreprise = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const entreprise = await Entreprise.findOne({ email });
    if (!entreprise) {
        res.status(404);
        throw new Error('Entreprise not found');
    }

    const isMatch = await bcrypt.compare(password, entreprise.password);
    if (!isMatch) {
        res.status(400);
        throw new Error('Password is incorrect');
    }

    if (entreprise && (await bcrypt.compare(password, entreprise.password))) {
        res.json({
            _id: entreprise._id,
            companyName: entreprise.companyName,
            Founder: entreprise.Founder,
            email: entreprise.email,
            phone: entreprise.phone,
            address: entreprise.address,
            ICE: entreprise.ICE,
            token: generateToken(entreprise._id),
            message: "Entreprise logged in successfully"
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid entreprise data');
    }
});

//get entreprise by id
const getEntrepriseById = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

//get all entreprises
const getAllEntreprises = asyncHandler(async (req, res) => {
    const Entreprises = await Entreprise.find({});
    res.status(200).json(entreprises);
}
);

//generat jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

module.exports = { registerEntreprise, loginEntreprise, getEntrepriseById, getAllEntreprises };