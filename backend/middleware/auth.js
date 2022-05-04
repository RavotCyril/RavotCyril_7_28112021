const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
module.exports = (req, res, next) => {
    try {

        /* Récupération du token après séparation du bearer (espace) -> Token sans bearer */

        const token = req.headers.authorization.split(' ')[1];
        /*   
        Décode le token  en vérifiant le jwt : jsonwebtoken et la clé secrète ou publique doit être fournie.
        userId : userId de l'utilisateur exprimé en chiffre exemple userId : 1 , 
        iat : Date à laquelle a été créé le jeton (issued at),  
        exp : date d'expiration du jeton
        */
        const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
        /* userId du token décodé précedemment */

        const user_id = decodedToken.user_id;
        if (req.body.user_id && req.body.user_id !== user_id) {
            /* Si on a un userId dans la requete et qu'il est différent de l'userId encodé 
            dans le token cela envoie " invalid user id " */
            throw 'Invalid user ID';
        } else {
            next(); /* Si ok, passe au prochain middleware */
        }
    } catch (err) {
        res.status(401).json({
            message: err.message,
            try:'Sécurité : Déconnexion de la session -> Expiration du Token login'
        });
    }
};