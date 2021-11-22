const express = require('express');
const router = express.Router();

// käyttäjän login ja rekisteröitymisreitit tähän
const userCon = require('../controllers/UserController'); // user-reittien kontrolleri

// get , menee sivulle
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// rekisteröityminen eli luodaan uudelle käyttäjän tunnarit
//http://localhost:3000/users/register
router.post('/register', userCon.registerUser);
// kirjautuminen eli autentikaatio tunnareilla
router.post('/login', userCon.authenticateUser);

module.exports = router;
