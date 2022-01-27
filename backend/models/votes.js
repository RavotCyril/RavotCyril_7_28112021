
/* Importation du module Sequelize  */

const { Sequelize } = require('sequelize');

/* Il s'agit du chemin de connexion MySQL. Il contient le nom de la base de données,
le nom d'utilisateur, le mot de passe, le nom d'hôte */

const sequelize = new Sequelize('groupomaniabis', 'root', 'Lollol69.', {
	host: 'localhost',
	dialect: 'mysql',
	logging: false, //passer a true pour voir les différentes requêtes effectuées par l'ORM

});
try {
	sequelize.authenticate();
	console.log('Connecté à la base de données MySQL!');
} catch (error) {
	console.error('Impossible de se connecter, erreur suivante :', error);
}
//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = module.exports = {};
exports.sequelize = sequelize;

/* Model  Vote*/

const Vote = sequelize.define('vote', {
	vote_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	like: { type: Sequelize.INTEGER },
	dislike: { type: Sequelize.INTEGER },
	article_id: { type: Sequelize.INTEGER },
	user_id: { type: Sequelize.INTEGER },
}, { tableName: 'vote', timestamps: false, underscored: true });

exports.Vote = Vote;