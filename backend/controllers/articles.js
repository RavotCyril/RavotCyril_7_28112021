const Models = require('../models/articles');
const fs = require('fs');
const { cp } = require('fs/promises');

// Créer un article / post
exports.createModelsArticle = (req, res, next) => {
    // Appel du body de l'article ou du post crée.
    console.log("Debut-Post-Article")
    let article = req.body.article;
    const date = new Date();
    Models.Article.create({
            ...article,
            image: `${req.protocol}://${req.get('host')}/images/${req.file}`,
            date: date,
            like: 0,
            dislike: 0,
        }).then(() => res.status(201).json({ message: 'article créé !' }))
        .catch(error => res.status(400).json({ message: error.message }));
    console.log(article);
    console.log("Fin-Post-Article")
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
                res.status(404).json({
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