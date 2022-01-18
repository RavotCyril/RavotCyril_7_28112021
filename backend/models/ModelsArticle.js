
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

/**
 * ROLE
 */
const Role = sequelize.define('role', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING(255), allowNull: false },
}, { tableName: 'role', timestamps: false, underscored: true } //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique pour les dates de création et de modification (très pratique si nécessaire) et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId".
);
exports.Role = Role;

/*
 * USER
 */
const User = sequelize.define('user', {
    user_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    firstname: { type: Sequelize.STRING(255), required: true },
    email: { type: Sequelize.STRING(255), required: true, unique: true },
    password: { type: Sequelize.STRING(255), required: true, unique: true },
    role_id: { type: Sequelize.INTEGER, required: true },
}, { tableName: 'user', timestamps: false, underscored: true });
exports.User = User;

User.belongsTo(Role); //l'utilisateur à un rôle.


// TODO créer les tables article, commentaire,vote
/*
 * Article
 */
const Article = sequelize.define('article', {
    article_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    sujet: { type: Sequelize.STRING(255), allowNull: false, },
    texte: { type: Sequelize.STRING(255), allowNull: false, unique: true },
    date: { type: Sequelize.STRING(255), allowNull: false },
    image: { type: Sequelize.STRING(255), allowNull: false },
    user_id: { type: Sequelize.INTEGER, allowNull: false },
}, { tableName: 'article', timestamps: false, underscored: true });
exports.Article = Article;
/*
 * Commmentaire
 */
const Commentaire = sequelize.define('commentaire', {
    commentaire_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    texte: { type: Sequelize.STRING(255), allowNull: false, },
    id_article: { type: Sequelize.INTEGER, allowNull: false, },
    id_user: { type: Sequelize.INTEGER, allowNull: false, },
}, { tableName: 'commentaire', timestamps: false, underscored: true });
exports.Commentaire = Commentaire;

/*
 * Vote
 */
const Vote = sequelize.define('vote', {
    vote_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    like: { type: Sequelize.INTEGER },
    dislike: { type: Sequelize.INTEGER },
    article_id: { type: Sequelize.INTEGER },
    user_id: { type: Sequelize.INTEGER },
}, { tableName: 'vote', timestamps: false, underscored: true });
exports.Vote = Vote;




//init();

// //on importe le modèle
// const Model = require('../models/Model');
// //recherche de tous les utilisateurs
// Model.User.findAll().then(users => {
//     //on récupère ici un tableau "users" contenant une liste d'utilisateurs
//     console.log(users);
// }).catch(function(e) {
//     //gestion erreur
//     console.log(e);
// });

// async function init(){
//     await sequelize.sync()
// }