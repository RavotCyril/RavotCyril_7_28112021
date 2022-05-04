const express = require('express');
const router = express.Router();

const votesCtrl = require('../controllers/votes');
const auth = require('../middleware/auth');

//* Routes Articles + Like  */

router.post('/', auth, votesCtrl.createLikeModelsArticle);


/* Exporte le routeur Express */

module.exports = router;