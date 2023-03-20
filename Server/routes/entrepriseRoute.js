const express = require('express');
const router = express.Router();
const {
    registerEntreprise,
    loginEntreprise,
    getEntrepriseById,
    getAllEntreprises,
} = require('../controllers/entrepriseController');


router.post('/register', registerEntreprise);
router.get('/allentreprises', getAllEntreprises);
router.post('/login', loginEntreprise);
router.get('/:id', getEntrepriseById);

module.exports = router;