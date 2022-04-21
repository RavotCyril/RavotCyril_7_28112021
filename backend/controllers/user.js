/* Package de chiffrement */
const bcrypt = require('bcrypt');
/* Package pour créer et vérifier les tokens d'anthentification */
const jwt = require('jsonwebtoken');
/* Models schéma User */
const dotenv = require('dotenv')
dotenv.config();

const Models = require('../models/user')


/* Exporte la fonction  Authentification Inscription utilisateur  */

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) /* Le sel à utiliser dans le cryptage. S'il est spécifié sous forme de nombre, un sel sera généré avec le nombre de tours spécifié et utilisé. */
        .then(hash => {
            Models.User.create({
                    user_id: req.body.user_id,
                    firstname: req.body.firstName,
                    email: req.body.email,
                    password: hash,
                    roleId: req.body.roleId
                }).then(() => res.status(201).json({message: 'Utilisateur créé !' }))
                .catch(error =>
                    res.status(400).json({ message: "Cette utilisateur existe déjà le mail est déjà utilisé" }));
        })
        .catch(error => res.status(500).json({ message: "Serveur non connecté" }));

};

/* Exporte la fonction Authentification connexion utilisateur */

exports.login = (req, res, next) => {
    Models.User.findOne({ where: { email: req.body.email } })
        .then(User => {
            if (!User) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !' });
            } bcrypt.compare(req.body.password, User.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(403).json({message:'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        message: 'Utilisateur trouvé et mot de passe validé connexion réussi et Token D\'authentification généré par la base de donnée!',
                        /*  Id généré par la base de données */
                        token: jwt.sign({ user_id: User.user_id, }, /* Token d'authentification + userId */
                        process.env.DB_TOKEN, { expiresIn: 600 }, /* Temps de validité du Token */
                        ),
                        user_id: User.user_id
                    });
                })
                .catch(error => {
                    return res.status(500).json({ message:'serveur indisponible'})
                });
        })
        .catch(error => res.status(500).json({ message :'serveur indisponible' }));
};
/* Exporte la fonction Utilisateur pour lire ces données */

exports.getUser = (req, res, next) => {
    
        Models.User.findOne({ where: { user_id: req.params.id } })
        .then(
            (Models) => {
                res.status(200).json(Models);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    message :'Utilisateur non trouvé'
                });
            }
        );
};
/* Exporte la fonction Delete pour supprimer son compte utilisateur */

exports.deleteUser = (req, res, next) => {
  Models.User.findOne()
        .then(Models => {
                Models.destroy({ user_id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                    .catch(error => res.status(400).json({ message: 'Utilisateur non supprimé' }));
            })
            .catch(error => res.status(500).json({ message :'Serveur indisponible' }));
};