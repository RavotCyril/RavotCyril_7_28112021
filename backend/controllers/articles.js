const ModelsArticle = require('../models/ModelsArticle');
const fs = require('fs');

// Créer un article / post
exports.createModelsArticle = (req, res, next) => {
    console.log("Test Article crée Debut")
    // Appel du body de l'article ou du post crée.
    // console.log(req.body)
    let article = req.body.article;
    article.date = Date.now().toString();
    ModelsArticle.Article.create(

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

    ModelsArticle.Article.findOne({ where: { article_id: req.params.id } })
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
    const filename = Article.image.split('/images/')[1];
    console.log(filename);
    if (req.file) {
        console.log("Avant FindOne")
        console.log(Article)
        // Si l'image est modifiée L'ancienne image dans le  dossier/ Image doit être supprimé.
        ModelsArticle.Article.findOne({ where: { article_id: req.params.id } })
        console.log("test1 début requête fichier")
            .then(ModelsArticle => {
                console.log(Article);
                const filename = ModelsArticle.Article.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    // Une fois que l'ancienne image est supprimée dans le dossier image.On peut mettre à jour le reste des données de l'article
                    const article = {
                        ...JSON.parse(req.body.article),
                        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    ModelsArticle.Article.update({ article_id: req.params.id }, { ...article, article_id: req.params.id })
                        .then(() => res.status(200).json({ message: 'article modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
        console.log("test3 Fin")
            .catch(() => res.status(500).json({ message: 'Erreur Article non modifié !' }));
    } else {
        // Si l'image n'est jamais modifiée
        const article = { ...req.body };
        ModelsArticle.Article.update({ article_id: req.params.id }, { ...article, article_id: req.params.id })
            .then(() => res.status(200).json({ message: 'article modifié !' }))
            .catch(error => res.status(400).json({ error }));
        console.log("Test Article modifié fin")
    }
};
// Supprimer un article / DELETE 

exports.deleteModelsArticle = (req, res, next) => {
    console.log("Test Article supprimé Debut")

    ModelsArticle.Article.findOne({ where: { article_id: req.params.id } })
        .then(ModelsArticle => {
            const filename = ModelsArticle.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                ModelsArticle.destroy({ article_id: req.params.id })
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
// Définit le statut "like" pour le userID fourni.   POST

exports.createLikeModelsArticle = (req, res, next) => {
    /* userId  */
    const userId = req.body.userId;
    /* Like présent dans le body */
    const like = req.body.like;
    /* l'id de l'article / post */
    const article = req.params.id;
    ModelsArticle.Article.findOne({ where: { vote_id: article } })
        .then(article => {
            switch (like) {
                // Dislike : Si like = -1, l'utilisateur n'aime pas l'article / post
                case -1:
                    console.log('Je n`aime pas');
                    article.push(userId);
                    article.dislike += 1;
                    break;
                // Je ne sais pas  : Si like = 0, L'utilisateur annule son like ou son dislike

                case 0:
                    console.log('je sais pas');
                    if (ModelsArticle.Vote.indexOf(userId) != -1) {
                        article.splice(userId, 1)
                        article.like -= 1;
                    } else if (ModelsArticle.Vote.indexOf(userId) != -1) {
                        article.splice(userId, 1)
                        article.dislike -= 1;
                    }
                    break;
                // like : Si like = 1, L'utilisateur aime l'article / post

                case 1:
                    console.log('j`aime');
                    article.push(userId);
                    article.like += 1;
                    break;
            };
            article.save()
                .then(() => {
                    res.status(200).json({ message: 'article notée' })
                })
                .catch(error => res.status(403).json({ error }))
        });
};
exports.createModelsCommentaire = (req, res, next) => {
    console.log("Test Commentaire crée Debut")
    // Appel du body de l'article ou du post crée.
    // console.log(req.body)
    let commentaire = req.body.commentaire;

    ModelsArticle.Commentaire.create(
        {
            ...commentaire,
            commentaire_id: req.body.commentaire_id,
            texte: req.body.texte,
            id_article: req.body.id_article,
            id_user: req.body.id_user,
        }).then(() => res.status(201).json(commentaire))
        .catch(error => res.status(400).json({ message: error.message }));
    console.log("Test Commentaire crée fin")
};
exports.getAllModelsCommentaire = (req, res, next) => {
    console.log("Test Commentaire crée Debut")

    ModelsArticle.Commentaire.findOne({ where: { commentaire_id: req.params.id } })
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
    console.log("Test Commentaire crée fin")
};

// Modifier un commentaire / PUT  

exports.modifyModelsCommentaire = (req, res, next) => {
    console.log("Test Article modifié Debut")

    if (req.file) {
        // Si l'image est modifiée L'ancienne image dans le  dossier/ Image doit être supprimé.
        ModelsArticle.Commentaire.findOne({ where: { commentaire_id: req.params.id } })
            .then(ModelsArticle => {
                const filename = ModelsArticle.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    // Une fois que l'ancienne image est supprimée dans le dossier image.On peut mettre à jour le reste des données de l'article
                    const article = {
                        ...JSON.parse(req.body.article),
                        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    ModelsArticle.update({ commentaire_id: req.params.id }, { ...article, commentaire_id: req.params.id })
                        .then(() => res.status(200).json({ message: 'article modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        // Si l'image n'est jamais modifiée
        const commentaire = { ...req.body };
        ModelsArticle.Commentaire.update({ commentaire_id: req.params.id }, { ...commentaire, commentaire_id: req.params.id })
            .then(() => res.status(200).json({ message: 'article modifié !' }))
            .catch(error => res.status(400).json({ error }));
        console.log("Test Article modifié fin")
    }
};
// Supprimer un commentaire / DELETE 

exports.deleteModelsCommentaire = (req, res, next) => {
    console.log("Test Article supprimé Debut")

    ModelsArticle.Article.findOne({ where: { commentaire_id: req.params.id } })
        .then(ModelsArticle => {
            const filename = ModelsArticle.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                ModelsArticle.destroy({ commentaire_id: req.params.id })
                    .then(() => res.status(200).json({ message: 'article supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
    console.log("Test Article supprimé fin")
};