const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
module.exports = (req, res, next) => {
    try {
        console.log("Début Authentification")
        const token = req.headers.authorization.split(' ')[1]; /* Récupération du token après séparation du bearer (espace) */
        console.log(token)
        const decodedToken = jwt.verify(token, process.env.DB_TOKEN); /* Décode le token */
        console.log(decodedToken)
        const user_id = decodedToken.user_id; /* userId du token décodé précedemment */
        console.log(user_id)
        if (req.body.user_id && req.body.user_id !== user_id) {
            /* Si on a un userId dans la requete et qu'il est différent de l'userId encodé 
            dans le token cela envoie " invalid user id " */
            throw 'Invalid user ID';
        } else {
            next(); /* Si ok, passe au prochain middleware */
        }
    } catch {
        res.status(401).json({
            message: 'Authorisation Token invalide!'
        });
    }
    console.log("Fin Authentification")
};