const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//* Routes Articles + Like  */

router.get('/', articlesCtrl.getAllModelsArticle);
router.get('/:id', articlesCtrl.getOneModelsArticle);
router.post('/', multer, articlesCtrl.createModelsArticle);
router.put('/:id', multer, articlesCtrl.modifyModelsArticle);
router.delete('/:id', articlesCtrl.deleteModelsArticle);


/* Exporte le routeur Express */

module.exports = router;