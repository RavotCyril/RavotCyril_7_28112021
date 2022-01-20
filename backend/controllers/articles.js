const ModelsArticle = require('../models/ModelsArticle');
const fs = require('fs');

// Créer un article / post
exports.createModelsArticle = (req, res, next) => {
    console.log("Test Article crée Debut")
    // Appel du body de l'article ou du post crée.
    // console.log(req.body)
    let article = req.body.article;

    article.date = Date.now().toString();
    console.log(article)
    ModelsArticle.Article.create(
        {
            ...article,
            // image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            image: 'backend/images/Sport.jpg',
            likes: 0,
            dislikes: 0,
        }).then(() => res.status(201).json({ message: 'article créé !' }))
        .catch(error => res.status(400).json({ message: error.message }));
    console.log("Test Article crée fin")
};
// Afficher un seule article / GET

exports.getOneModelsArticle = (req, res, next) => {
    console.log("Test 1 Article Affiché Debut")

    ModelsArticle.Article.findOne({
        _id: req.params.id,
    })
        .then(
            (ModelsArticle) => {
                res.status(200).json(ModelsArticle);
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

    if (req.file) {
        // Si l'image est modifiée L'ancienne image dans le  dossier/ Image doit être supprimé.
        ModelsArticle.Article.findOne({ _id: req.params.id })
            .then(ModelsArticle => {
                const filename = ModelsArticle.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    // Une fois que l'ancienne image est supprimée dans le dossier image.On peut mettre à jour le reste des données de l'article
                    const article = {
                        ...JSON.parse(req.body.article),
                        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    ModelsArticle.update({ _id: req.params.id }, { ...article, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'article modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        // Si l'image n'est jamais modifiée
        const article = { ...req.body };
        ModelsArticle.Article.update({ _id: req.params.id }, { ...article, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'article modifié !' }))
            .catch(error => res.status(400).json({ error }));
        console.log("Test Article modifié fin")
    }
};
// Supprimer un article / DELETE 

exports.deleteModelsArticle = (req, res, next) => {
    console.log("Test Article supprimé Debut")

    ModelsArticle.Article.findOne({ _id: req.params.id })
        .then(ModelsArticle => {
            const filename = ModelsArticle.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                ModelsArticle.destroy({ _id: req.params.id })
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
    ModelsArticle.Article.findAll().then(
        (ModelsArticle) => {
            res.status(200).json(ModelsArticle);
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
// Définit le statut "like" pour l'userId fourni.   POST

exports.createLikeModelsArticle = (req, res, next) => {
    /* UserId  */
    const userId = req.body.userId;
    /* Like présent dans le body */
    const like = req.body.like;
    /* l'id de l'article / post */
    const article = req.params.id;
    ModelsArticle.Article.findOne({ _id: article })
        .then(article => {
            switch (like) {
                // Dislike : Si like = -1, l'utilisateur n'aime pas l'article / post
                case -1:
                    console.log('Je n`aime pas');
                    ModelsArticle.Vote.push(userId);
                    ModelsArticle.Vote.dislikes += 1;
                    break;
                // Je ne sais pas  : Si like = 0, L'utilisateur annule son like ou son dislike

                case 0:
                    console.log('je sais pas');
                    if (Vote.usersLiked.indexOf(userId) != -1) {
                        ModelsArticle.Vote.splice(userId, 1)
                        ModelsArticle.Vote.likes -= 1;
                    } else if (ModelsArticle.Vote.indexOf(userId) != -1) {
                        ModelsArticle.Vote.splice(userId, 1)
                        ModelsArticle.Vote.dislikes -= 1;
                    }
                    break;
                // like : Si like = 1, L'utilisateur aime l'article / post

                case 1:
                    console.log('j`aime');
                    ModelsArticle.Vote.push(userId);
                    ModelsArticle.Vote.likes += 1;
                    break;
            };
            article.save()
                .then(() => {
                    res.status(200).json({ message: 'article notée' })
                })
                .catch(error => res.status(403).json({ error }))
        });
};