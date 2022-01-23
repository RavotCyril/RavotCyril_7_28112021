const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//* Routes Articles + Like  */

router.get('/', auth, articlesCtrl.getAllModelsArticle);
router.get('/:id', auth, articlesCtrl.getOneModelsArticle);
router.post('/', auth, multer, articlesCtrl.createModelsArticle);
router.post('/:id/like', auth, articlesCtrl.createLikeModelsArticle);
router.put('/:id', auth, multer, articlesCtrl.modifyModelsArticle);
router.delete('/:id', auth, articlesCtrl.deleteModelsArticle);

//* Routes Commentaires  */

router.get('/', auth, multer, articlesCtrl.getAllModelsCommentaire);
router.post('/', auth, multer, articlesCtrl.createModelsCommentaire);
router.put('/:id', auth, multer, articlesCtrl.modifyModelsCommentaire);
router.delete('/:id', auth, articlesCtrl.deleteModelsCommentaire);

module.exports = router;