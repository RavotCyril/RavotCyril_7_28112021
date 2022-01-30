const Models = require('../models/commentaires');

// Créer un commentaire / post

exports.createModelsCommentaire = (req, res, next) => {

	console.log("Test Commentaire crée Debut")
	// Appel du body du commentaire ou du post crée.
	// console.log(req.body)
	let commentaire = req.body.commentaire;

	Models.Commentaire.create(
		{
			...commentaire,
		}).then(() => res.status(201).json(commentaire))
		.catch(error => res.status(400).json({ message: error.message }));
	console.log("Test Commentaire crée fin")
};

// Afficher tout les commentaires / GET

exports.getAllModelsCommentaire = (req, res, next) => {
	console.log("Test Commentaire Lecture Debut")

	Models.Commentaire.findOne({ where: { commentaire_id: req.params.id } })
		.then(
			(Models) => {
				res.status(200).json(Models);
			}
		).catch(
			(error) => {
				res.status(404).json({
					message: error.message
				});
			}
		);
	console.log("Test Commentaire Lecture fin")
};

// Modifier un commentaire / PUT  

exports.modifyModelsCommentaire = (req, res, next) => {
	console.log("Test Article modifié Debut")

	// Si l'image est modifiée L'ancienne image dans le  dossier/ Image doit être supprimé.
	Models.Commentaire.findOne({ where: { commentaire_id: req.params.id } })
	Models.Commentaire.update({ ...commentaire, commentaire_id: req.params.id })
		.then(() => res.status(200).json({ message: 'commentaire modifié !' }))
		.catch(error => res.status(400).json({ error }));
};

// Supprimer un commentaire / DELETE 

exports.deleteModelsCommentaire = (req, res, next) => {
	console.log("Test Article supprimé Debut")
	Models.Commentaire.findOne({ where: { commentaire_id: req.params.id } })
		.then(Models => {
			Models.destroy({ commentaire_id: req.params.id })
				.then(() => res.status(200).json({ message: 'commentaire supprimée !' }))
				.catch(error => res.status(400).json({ error }));
		});
	console.log("Test Article supprimé fin")
};