var MongoClient = require('mongodb').MongoClient;
var request = require('request'); 
var cronJob = require('cron').CronJob;

//var job = new cronJob('*/24 * * * * *', function() {
	MongoClient.connect('mongodb://172.31.39.118:27017/reddit', function(err, db){
		if (err) throw err; 
		console.log("cron job worked!"); 
		request('http://www.reddit.com/r/nba/.json', function (error, response, body) {
					if (!error && response.statusCode == 200) {
						var obj = JSON.parse(body); 
					
						var stories = obj.data.children.map(function (story) { return story.data}); 
						for (var i =0; i < stories.length; i++) {
								
							//console.dir("test");				
							var id = stories[i].name;
							stories[i]._id = id;
							stories[i].position = i;

							var query = {'position' : i};
							var sorter = [];
							var operator = {'$set':{'position':-1}}; 
							var options = {'new': true}; 

							db.collection('nba').findAndModify(query, sorter, operator, options, function (err, doc) {
									if(err) throw err; 
									if (!doc) console.log("no previous position"); 
									else console.log("Position updated!"); 
							});

							var query2 = {'_id' : id};
							var operator2 = stories[i]; 
							var options2 = {'upsert': true}; 

							db.collection('nba').update(query2, operator2, options2, function (err, data) {
									if(err) throw err; 
									console.dir(data); 
						

							});
			
						}	
			
					}
		
					else console.log(error); 
			
					db.close();
	
		});
	

	});

//}, null, true, "America/Los_Angeles"); 
