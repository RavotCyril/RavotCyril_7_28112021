const Models = require('../models/articles');

// Définit le statut "like" pour le userID fourni.   POST

exports.createLikeModelsArticle = (req, res, next) => {
	/* userId  */
	console.log("Debut Like");
	const userId = req.body.user_id;
	/* Like présent dans le body */
	const like = req.body.like;
	/* l'id de l'article / post */
	const article_id = req.params.id;
	Models.Article.findOne({ where: { vote_id: article_id } })
		.then(article_id => {
			switch (like) {
				// Dislike : Si like = -1, l'utilisateur n'aime pas l'article / post
				case -1:
					article_id.log('Je n`aime pas');
					article_id.push(userId);
					article_id.dislike += 1;
					break;
				// Je ne sais pas  : Si like = 0, L'utilisateur annule son like ou son dislike

				case 0:
					console.log('je sais pas');
					if (Models.Vote.indexOf(userId) != -1) {
						article_id.splice(userId, 1)
						article_id.like -= 1;
					} else if (Models.Vote.indexOf(userId) != -1) {
						article_id.splice(userId, 1)
						article_id.dislike -= 1;
					}
					break;
				// like : Si like = 1, L'utilisateur aime l'article / post

				case 1:
					console.log('j`aime');
					article_id.push(userId);
					article_id.like += 1;
					break;
			};
			article_id.save()
				.then(() => {
					res.status(200).json({ message: 'article notée' })
				})
				.catch(error => res.status(403).json({ error }))
		});
	console.log("Fin Like");
};