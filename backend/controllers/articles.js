const Models = require('../models/articles');
const fs = require('fs');

/* Exporte la fonction Administrateur pour supprimer les articles des utilisateurs*/

exports.deleteAdminModelsArticle = (req, res, next) => {
    Models.Article.findOne({ where: { article_id: req.params.id } })
        .then(models => {
            const filename = models.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Models.Article.destroy({ where: { article_id: req.params.id } })
                    .then(() => res.status(200).json({message: 'article supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Créer un article / post

exports.createModelsArticle = (req, res, next) => {
     var date = new Date();
  // date = date.toString("MMM,yyy");
  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };
  date = dateParser(date);
  
    Models.Article.create({
            article_id: req.body.article_id,
            sujet: req.body.sujet,
            texte: req.body.texte,
            date: date,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            user_id: req.body.user_id
        }).then(() => res.status(201).json({ message: 'article créé !' }))
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
    if (req.file) {
      
    Models.Article.findOne({ where: { article_id: req.params.id } })
        .then(models => {

    /*  Si l'image est modifiée L'ancienne image dans le  dossier
        Image doit être supprimé en ne prends que le nom du fichier avec la méthode split.
        filename = nom du fichier 
        /images/ + Url fichier    
    */
            const filename = models.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {

    /*  Une fois que l'ancienne image est supprimée dans le dossier image.
        On peut mettre à jour le reste des données de l'article. 
    */
            const article = {
            ...req.body,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
            Models.Article.update( {...article, article_id: req.params.id },{ where: {article_id: req.params.id} })
                .then(() => {res.status(200).json(article)
                
                })
                .catch(error => 
         {
            res.status(400).json({ message: error.message })});
            })
        })
        .catch(error => res.status(500).json({ error }));
        } else {
    /*  Sinon si on ne modifie pas l'image.
        Req.File est indéfinit.On récupère l'image existante avec filename.
        Ou sinon on récupère le fichier avec le req.protocol
        Ensuite, on peut mettre à jour le reste des données de l'article. 
    */
        const article = {...req.body };
        const filename = article.image.split('/images/')[1];
            console.log("test-sans modification",article.image.split('/images/')[1])
        article.image = req.file == undefined ? filename : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        Models.Article.update({...article, article_id: req.params.id },{ where: {article_id: req.params.id} })
            .then(() => res.status(200).json({ message: 'article modifié !' }))
            .catch(error => {
                res.status(400).json({ message : error.message })});
    }
}

// Supprimer un article / DELETE 
exports.deleteModelsArticle = (req, res, next) => {
    Models.Article.findOne({ where: { article_id: req.params.id } })
        .then(models => {
            const filename = models.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Models.Article.destroy({ where: { article_id: req.params.id } })
                    .then((filename) => res.status(200).json({ filename,message: 'article supprimé !' }))
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