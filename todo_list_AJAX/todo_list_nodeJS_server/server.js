/**
 * Created by n9639799 on 16/12/2016.
 */
// BASE SETUP
// =============================================================================
var express=require('express');
var app=express();
var bodyParser=require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


var Datastore = require('nedb')
    , db = new Datastore();
//Add item to test db
var item={item_name:"Install steam",item_status:0};
db.insert(item, function(err,newDoc){

});
item={item_name:"Update dota to 7.00",item_status:0};
db.insert(item, function(err,newDoc){

});


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

//middleware to use for all requests
router.use(function(req,res,next){
    console.log('Sth is happening');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/',function(req,res){
   res.json({message:'welcome to our api'});
});
router.route('/items')
    //create an item (accessed at POST http://localhost:8080/api/items
    .post(function(req,res){

        var item={item_name:req.body.name,item_status:req.body.status};
        console.log(item);
        db.insert(item, function(err,newDoc){
            res.json({ message: 'Item created!' });
        });
    })
    //get all todo items
    .get(function(req,res){
        // Find all documents in the collection
        db.find({}, function (err, docs) {
            console.log(docs);
            res.json(docs);
        });
    })
;
router.route('/items/:item_id')
    //delete item with id
    .delete(function(req,res){

        console.log(req.params.item_id);
        db.remove({_id:req.params.item_id},{},function (err,numRemoved) {
            console.log('Remove '+req.params.item_id+ 'successfully!');
            res.json({ message: 'Remove '+req.params.item_id+ 'successfully!'});
        });
    })
    //update item with id
    .put(function(req,res){
        db.update({_id:req.params.item_id},{item_name:req.body.name,item_status:req.body.status},{},function(err, numReplaced){
            console.log('Update '+req.params.item_id+ 'successfully!');
            res.json({ message: 'Update '+req.params.item_id+ 'successfully!'});
        })
    })
;


//register routes
app.use('/api',router);
//START the server
app.listen(port);
console.log('Magic happens on port ' + port);