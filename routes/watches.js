var express = require('express');
const watch_controlers= require('../controllers/watches');
var router = express.Router();
/* GET costumes */
router.get('/', watch_controlers.watch_view_all_Page );
/* GET detail costume page */
router.get('/detail', watch_controlers.watch_view_one_Page);
/* GET create costume page */
router.get('/create', watch_controlers.watch_create_Page);
/* GET create update page */
router.get('/update', watch_controlers.watch_update_Page);
/* GET delete costume page */
router.get('/delete', watch_controlers.watch_delete_Page);

module.exports = router;
