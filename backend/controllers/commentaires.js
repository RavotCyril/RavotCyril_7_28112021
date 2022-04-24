const Models = require('../models/commentaires');

// Créer un commentaire / post

exports.createModelsCommentaire = (req, res, next) => {
    Models.Commentaire.create({
        commentaire_id: req.body.commentaire_id,
        texte: req.body.texte,
        id_article: req.body.id_article,
        id_user: req.body.id_user
        }).then(() => res.status(201).json(({ message: 'commentaire créé !' })))
        .catch(error => res.status(400).json({ message: error.message }));
};

// Afficher tout les commentaires / GET

exports.getAllModelsCommentaire = (req, res, next) => {

    Models.Commentaire.findAll()
        .then(
            (Models) => {
                res.status(200).json(Models);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    message: error.message
                });
            }
        );
};

// Modifier un commentaire / PUT  

exports.modifyModelsCommentaire = (req, res, next) => {
    // Si l'image est modifiée L'ancienne image dans le  dossier/ Image doit être supprimé.
    Models.Commentaire.findOne({ where: { commentaire_id: req.params.id } }).then
    const commentaire = {
        ...req.body.commentaire
    }
    Models.Commentaire.update({...commentaire }, { where: { commentaire_id: req.params.id } })
        .then(() => res.status(200).json({ message: 'commentaire modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

// Supprimer un commentaire / DELETE 

exports.deleteModelsCommentaire = (req, res, next) => {
    Models.Commentaire.findOne({ where: { commentaire_id: req.params.id } })
        .then(Models => {
            Models.destroy({ commentaire_id: req.params.id })
                .then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        });
};