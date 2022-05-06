const Models = require('../models/articles');
// Définit le statut "like" pour le userID fourni.   POST

exports.createLikeModelsArticle = (req, res, next) => {

	const user_id = req.body.user_id;
	/* Like présent dans le body */
	const like = req.body.like;
		/* Like présent dans le body */
	const dislike = req.body.dislike;
	/* l'id de l'article / post */
    const article_id =req.body.article_id
    
    Models.Vote.findOne({where: { article_id: req.params.id}})
        .then(article_id => {
            console.log("avant " + article_id)
            switch (like,dislike) {
                // Dislike : Si like = -1, l'utilisateur n'aime pas l'article'.
                case -1:
                    // console.log('Je n`aime pas');
                    article_id.push(user_id);
                    article_id.dislike += 1;
                    break;
                    // Je ne sais pas  : Si like = 0, L'utilisateur annule son like ou son dislike.

                case 0:
                    console.log('je sais pas');
                    if (article_id.indexOf(user_id) != -1) {
                        article_id.splice(user_id, 1)
                        article_id.like -= 1;
                    } else if (article_id.indexOf(user_id) != -1) {
                        article_id.splice(user_id, 1)
                        article_id.dislike -= 1;
                    }
                    break;
                    // like : Si like = 1, L'utilisateur aime l'article.

                case 1:
                    console.log('j`aime');
                    article_id.push(user_id);
                    article_id.like += 1;
                    break;
            };
            Models.Vote.create()
                .then(() => {
                    console.log("après " + article_id)
                    res.status(200).json({ message: 'article_id notée' })
                })
                .catch(error => res.status(403).json({ error }))
        });
	};