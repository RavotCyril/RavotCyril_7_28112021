/* Importe Express */
const express = require('express');
/* Creation d'un routeur Express */
const router = express.Router();
/* Importe la logique métier de l'article */
const userCtrl = require('../controllers/user');
const passwordValidation = require("../middleware/passwordValidation");

router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.user);


/* Exporte le routeur Express */

module.exports = router;