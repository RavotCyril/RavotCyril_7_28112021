const ModelsArticle = require('../models/ModelsArticle');
const fs = require('fs');

// Créer un article / post
exports.createModelsArticle = (req, res, next) => {
    console.log("Test Article crée Debut")
    // Appel du body de l'article ou du post crée.
    let article = JSON.parse(req.body.article);
    const modelsArticle = new ModelsArticle({
        ...article,
        article_id: req.body.article_id,
        sujet: req.body.sujet,
        texte: req.body.texte,
        date: req.body.date,
        image: req.body.image,
        user_id: req.body.user_id,
    });
    modelsArticle.save()
        .then(() => res.status(201).json({ message: 'article enregistrée !' }))
        .catch(error => {
            res.status(400).json({ error })
        });
    console.log("Test Article crée fin")
};
// Afficher un seule article / GET

exports.getOneModelsArticle = (req, res, next) => {
    console.log("Test 1 Article Affiché Debut")

    ModelsArticle.findOne({
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
        ModelsArticle.findOne({ _id: req.params.id })
            .then(ModelsArticle => {
                const filename = ModelsArticle.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    // Une fois que l'ancienne image est supprimée dans le dossier image.On peut mettre à jour le reste des données de l'article
                    const article = {
                        ...JSON.parse(req.body.article),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    ModelsArticle.updateOne({ _id: req.params.id }, { ...article, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'article modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        // Si l'image n'est jamais modifiée
        const article = { ...req.body };
        ModelsArticle.updateOne({ _id: req.params.id }, { ...article, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'article modifié !' }))
            .catch(error => res.status(400).json({ error }));
        console.log("Test Article modifié fin")
    }
};
// Supprimer un article / DELETE 

exports.deleteModelsArticle = (req, res, next) => {
    console.log("Test Article supprimé Debut")

    ModelsArticle.findOne({ _id: req.params.id })
        .then(ModelsArticle => {
            const filename = ModelsArticle.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                ModelsArticle.deleteOne({ _id: req.params.id })
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
    ModelsArticle.find().then(
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
    ModelsArticle.findOne({ _id: article })
        .then(article => {
            switch (like) {
                // Dislike : Si like = -1, l'utilisateur n'aime pas l'article / post
                case -1:
                    // console.log('Je n`aime pas');
                    article.usersDisliked.push(userId);
                    article.dislikes += 1;
                    break;
                // Je ne sais pas  : Si like = 0, L'utilisateur annule son like ou son dislike

                case 0:
                    // console.log('je sais pas');
                    if (article.usersLiked.indexOf(userId) != -1) {
                        article.usersLiked.splice(userId, 1)
                        article.likes -= 1;
                    } else if (article.usersDisliked.indexOf(userId) != -1) {
                        article.usersDisliked.splice(userId, 1)
                        article.dislikes -= 1;
                    }
                    break;
                // like : Si like = 1, L'utilisateur aime l'article / post

                case 1:
                    // console.log('j`aime');
                    article.usersLiked.push(userId);
                    article.likes += 1;
                    break;
            };
            article.save()
                .then(() => {
                    res.status(200).json({ message: 'article notée' })
                })
                .catch(error => res.status(403).json({ error }))
        });
};