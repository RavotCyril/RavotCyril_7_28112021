const Models = require('../models/articles');

// Définit le statut "like" pour le userID fourni.   POST

exports.createLikeModelsArticle = (req, res, next) => {
	/* userId  */
	console.log("Debut Like");
	const userId = req.body.user_id;
	/* Like présent dans le body */
	const like = req.body.like;
	/* l'id de l'article / post */
	let voteBody = req.body.article_id;

	Models.Vote.findOne()
		.then(Models => {
			switch (like) {
				// Je ne sais pas  : Si like = 0, L'utilisateur annule son like ou son dislike
				case 0:
					//console.log(vote)
					if (Models != null) {
						// ici j'ai une corespondance et je la supprime
						Models.destroy()
							.then(() => {
								return res.status(200).json({ message: 'article pas aimé' })
							})
					}
					break;
				// like : Si like = 1, L'utilisateur aime l'article / post

				case 1:
					if (Models == null) {
						Models.Vote.create(voteBody).then(() => {
							return res.status(200).json({ message: 'article aimé' })
						})

					}
					break;
			}
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({ error })
	  });
	};