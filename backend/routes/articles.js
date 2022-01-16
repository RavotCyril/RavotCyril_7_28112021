const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, articlesCtrl.getAllModelsArticle);
router.get('/:id', auth, articlesCtrl.getOneModelsArticle);
router.post('/', auth, multer, articlesCtrl.createModelsArticle);
router.post('/:id/like', auth, articlesCtrl.createLikeModelsArticle);
router.put('/:id', auth, multer, articlesCtrl.modifyModelsArticle);
router.delete('/:id', auth, articlesCtrl.deleteModelsArticle);

module.exports = router;