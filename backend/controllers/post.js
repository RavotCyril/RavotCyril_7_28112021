const Model = require('../models/Model');
const fs = require('fs');

// Créer un article / post
exports.createModelArticle = (req, res, next) => {
    // Appel du body de l'article ou du post crée.
    let article = JSON.parse(req.body.article);
    const model = new Model({
        ...article,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    model.save()
        .then(() => res.status(201).json({ message: 'article enregistrée !' }))
        .catch(error => {
            res.status(400).json({ error })
        });
};

// Afficher un seule article / post

exports.getOneModelArticle = (req, res, next) => {
    Model.findOne({
            _id: req.params.id,
        })
        .then(
            (Model) => {
                res.status(200).json(Model);
            }
        ).catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );
};
// Modifier un article / post  

exports.modifyModelArticle = (req, res, next) => {
    if (req.file) {
        // Si l'image est modifiée L'ancienne image dans le  dossier/ Image doit être supprimé.
        Model.findOne({ _id: req.params.id })
            .then(model => {
                const filename = model.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    // Une fois que l'ancienne image est supprimée dans le dossier image.On peut mettre à jour le reste des données de l'article
                    const article = {
                        ...JSON.parse(req.body.article),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Model.updateOne({ _id: req.params.id }, {...article, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'article modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        // Si l'image n'est jamais modifiée
        const article = {...req.body };
        Model.updateOne({ _id: req.params.id }, {...article, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'article modifié !' }))
            .catch(error => res.status(400).json({ error }));
    }
};
// Supprimer un article / post 

exports.deleteModelArticle = (req, res, next) => {
    Model.findOne({ _id: req.params.id })
        .then(Model => {
            const filename = Model.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Model.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'article supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
// Afficher tous les articles / post

exports.getAllArticles = (req, res, next) => {
    Model.find().then(
        (Model) => {
            res.status(200).json(Model);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
// Définit le statut "like" pour l'userId fourni. 

exports.createLikeArticle = (req, res, next) => {
    /* UserId  */
    const userId = req.body.userId;
    /* Like présent dans le body */
    const like = req.body.like;
    /* l'id de l'article / post */
    const article = req.params.id;
    Model.findOne({ _id: article })
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