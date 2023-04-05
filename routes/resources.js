var express = require('express');
var router = express.Router();

const {createResources, getResources} = require('../controller/resourcesController')

router.post('/add', createResources)
router.get('/detail/:page', getResources)

module.exports = router