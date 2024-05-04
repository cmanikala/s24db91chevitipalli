var watch = require('../models/watches');
// List of all watchs
// List of all Costumes
exports.watch_list = async function (req, res) {
    try {
        thewatch = await watch.find();
        res.send(thewatch);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific watch.
// for a specific Costume.
exports.watch_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await watch.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle watch create on POST.
// Handle Costume create on POST.
exports.watch_create_post = async function (req, res) {
    console.log(req.body)
    let document = new watch();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.watch_brand = req.body.watch_brand;
    document.watch_type = req.body.watch_type;
    document.cost = req.body.cost;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle watch delete from on DELETE.
// Handle Costume delete on DELETE.
exports.watch_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await watch.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};
// Handle watch update form on PUT.
exports.watch_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: watch update PUT' + req.params.id);
};
exports.watch_view_all_Page = async function (req, res) {
    try {
        thewatch = await watch.find();
        res.render('watches', { title: 'watch Search Results', results: thewatch });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
//Handle Costume update form on PUT.
exports.watch_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await watch.findById(req.params.id)
        // Do updates of properties
        if (req.body.watch_brand)
            toUpdate.watch_brand = req.body.watch_brand;
        if (req.body.cost) toUpdate.cost = req.body.cost;
        if (req.body.watch_type) toUpdate.watch_type = req.body.watch_type;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
};
// Handle a show one view with id specified by query
exports.watch_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await watch.findById(req.query.id)
        res.render('watchdetail',
            { title: 'watch Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.watch_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('watchcreate', { title: 'watch Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
    // Handle building the view for updating a costume.
    // query provides the id
    exports.watch_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await watch.findById(req.query.id)
    res.render('watchupdate', { title: 'watch Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
// Handle a delete one view with id from query
exports.watch_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await watch.findById(req.query.id)
    res.render('watchdelete', { title: 'watch Delete', toShow:
    result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };