const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();


const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/projectdb', (err, db) => {
        if (err) return express.close();

         closure(db);
    });
};
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}));

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};





router.get('/home', (req, res) => {
    connection((db) => {
        db.collection('taiteldb')
            .find()
            .toArray()
            .then((taitels) => {
                response.data = taitels;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});
router.get('/home/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    
    connection((db) => {
        db.collection('taiteldb')
        .findOne(details, (err, item) => {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send(item);
            } 
        })
    });
});


router.get('/person', (req, res) => {
    connection((db) => {
        db.collection('persondb')
            .find()
            .toArray()
            .then((taitels) => {
                response.data = taitels;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/person/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    
    connection((db) => {
        db.collection('persondb')
        .findOne(details, (err, item) => {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send(item);
            } 
        })
    });
});

router.post("/home", jsonParser, (req, res) => {
      
     if(!req.body) return res.sendStatus(400); 
    
    var encodedData = req.body.data64;
    var taitelId = req.body.id;
    var taitelName = req.body.name;
    var taitel = {id: taitelId, name: taitelName, data64: encodedData};
    connection((db) => {
        db.collection('taiteldb').insertOne(taitel)
    });
});

router.put("/home", jsonParser, (req, res) => {

	
      if(!req.body) return res.sendStatus(400);   

    var encodedData = req.body.data64;  
    var taitel_id = req.body._id;
    var taitelId = req.body.id;
    var taitelName = req.body.name;
    var taitel = { "id": taitelId, "name": taitelName, "data64": encodedData};
    
    console.log(taitel_id);
    connection((db) => {
        db.collection('taiteldb').updateOne( { "id" : taitelId }, { $set: taitel })
            
    }); 
})

router.delete("/home/:id", jsonParser, (req, res) => {

	const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    
    connection((db) => {
        db.collection('taiteldb').deleteOne(details)
            
    });
})

router.post("/person", jsonParser, (req, res) => {
      
    if(!req.body) return res.sendStatus(400); 
    
   var encodedData = req.body.data64;
   var personId = req.body.id;
   var personName = req.body.name;
   var personDescription = req.body.description;
   var person = {id: personId, name: personName, description: personDescription,
      data64: encodedData };
     
   connection((db) => {
       db.collection('persondb').insertOne(person)
   });
});

router.put("/person", jsonParser, (req, res) => {
 console.log("работай");
	
    if(!req.body) return res.sendStatus(400);   

    var encodedData = req.body.data64;  
  var person_id = req.body._id;
  var personId = req.body.id;
  var personName = req.body.name;
  var personPutName = req.body.putName;
  var personDescription = req.body.description;
  var person = {"id": personId, "name": personPutName, "description": personDescription, "data64": encodedData};
  
 
  console.log(personId);
 
  connection((db) => {
      db.collection('persondb').updateOne( { "name" : personName }, { $set: person })
          
  }); 
})

router.delete("/person/:id", jsonParser, (req, res) => {
    
	const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    
    connection((db) => {
        db.collection('persondb').deleteOne(details)
            
    });
})
module.exports = router;