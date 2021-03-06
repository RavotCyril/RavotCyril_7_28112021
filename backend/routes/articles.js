const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


/* Administrateur qui peut supprimer les articles des utilisateurs */

router.delete('/:id', auth, articlesCtrl.deleteAdminModelsArticle);

//* Routes Articles + Like  */

router.get('/', auth, articlesCtrl.getAllModelsArticle);
router.get('/:id', auth, articlesCtrl.getOneModelsArticle);
router.post('/', auth, multer, articlesCtrl.createModelsArticle);
router.put('/:id', auth, multer, articlesCtrl.modifyModelsArticle);
router.delete('/:id', auth, articlesCtrl.deleteModelsArticle);


/* Exporte le routeur Express */

module.exports = router;