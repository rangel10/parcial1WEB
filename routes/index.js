var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'parcial1';

const findAllGraficas = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('graficas'); // cambiar
  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
};

const insertGraficas = function (db, data, callback) {
  // Get the documents collection
  const collection = db.collection('graficas');
  // Insert some documents
  console.log(data);
  collection.insertMany([data], function (err, result) {
    assert.equal(err, null);
    console.log("Inserted documents into the collection");
    callback(result);
  });
}

const findGraficas = function(db, query, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find(query).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}

function postGraficas(data, callback) {

  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertGraficas(db, data, function () {
      callback(data);
      client.close();
    });
  });
}

function getGraficas(callback) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    findAllGraficas(db, (data) => {
      callback(data);
      client.close();
    });
  });
}

function getGrafica(query, callback) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    findGraficas(db,query, (data) => {
      callback(data);
      client.close();
    });
  });
}


/* GET home page. */
router.get('/getGraficas', function (req, res, next) {
  //res.setHeader('Content-Type','application/json');
  getGraficas((data) => {
    res.send(data)
  })
});

router.post('/getGrafica', function (req, res, next) {
  //res.setHeader('Content-Type','application/json');
  let query = req.body;
  console.log(query); 
  getGrafica(query,(data) => {
    res.send(data)
  })
});

router.post('/postGraficas', function (req, res, next) {
  //res.setHeader('Content-Type','application/json');
  let dataP = req.body; 
  postGraficas(dataP, (data) => {
    res.send(data)
  })
});

module.exports = router;
