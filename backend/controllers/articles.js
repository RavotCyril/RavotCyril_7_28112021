const Models = require('../models/articles');
const fs = require('fs');

/* Exporte la fonction Administrateur pour supprimer les articles des utilisateurs*/

exports.deleteAdminModelsArticle = (req, res, next) => {
  Models.Article.findOne()
        .then(Models => {
                Models.destroy({ article_id: req.params.id })
                    .then(() => res.status(200).json({ message: 'L\'administrateur a bien supprimé l\'article!' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
};


// Créer un article / post
exports.createModelsArticle = (req, res, next) => {

    Models.Article.create({
            article_id: req.body.article_id,
            sujet: req.body.sujet,
            texte: req.body.texte,
            date: new Date(),
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            user_id: req.body.user_id
        }).then((user) => res.status(201).json({ user, message: 'article créé !' }))
        .catch(error => res.status(400).json({ message: error.message }));
};
// Afficher un seule article / GET

exports.getOneModelsArticle = (req, res, next) => {

    Models.Article.findOne({ where: { article_id: req.params.id } })

        .then(
            (Models) => {
                res.status(200).json(Models);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
};
// Modifier un article / PUT  

exports.modifyModelsArticle = (req, res, next) => {

    Models.Article.findOne({ where: { article_id: req.params.id } }).then(Article => {
        const filename = Article.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            // Une fois que l'ancienne image est supprimée dans le dossier image.On peut mettre à jour le reste des données de l'article
            const article = {
                ...req.body.article,
                image: req.file == undefined ? "" : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
            Models.Article.update({...article }, { where: { article_id: article.article_id } })
                .then(() => res.status(200).json({ message: 'article modifié !' }))
                .catch(error => res.status(400).json({ error }));
        })
    }).catch(() => res.status(500).json({ message: 'Erreur Article non modifié !' }));
};
// Supprimer un article / DELETE 

exports.deleteModelsArticle = (req, res, next) => {
    Models.Article.findOne({ where: { article_id: req.params.id } })
        .then(Models => {
            const filename = Models.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Models.destroy({ article_id: req.params.id })
                    .then(() => res.status(200).json({ message: 'article supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
// Afficher tous les articles / GET

exports.getAllModelsArticle = (req, res, next) => {
    Models.Article.findAll()
        .then(
            (Models) => {
                res.status(200).json(Models);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
};