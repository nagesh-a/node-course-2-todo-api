// const MongoClient = require("mongodb").MongoClient;

const { MongoClient, ObjectID } = require("mongodb"); // destructuring
//console.log("ObjectID.......", ObjectID);

var obj = new ObjectID();

// console.log("obj.......", obj);

// object destructuring...... lets you to pull out object variab

// var user = { name: "andrew", age: "25" };
// var { name } = user;
// console.log("user......", user);
// console.log("name......", name);
// you dont need to create a db specifically in MONGODB , just specify , it creates it
// it will not create Database Until we start adding it
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to Mongo DB  Server");
  }
  console.log("connected to MongoDB Server");

  //deleteOne
  //findOneAndDelete
  /*{
    "_id" : ObjectId("5a4c71df3b4561ea5e9c522e"),
    "text" : "Walk the dog",
    "completed" : false
} */
  // deleteMany
  /*
  db
    .collection("Todos")
    .deleteMany({ text: "Eat lunch" })
    .then(result => {
      console.log("-------result-------", result);
    });

*/
  /*
  db
    .collection("Todos")
    .deleteOne({ text: "Walk the dog" })
    .then(result => {
      console.log("-------result-------", result);
      console.log("-------done-------");
    });
  */

  // find one delete // delete the first match
  /*
  db
    .collection("Todos")
    .findOneAndDelete({ completed: false })
    .then(result => {
      console.log("-------result-------");
      console.log(result);
      console.log("-------done-------");
    });
*/

  // deleteMany
  /*
  db
    .collection("Users")
    .deleteMany({ name: "Mahesh Babu" })
    .then(result => {
      console.log("-------result-------");
      console.log(result);
      console.log("-------result-------");
    });
*/
  //    "_id" : ObjectId("5a4c3d793b4561ea5e9c4ec7"),
  // google mongodb udpate operators verify
  /*
  db
    .collection("Todos")
    .findOneAndUpdate(
      {
        _id: new ObjectID("5a4c3d513b4561ea5e9c4ec3")
      },
      {
        $set: { completed: true } // need to set the proper update operator
      },
      { returnOriginal: false }
    )
    .then(result => {
      console.log("-------result-------");
      console.log(result);
      console.log("-------done-------");
    });
*/

  //update name in users collection
  //    "_id" : ObjectId("5a4c71d43b4561ea5e9c522a"),

  //"text" : "Walk the dog",
  /*
  db
    .collection("Todos")
    .findOneAndUpdate(
      { _id: new ObjectID("5a4c71d43b4561ea5e9c522a") },
      {
        $set: { text: "Walk the Tiger" }
      },
      {
        returnOriginal: false
      }
    )
    .then(result => {
      console.log("-------findOneAndUpdate-:result-------");
      console.log(result);
      console.log("-------done-------");
    });
*/

  db
    .collection("Users")
    .findOneAndUpdate(
      {
        _id: new ObjectID("5a4b319e650de180a7cae59f")
      },
      {
        $inc: { age: 10 }
      },
      { returnOriginal: false }
    )
    .then(result => {
      console.log("-------findOneAndUpdate- increment age :result-------");
      console.log(result);
      console.log("-------done-------");
    });
  /*
  db
    .collection("Todos")
    // .find({ completed: false })
    .find({ _id: new ObjectID("5a4b30045af1e8805dcd6137") })
    .toArray()
    .then(
      docs => {
        console.log("docs.......");
        console.log("Todos", JSON.stringify(docs, undefined, 2));
        console.log("---------docs----------");
      },
      err => {
        console.log("Error occured while accessing Todos");
      }
    ); // returns a cursor, we can convert it to array by calling toArray on it
*/
  /*  check the documentation the find has option to return promise on  cursor or a call back*/
  //db.close();
  /*
  db
    .collection("Todos")
    // .find({ completed: false })
    .find()
    .count()
    .then(
      count => {
        console.log(`Todos count:${count}`);
      },
      err => {
        console.log("Error occured while accessing Todos");
      }
    ); // returns a cursor, we can convert it to array by calling toArray on it
    Mahesh BabuMahesh Babu

  console.log("---------- Before Users Query-------------");
  db
    .collection("Users")
    .find({ name: "Mahesh Babu" })
    .toArray()
    .then(
      docs => {
        console.log("----------printing docs-------------");
        console.log(JSON.stringify(docs, undefined, 2));
        console.log("----------printed docs-------------");
      },
      err => {
        console.log("Error occured while accessing Todos");
      }
    );
  db.close();
  // object id is a 12 byte value ,
  // which has 4byte timestamp
  // 3  byte machine identifier
  //2 bytes process id
  //3 bytes counter
  //rest random value
  */
});
