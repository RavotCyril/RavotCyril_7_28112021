/* Importe Express */
const express = require('express');
/* Creation d'un routeur Express */
const router = express.Router();
/* Database route user */
const db = require('../models');
/* Importe la logique métier de la sauce */
const userCtrl = require('../controllers/user');
const passwordValidation = require("../middleware/passwordValidation");

/* Routes de l'application avec le détail de ce qu'elles réalisent 
  Inscription - Connexion Utilisateur controlé...  */

router.get('/', function(req, res, next) {
    db.ModelsSchema.findAll({ limit: 10 }).then(function(rows) {
       res.render('user', { rows: rows });
   });
});
router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', userCtrl.login);

/* Exporte le routeur Express */
module.exports = router;