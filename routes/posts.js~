var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var db;
var mongo = require('mongodb');
var BSON = mongo.BSONPure;


var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
        db = mongoClient.db("reddit");
        db.collection('nba', {strict:true}, function(err, collection){
        if(err) {
                console.log("There was a problem with the database");
        }

    });

});


exports.findAll = function(req, res) {
    console.log("Find all console test");
    var name = req.query["name"];
    db.collection('nba', function(err, collection) { 
            collection.find({position:{$gt:-1}}, {position:1, title:1, url:1, author:1}).sort({position:1}).toArray(function(err, items) {
                console.log(items)
		res.jsonp(items);
            });
    });
}; 

exports.findOne = function(req, res){
	var myPosition = req.params.position;
	myPosition = parseInt(myPosition); 
	var query = {position: myPosition};
	db.collection('nba').findOne(query, function(err, document) {
		if (err) throw err; 
		var toReturn = ([document.position, document.title, document.url, document.author]);
		res.send(toReturn);			 
		return (toReturn);
    	});
 
};

