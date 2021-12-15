/* authentification  */


/* Importation du module Sequelize  */

const Sequelize = require('sequelize');

/* Il s'agit du chemin de connexion MySQL. Il contient le nom d'utilisateur, le mot de passe, 
le nom d'hôte, le port de la base de données et le nom de la base de données. */

const path = 'mysql://root:lollol69.@localhost:3306/groupomania';

/* /* On test la connexion à la base de donnée MYSQL.
Un message de validation apparait quand on est connecté à la base de données MySQL. 
Ou un message d'erreur si ce n'est pas le cas */

const sequelize = new Sequelize(path, { operatorsAliases: false });

sequelize.authenticate().then(() => {
	console.log('Connection established successfully.');
 }).catch(err => {
	console.error('Unable to connect to the database:', err);
 }).finally(() => {
	sequelize.close();
 });
// On exporte pour utiliser notre connexion depuis les autre fichiers.
const exports = module.exports = {};
exports.sequelize = sequelize;

/**
 * ROLE
 */
 const Role = sequelize.define('role', {
	id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
	name: {type: Sequelize.STRING(255), allowNull: false},
},
		 {tableName: 'role', timestamps: false, underscored: true}//par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique pour les dates de création et de modification (très pratique si nécessaire) et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId".
);
exports.Role = Role;

/*
* USER
*/
const User = sequelize.define('user', {
	id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
	name: {type: Sequelize.STRING(255), allowNull: false, },
	email: {type: Sequelize.STRING(255), allowNull: false, unique: true},
},
		 {tableName: 'user', timestamps: false, underscored: true}
);
User.belongsTo(Role);//l'utilisateur à un rôle.
sequelize.sync({logging: console.log});

  //on importe le modèle
  const Model = require('./Model');
  //recherche de tous les utilisateurs
  Model.User.findAll().then(users => {
		//on récupère ici un tableau "users" contenant une liste d'utilisateurs
		console.log(users);
  }).catch(function (e) {
		//gestion erreur
		console.log(e);
  });
  //recuperations des utilisateurs correspondants au différents rôles
  Model.Role.findAll({include: [{model: Model.User}]}).then(roles => {
	//pour chaque role on peux parcourir la liste des ses utilisateurs
	roles.forEach((role) => {
		 console.log(role.name);
		 role.users.forEach((user) => {
			  console.log(user.name);
		 });
	});
//...
});

exports.User = User;