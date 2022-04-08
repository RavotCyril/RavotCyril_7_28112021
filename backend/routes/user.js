/* Importe Express */
const express = require('express');
/* Creation d'un routeur Express */
const router = express.Router();
/* Importe la logique métier de l'article */
const userCtrl = require('../controllers/user');
const passwordValidation = require("../middleware/passwordValidation");


/* Autentification : S'inscrire et se connecter */
router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', userCtrl.login);

/* Utilisateur : 
Read: lire son profil ( données - Email,  Prénom ... )
Delete: le supprimer
 */

router.get('/:id', userCtrl.getUser);
router.delete('/:id', userCtrl.deleteUser);


/* Exporte le routeur Express */

module.exports = router;