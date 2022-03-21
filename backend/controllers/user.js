/* Package de chiffrement */
const bcrypt = require('bcrypt');
/* Package pour créer et vérifier les tokens d'anthentification */
const jwt = require('jsonwebtoken');
/* Models schéma User */
const dotenv = require('dotenv')
dotenv.config();

const Models = require('../models/user')

/* Exporte la fonction  Inscription utilisateur  */

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) /* Le sel à utiliser dans le cryptage. S'il est spécifié sous forme de nombre, un sel sera généré avec le nombre de tours spécifié et utilisé. */
        .then(hash => {
            Models.User.create({
                user_id: req.body.user_id,
                firstname: req.body.firstName,
                email: req.body.email,
                password: hash,
                roleId: req.body.roleId
            }).then((User) => res.status(201).json({User, message: 'Utilisateur créé !' }))
                .catch(error => 
                    res.status(400).json({message: "Cette utilisateur existe déjà le mail est déjà utilisé" }));
        })
        .catch(error => res.status(500).json({message: "Serveur non connecté" }));
    console.log("Fin Inscription")

};

/* Exporte la fonction connexion utilisateur */

exports.login = (req, res, next) => {
    console.log("Début connexion")
    Models.User.findOne({ where: { email: req.body.email } })
        .then(User => {
            if (!User) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, User.password)
                .then(valid => {
                    if (!valid) {
                        res.status(403).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        /*  Id généré par la base de données */
                        token: jwt.sign({ userId: User.user_id, }, /* Token d'authentification */
                            process.env.DB_TOKEN, { expiresIn: '300s' }, /* Temps de validité du Token */
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
