/* Importation du module Sequelize  */

const { Sequelize } = require('sequelize');

/* Il s'agit du chemin de connexion MySQL. Il contient le nom de la base de données,
le nom d'utilisateur, le mot de passe, le nom d'hôte */

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: 'mysql',
	logging: false, //passer a true pour voir les différentes requêtes effectuées par l'ORM

});

//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = module.exports = {};
exports.sequelize = sequelize;

/* Commmentaire */

const Commentaire = sequelize.define('commentaire', {
	commentaire_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	texte: { type: Sequelize.STRING(255),allowNull: false, },
	date: { type: Sequelize.STRING(255), allowNull: false },
	id_article: { type: Sequelize.INTEGER,allowNull: false, },
	id_user: { type: Sequelize.INTEGER,allowNull: false, },
}, { tableName: 'commentaire', timestamps: false, underscored: true });

exports.Commentaire = Commentaire;
// sequelize.sync({force:true});