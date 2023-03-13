const express = require('express');
const router = express.Router();
const {
    registerEntreprise,
    loginEntreprise,
    getEntrepriseById,
    getAllEntreprises,
} = require('../controller/EntrepriseController');

router.post('/register', registerEntreprise);
router.post('/login', loginEntreprise);
router.get('/:id', getEntrepriseById);
router.get('/allentreprises', getAllEntreprises);

module.exports = router;