const Express = require("express");
//for making connection between different pages.
const Cors = require("cors");
//for reading json files.
const BodyParser = require("body-parser");
//mongoDb require connecting with mongoDb
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const { response } = require("express");
//connection url.
const CONNECTION_URL =
  "mongodb+srv://singhsujata:7l4CP6x7mvxcOXr7@cluster0.nl7lf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const DATABASE_NAME = "SageSujata";

var app = Express();
app.use(Cors());
app.use(BodyParser.json());


//connecting with mongodb

MongoClient.connect(CONNECTION_URL, function (err, db) {
  if (err) throw err;
  dbo = db.db("Demo");
 
  console.log("Connected");
  dbo.collection("person").find({});
});



// import data
app.get("/importdata", (request, response) => {
  dbo
    .collection("person")
    .find({})
    .toArray((error, result) => {
      if (error) {
        return response.status(500).send(error);
      }
      response.send(result);
    });
});



// export data
app.post("/exportdata", (request, response) => {
  dbo.collection("person").insert(request.body, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    console.log("Data Sent");
    response.json(true);
  });
});




//User Id get

//TO_DO : Naming conventions should be good, For eg. this api route name should be "getUserById"

app.get("/test/:id", (request, response) => {
  dbo
    .collection("person")
    .findOne({ _id: new ObjectId(request.params.id) }, function (err, res) {
      if (err) console.log(err);
      response.send(res);
    });
});






//Name should Update User details 
app.put("/update/:id", (req, response) => {
  console.log(req.body);
  var myquery = { _id: ObjectId(req.params.id) };
  var newvalues = { $set: { name: req.body.name, username: req.body.username,email: req.body.email,phone: req.body.phone,website:req.body.website} };
  dbo.collection("person").updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log("One document updated");
    response.json(true);
  });
});


//delete api
app.listen(5001, () => {});
app.delete("/delete/:id", (req, res) => {
  dbo
    .collection("person")
    .deleteOne({ _id: ObjectId(req.params.id) }, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.json(true);
    });
});








