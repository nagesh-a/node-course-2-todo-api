const { ObjectID } = require("mongodb");
const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");
//var id = "5a4f25ea2b3224d1fe0e2a4d";
var id = "5a4dddd88d625e63d46c5bc5"; // userId from DB
// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log("find.....Todos......", todos);
// });
// Todo.findOne({ _id: id }).then(todo => {
//   console.log("findOne.....Todos...completed...false....", todo);
// });
// if (!ObjectID.isValid()) {
//   console.log("ObjectID is Invalid");
// }

User.findById(id)
  .then(user => {
    if (!user) {
      return console.log("id not found");
    }
    console.log(".....findById  user......", JSON.stringify(user, undefined, 2));
  })
  .catch(e => {
    console.log("error:", e);
  });

// User.find({ _id: id }).then(users => {
//   console.log("find.... found user", user);
// });
