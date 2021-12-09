const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, articlesCtrl.getAllArticles);
router.get('/:id', auth, articlesCtrl.getOneModelArticle);
router.post('/', auth, multer, articlesCtrl.createModelArticle);
router.post('/:id/like', auth, articlesCtrl.createLikeArticle);
router.put('/:id', auth, multer, articlesCtrl.modifyModelArticle);
router.delete('/:id', auth, articlesCtrl.deleteModelArticle);

module.exports = router;