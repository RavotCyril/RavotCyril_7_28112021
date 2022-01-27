const express = require('express');
const router = express.Router();

const commentairesCtrl = require('../controllers/commentaires');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');



//* Routes Commentaires  */

router.get('/', auth, multer, commentairesCtrl.getAllModelsCommentaire);
router.post('/', auth, multer, commentairesCtrl.createModelsCommentaire);
router.put('/:id', auth, multer, commentairesCtrl.modifyModelsCommentaire);
router.delete('/:id', auth, commentairesCtrl.deleteModelsCommentaire);

module.exports = router;