/**
 * Created by n9639799 on 16/12/2016.
 */
// BASE SETUP
// =============================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


var Datastore = require('nedb')
    , db = new Datastore();
//Add item to test db
var item = {name: "Install steam", status: 0};
db.insert(item, function (err, newDoc) {

});
item = {name: "Update dota", status: 0};
db.insert(item, function (err, newDoc) {

});
item = {name: "Learn English", status: 1};
db.insert(item, function (err, newDoc) {

});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

//middleware to use for all requests
router.use(function (req, res, next) {

    //Solve CORS problem
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function (req, res) {
    res.json({message: 'welcome to our api'});
});
router.route('/items')
//create an item (accessed at POST http://localhost:8080/api/items
    .post(function (req, res) {

        var item = {name: req.body.name, status: req.body.status};

        db.insert(item, function (err, newDoc) {
            console.log("Created an item, id="+newDoc._id);
            res.json({_id:newDoc._id,message: 'Item created!'});
        });
    })
    //get all todo items
    .get(function (req, res) {
        // Find all documents in the collection
        db.find({}, function (err, docs) {
            res.json(docs);
        });
    })
;
router.route('/items/:item_id')
    //delete item with id
    .delete(function (req, res) {
        console.log(req.params.item_id);
        db.remove({_id: req.params.item_id}, {}, function (err, numRemoved) {
            console.log('Delete id=' + req.params.item_id + 'successfully!');
            res.json({_id: req.params.item_id, message: 'Delete successfully!'});
        });
    })
    //update item with id
    .put(function (req, res) {
        db.update({_id: req.params.item_id}, {
            name: req.body.name,
            status: req.body.status
        }, {}, function (err, numReplaced) {
            console.log('Update id=' + req.params.item_id + 'successfully!');
            res.json({_id: req.params.item_id, message: 'Update successfully!'});
        })
    })
;


//register routes
app.use('/api', router);
//START the server
app.listen(port);
console.log('Magic happens on port ' + port);