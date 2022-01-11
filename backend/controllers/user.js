/* Package de chiffrement */
const bcrypt = require('bcrypt');
/* Package pour créer et vérifier les tokens d'anthentification */
const jwt = require('jsonwebtoken');
/* Model schéma User */
const dotenv = require('dotenv')
dotenv.config();

const Model = require('../models/Model')

/* Exporte la fonction  Inscription utilisateur  */

exports.signup = (req, res, next) => {
    //console.log('test')

    // Model.User.findAll().then(users => {

    //         //on récupère ici un tableau "users" contenant une liste d'utilisateurs
    //         console.log(users);
    //         res.status(201).json({ utilisateurs: users })
    //     }).catch(error => res.status(400).json({ message: error.message }));

    console.log(req.body.password)
        bcrypt.hash(req.body.password, 10) /* Le sel à utiliser dans le cryptage. S'il est spécifié sous forme de nombre, un sel sera généré avec le nombre de tours spécifié et utilisé. */
        .then(hash => {


            // const user = new User({
            //     email: req.body.email,
            //     password: hash,
            //     firstName: req.body.firstName,
            //     name: req.body.name
            // });
      

            Model.User.create({
                user_id: 0,
                email: req.body.email,
                password: hash,
                firstname: req.body.firstName,
                name: req.body.name,
                role_id: 1
            }).then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ message: error.message }));
        })
        .catch(error => res.status(500).json({ error }));
};
/* Exporte la fonction connexion utilisateur */

exports.login = (req, res, next) => {
    
    Model.User.findAll().then(users => {
        //on récupère ici un tableau "users" contenant une liste d'utilisateurs
        console.log(users);
        res.status(201).json({ utilisateurs: users })
    }).catch(error => res.status(400).json({ message: error.message }));
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(403).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        /*  Id généré par la base de données */
                        token: jwt.sign({ userId: user._id }, /* Token d'authentification */
                            process.env.DB_TOKEN, { expiresIn: '24h' } /* Temps de validité du Token */
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};