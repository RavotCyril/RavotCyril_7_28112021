/* Package de chiffrement */
const bcrypt = require('bcrypt');
/* Package pour créer et vérifier les tokens d'anthentification */
const jwt = require('jsonwebtoken');
/* Model schéma User */
const dotenv = require('dotenv')
dotenv.config();

const Model = require('../models/ModelsArticle')

/* Exporte la fonction  Inscription utilisateur  */

exports.signup = (req, res, next) => {
    console.log("Début Inscription")
    bcrypt.hash(req.body.password, 10) /* Le sel à utiliser dans le cryptage. S'il est spécifié sous forme de nombre, un sel sera généré avec le nombre de tours spécifié et utilisé. */
        .then(hash => {
            Model.User.create({
                user_id: req.body.user_id,
                firstname: req.body.firstname,
                email: req.body.email,
                password: hash,
                role_id: req.body.role_id
            }).then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ message: error.message }));
        })
        .catch(error => res.status(500).json({ error }));
};
console.log("Fin Inscription")

/* Exporte la fonction connexion utilisateur */

exports.login = (req, res, next) => {
    //console.log("Début Tentative de Connexion")
    // Model.User.findAll({
    //     // where: { role_id: 1 }, //on veux uniquement ceux qui ont le role "1"
    //     email: req.body.email,

    // }).then(User => {
    //     console.log(User);
    //     if(!user){
    //         console.log("utilisateur ")
    //     }
    //     res.status(201).json({ message: 'Utilisateur connecté !' })
    // }).catch(error => res.status(400).json({ message: error.message }));
    console.log("Récupération utilisateur tableau crée")
    Model.User.findOne({ email: req.body.email })
        .then(User => {
            if (!User) {
                console.log("utilisateur non trouvé")
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, User.password)
                .then(valid => {
                    if (!valid) {
                        res.status(403).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        message: 'Token et mot de passe validé connexion réussi !',

                        /*  Id généré par la base de données */
                        token: jwt.sign({ userId: User.user_id }, /* Token d'authentification */
                            process.env.DB_TOKEN, { expiresIn: '24h' } /* Temps de validité du Token */
                        )
                    });

                })
                .catch(error => {
                    console.log(error)
                    res.status(500).json({ error })
                });
        })
        .catch(error => res.status(500).json({ error }));
    console.log("Fin Connexion")
};