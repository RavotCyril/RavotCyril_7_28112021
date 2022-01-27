const Models = require('../models/commentaires');
const fs = require('fs');

// Créer un commentaire / post

exports.createModelsCommentaire = (req, res, next) => {

	console.log("Test Commentaire crée Debut")
	// Appel du body de l'article ou du post crée.
	// console.log(req.body)
	let commentaire = req.body.commentaire;

	Models.Commentaire.create(
		{
			commentaire,

		}).then(() => res.status(201).json(commentaire))
		.catch(error => res.status(400).json({ message: error.message }));
	console.log("Test Commentaire crée fin")
};

// Afficher tout les commentaires / GET

exports.getAllModelsCommentaire = (req, res, next) => {
	console.log("Test Commentaire crée Debut")

	Models.Commentaire.findOne({ where: { commentaire_id: req.params.id } })
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
	console.log("Test Commentaire crée fin")
};

// Modifier un commentaire / PUT  

exports.modifyModelsCommentaire = (req, res, next) => {
	console.log("Test Article modifié Debut")
	// console.log(req.file)
	// if (req.file) {
	// Si l'image est modifiée L'ancienne image dans le  dossier/ Image doit être supprimé.
	Models.Commentaire.findOne({ where: { commentaire_id: req.params.id } })
		.then(Models => {
			const filename = Models.image.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {
				// Une fois que l'ancienne image est supprimée dans le dossier image.On peut mettre à jour le reste des données de l'article
				const article = {
					...JSON.parse(req.body.article),
					image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
				}
				Models.update({ commentaire_id: req.params.id }, { ...article, commentaire_id: req.params.id })
					.then(() => res.status(200).json({ message: 'article modifié !' }))
					.catch(error => res.status(400).json({ error }));
			})
		})
		.catch(error => res.status(500).json({ error }));
	// } else {
	//     // Si l'image n'est jamais modifiée
	//     const commentaire = { ...req.body };
	//     Models.Commentaire.update({ commentaire_id: req.params.id }, { ...commentaire, commentaire_id: req.params.id })
	//         .then(() => res.status(200).json({ message: 'article modifié !' }))
	//         .catch(error => res.status(400).json({ error }));
	//     console.log("Test Article modifié fin")
	// }
};

// Supprimer un commentaire / DELETE 

exports.deleteModelsCommentaire = (req, res, next) => {
	console.log("Test Article supprimé Debut")

	Models.Article.findOne({ where: { commentaire_id: req.params.id } })
		.then(Models => {
			const filename = Models.image.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {
				Models.destroy({ commentaire_id: req.params.id })
					.then(() => res.status(200).json({ message: 'article supprimée !' }))
					.catch(error => res.status(400).json({ error }));
			});
		})
		.catch(error => res.status(500).json({ error }));
	console.log("Test Article supprimé fin")
};