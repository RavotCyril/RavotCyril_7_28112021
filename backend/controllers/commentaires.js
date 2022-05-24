const Models = require('../models/commentaires');

// Créer un commentaire / post

exports.createModelsCommentaire = (req, res, next) => {
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
    Models.Commentaire.create({
        commentaire_id: req.body.commentaire_id,
        texte: req.body.texte,
        date:date,
        id_article: req.body.id_article,
        id_user: req.body.id_user
        }).then(() => res.status(201).json(({message: 'commentaire créé !'})))
        .catch(error => res.status(400).json({ message: error.message }));
};

// Afficher tout les commentaires / GET

exports.getAllModelsCommentaire = (req, res, next) => {

    Models.Commentaire.findAll()
        .then(
            (Models) => {                
                res.status(200).json(Models)
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
    console.log(req.body)

    Models.Commentaire.findOne({ where: { commentaire_id: req.params.id } })
    const commentaire = {
            ...req.body,
    }
    Models.Commentaire.update({...commentaire }, { where: { commentaire_id: req.params.id } })
    
        .then(() => res.status(200).json(commentaire))
        .catch(error => res.status(400).json({ error }));
};

// Supprimer un commentaire / DELETE 

exports.deleteModelsCommentaire = (req, res, next) => {
    Models.Commentaire.findOne()
        .then(Models => {
            Models.destroy({ commentaire_id: req.params.id })
                .then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        });
};