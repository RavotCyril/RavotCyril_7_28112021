/* Gestions des fichiers envoyés à L'API */

/* Importation du package multer.
Multer est un middleware node.js pour la gestion des données multipart/form-data,
qui est principalement utilisé pour le téléchargement de fichiers.*/
const multer = require('multer');

/* Créer un object de configuration pour multer  */
const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        callback(null, + Date.now() +  '.' + name  );
    }
});
/* Exporte le middleware multer */
module.exports = multer({ storage: storage }).single('image');