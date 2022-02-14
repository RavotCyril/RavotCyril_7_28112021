
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

/* Model ROLE */
const Role = sequelize.define('role', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: Sequelize.STRING(255), allowNull: false },
}, { tableName: 'role', timestamps: false, underscored: true } //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique pour les dates de création et de modification (très pratique si nécessaire) et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId".
);
exports.Role = Role;

/* Model USER */

const User = sequelize.define('user', {
	user_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	firstname: { type: Sequelize.STRING(255), required: true },
	email: { type: Sequelize.STRING(255), required: true, unique: true },
	password: { type: Sequelize.STRING(255), required: true, unique: true },
	role_id: { type: Sequelize.INTEGER, required: true },
}, { tableName: 'user', timestamps: false, underscored: true });

exports.User = User;
User.belongsTo(Role); //l'utilisateur à un rôle.