/* Importation du module Sequelize  */

const { Sequelize } = require('sequelize');

/* Il s'agit du chemin de connexion MySQL. Il contient le nom de la base de données,
le nom d'utilisateur, le mot de passe, le nom d'hôte */

const sequelize = new Sequelize('groupomaniabis', 'root', 'Lollol69.', {
	host: 'localhost',
	dialect: 'mysql',
	logging: false, //passer a true pour voir les différentes requêtes effectuées par l'ORM

});

//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = module.exports = {};
exports.sequelize = sequelize;

/* Commmentaire */

const Commentaire = sequelize.define('commentaire', {
	commentaire_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	texte: { type: Sequelize.STRING(255) },
	id_article: { type: Sequelize.INTEGER },
	id_user: { type: Sequelize.INTEGER },
}, { tableName: 'commentaire', timestamps: false, underscored: true });

exports.Commentaire = Commentaire;
