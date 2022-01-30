const express = require('express');
const router = express.Router();

const commentairesCtrl = require('../controllers/commentaires');
const auth = require('../middleware/auth');

//* Routes Commentaires  */

router.get('/', auth, commentairesCtrl.getAllModelsCommentaire);
router.post('/', auth, commentairesCtrl.createModelsCommentaire);
router.put('/:id', auth, commentairesCtrl.modifyModelsCommentaire);
router.delete('/:id', auth, commentairesCtrl.deleteModelsCommentaire);


/* Exporte le routeur Express */

module.exports = router;