const Models = require('../models/articles');
const fs = require('fs');

// Créer un article / post
exports.createModelsArticle = (req, res, next) => {
    console.log("Test Article crée Debut")
    // Appel du body de l'article ou du post crée.
    // console.log(req.body)
    let article = req.body.article;
    article.date = Date.now().toString();
    Models.Article.create(
        {
            ...article,
            image: `${req.protocol}://${req.get('host')}/images/${req.file}`,
            image: 'backend/images/Sport.jpg',
            like: 0,
            dislike: 0,
        }).then(() => res.status(201).json({ message: 'article créé !' }))
        .catch(error => res.status(400).json({ message: error.message }));
    console.log(article.article_id)
    console.log("Test Article crée fin")
};
// Afficher un seule article / GET

exports.getOneModelsArticle = (req, res, next) => {
    console.log("Test 1 Article Affiché Debut")

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
    console.log("Test 1 Article affiché fin")
};
// Modifier un article / PUT  

exports.modifyModelsArticle = (req, res, next) => {
    console.log("Test Article modifié Debut")
    // if (req.file) {
    console.log("Avant FindOne")
    // Si l'image est modifiée L'ancienne image dans le  dossier/ Image doit être supprimé.
    Models.Article.findOne({ where: { article_id: req.params.id } }).then(Article => {
        const filename = Article.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            // Une fois que l'ancienne image est supprimée dans le dossier image.On peut mettre à jour le reste des données de l'article
            const article = {
                ...req.body.article,
                image: req.file == undefined ? "" : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
            Models.Article.update({ ...article }, { where: { article_id: article.article_id } })
                .then(() => res.status(200).json({ message: 'article modifié !' }))
                .catch(error => res.status(400).json({ error }));
        })
    }).catch(() => res.status(500).json({ message: 'Erreur Article non modifié !' }));
    // } else {
    //     // Si l'image n'est jamais modifiée
    //     const article = { ...req.body };
    //     Models.Article.update({ article_id: req.params.id }, { ...article, article_id: req.params.id })
    //         .then(() => res.status(200).json({ message: 'article modifié !' }))
    //         .catch(error => res.status(400).json({ error }));
    //     console.log("Test Article modifié fin")
    // }
};
// Supprimer un article / DELETE 

exports.deleteModelsArticle = (req, res, next) => {
    console.log("Test Article supprimé Debut")

    Models.Article.findOne({ where: { article_id: req.params.id } })
        .then(Models => {
            const filename = Models.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Models.destroy({ article_id: req.params.id })
                    .then(() => res.status(200).json({ message: 'article supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
    console.log("Test Article supprimé fin")
};
// Afficher tous les articles / GET

exports.getAllModelsArticle = (req, res, next) => {
    console.log("Test Tous les Articles affiché Debut")
    Models.Article.findAll().then(
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
    console.log("Test Tous les Articles affiché fin")
};
