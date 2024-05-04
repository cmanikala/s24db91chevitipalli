var express = require('express');
var passport = require('passport');
const watch_controlers= require('../controllers/watches');
var router = express.Router();
/* GET costumes */
router.get('/', watch_controlers.watch_view_all_Page );
/* GET detail costume page */
//router.get('/detail', watch_controlers.watch_view_one_Page);
/* GET create costume page */
router.get('/create', watch_controlers.watch_create_Page);
/* GET create update page */
//router.get('/update', watch_controlers.watch_update_Page);
/* GET delete costume page */
//router.get('/delete', watch_controlers.watch_delete_Page);
/* GET update costume page */

// A little function to check if we have an authorized user and continue on
//or
// redirect to login.
const secured = (req, res, next) => {
if (req.user){
return next();
}
res.redirect("/login");
}
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
    });
router.get('/update',secured, watch_controlers.watch_update_Page); 
router.get('/delete',secured, watch_controlers.watch_delete_Page);
router.get('/detail',secured, watch_controlers.watch_view_one_Page);  
module.exports = router;
