// const MongoClient = require("mongodb").MongoClient;

const { MongoClient, ObjectID } = require("mongodb"); // destructuring
//console.log("ObjectID.......", ObjectID);

var obj = new ObjectID();

console.log("obj.......", obj);

// object destructuring...... lets you to pull out object variab

var user = { name: "andrew", age: "25" };
var { name } = user;
console.log("user......", user);
console.log("name......", name);
// you dont need to create a db specifically in MONGODB , just specify , it creates it
// it will not create Database Until we start adding it
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to Mongo DB  Server");
  }
  console.log("connected to MongoDB Server");
  /*
  db.collection("Todos").insertOne(
    {
      text: "Something to do ",
      completed: false
    },
    (err, result) => {
      if (err) {
        return console.log("Unable to insert in Todos Collection", err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
    }
  );*/

  /*
  db.collection("Users").insertOne(
    {
      //_id: "1234", // we can create our own id with out usig mongo
      name: "Mahesh Babu",
      age: 36,
      location: "Sydney",
      Completed: false
    },
    (err, result) => {
      if (err) {
        return console.log("Unable to insert in Users Collection", err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));

      console.log("checking object id", result.ops[0]._id.getTimestamp());
    }
  );
*/
  db.close();

  // object id is a 12 byte value ,
  // which has 4byte timestamp
  // 3  byte machine identifier
  //2 bytes process id
  //3 bytes counter
  //rest random value
});
