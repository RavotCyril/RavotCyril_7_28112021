
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

/* Model Article */

const Article = sequelize.define('article', {
    article_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    sujet: { type: Sequelize.STRING(255), allowNull: false, },
    texte: { type: Sequelize.STRING(255), allowNull: false, unique: true },
    date: { type: Sequelize.STRING(255), allowNull: false },
    image: { type: Sequelize.STRING(255), allowNull: false },
    user_id: { type: Sequelize.INTEGER, allowNull: false },
}, { tableName: 'article', timestamps: false, underscored: true });

exports.Article = Article;