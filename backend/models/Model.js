/* authentification  */

/* Importation du module Sequelize  */

const Sequelize = require('sequelize');

/* Il s'agit du chemin de connexion MySQL. Il contient le nom de la base de données,
le nom d'utilisateur, le mot de passe, le nom d'hôte */

const sequelize = new Sequelize('groupomania', 'root', 'lollol69.', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, //passer a true pour voir les différentes requêtes effectuées par l'ORM
});
//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = module.exports = {};
exports.sequelize = sequelize;

/**
 * ROLE
 */
const Role = sequelize.define('role', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
        password: { type: Sequelize.STRING(255), allowNull: false, unique: true },
    }, { tableName: 'role', timestamps: false, underscored: true } //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique pour les dates de création et de modification (très pratique si nécessaire) et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId".
);
exports.Role = Role;

/*
 * USER
 */
const User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    firstname: { type: Sequelize.STRING(255), allowNull: false, },
    email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
    password: { type: Sequelize.STRING(255), allowNull: false, unique: true },
    vote: { type: Sequelize.NUMBER(1), allowNull: false, unique: true },
}, { tableName: 'user', timestamps: false, underscored: true });
exports.User = User;

User.belongsTo(Role); //l'utilisateur à un rôle.
sequelize.sync({ logging: console.log });

//on importe le modèle
const Model = require('../models/Model');
//recherche de tous les utilisateurs
Model.User.findAll().then(users => {
    //on récupère ici un tableau "users" contenant une liste d'utilisateurs
    console.log(users);
}).catch(function(e) {
    //gestion erreur
    console.log(e);
});
//recuperations des utilisateurs correspondants au différents rôles
Model.Role.findAll({ include: [{ model: Model.User }] }).then(roles => {
    //pour chaque role on peux parcourir la liste des ses utilisateurs
    roles.forEach((role) => {
        console.log(role.name);
        role.users.forEach((user) => {
            console.log(user.name);
        });
    });
    //...
});