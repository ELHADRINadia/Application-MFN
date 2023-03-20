//Entreprise controller
const Entreprise = require('../models/entrepriseModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');


// register entreprise
const registerEntreprise = asyncHandler(async (req, res) => {
    const
        { companyName, email, password, phone, latitude, longitude, ICE } = req.body;
    if
        (
        !companyName ||
        !email ||
        !password ||
        !phone ||
        !latitude ||
        !longitude ||
        !ICE
    ) {
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    // check if entreprise already exists
    const entrepriseExists = await Entreprise.findOne({ email });
    if (entrepriseExists) {
        res.status(400);
        throw new Error('entreprise already exists');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create entreprise
    const entreprise = await Entreprise.create({
        companyName,
        email,
        password: hashedPassword,
        phone,
        latitude,
        longitude,
        ICE,
    });

    if (entreprise) {
        res.status(201).json({
            _id: entreprise._id,
            companyName: entreprise.companyName,
            email: entreprise.email,
            phone: entreprise.phone,
            latitude: entreprise.latitude,
            longitude: entreprise.longitude,
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
            email: entreprise.email,
            phone: entreprise.phone,
            latitude: entreprise.latitude,
            longitude: entreprise.longitude,
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
    res.status(200).json(req.entreprise);
});

//get all entreprises
const getAllEntreprises = asyncHandler(async (req, res) => {
    try {
      const entreprises = await Entreprise.find({});
      res.json(entreprises);
    } catch (error) {
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des entreprises" });
    }
  });
  

//generat jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

module.exports = { registerEntreprise, loginEntreprise, getEntrepriseById, getAllEntreprises };