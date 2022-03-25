const express = require('express');
const router = express.Router();

const commentairesCtrl = require('../controllers/commentaires');
// const auth = require('../middleware/auth');

//* Routes Commentaires  */

router.get('/', commentairesCtrl.getAllModelsCommentaire);
router.post('/', commentairesCtrl.createModelsCommentaire);
router.put('/:id', commentairesCtrl.modifyModelsCommentaire);
router.delete('/:id', commentairesCtrl.deleteModelsCommentaire);


/* Exporte le routeur Express */

module.exports = router;