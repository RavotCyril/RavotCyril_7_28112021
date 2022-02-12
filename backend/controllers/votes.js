const Models = require('../models/articles');

// Définit le statut "like" pour le userID fourni.   POST

exports.createLikeModelsArticle = (req, res, next) => {
	/* userId  */
	//console.log("Debut Like");
	console.log(req.body)
	const userId = req.body.vote.user_id;
	//console.log(userId);
	// console.log(Models.User.user_id)
	/* Like présent dans le body */
	const like = req.body.vote.like;
	/* l'id de l'article / post */
	let voteBody = req.body.vote;

	Models.Vote.findOne({ where: { article_id: voteBody.article_id, user_id: userId } })
		.then(vote => {
			switch (like) {
				// Je ne sais pas  : Si like = 0, L'utilisateur annule son like ou son dislike
				case 0:
					//console.log(vote)
					if (vote != null) {
						// ici j'ai une corespondance et je la supprime
						vote.destroy({ article_id: vote.article_id, user_id: userId })
							.then(() => {
								return res.status(200).json({ message: 'article pas aimé' })
							})
					}
					break;
				// like : Si like = 1, L'utilisateur aime l'article / post

				case 1:
					if (vote == null) {
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