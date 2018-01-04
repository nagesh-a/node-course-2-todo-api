var express = require("express");
var bodyParser = require("body-parser");

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

var app = express();
app.use(bodyParser.json());

//When you are creating json resource use Post

app.post("/todos", (req, res) => {
  var todo = new Todo({ text: req.body.text });

  todo.save().then(
    document => {
      res.send(document);
    },
    error => {
      res.status(400).send(error);
      console.log("error...:", error);
    }
  );
  console.log("req.body.......", req.body);
});

app.listen(3000, () => {
  console.log("Started on Port 3000....");
});
/*

*/
/*

--NODEJS MODULE body parser sends JSON OBJECT to the server
--server takes json to something with it , takes string body , turns it into javascript object

--@
var newTodo = new Todo({ text: "Cook dinner" });

newTodo.save().then(
  doc => {
    console.log("Saved todo", doc);
  },
  error => {
    console.log("Unable to save todo");
  }
);

// type cast exists in mongoose

var userDocument = new User({ email: "   nagesh.andral@gmail.com    " });
userDocument.save().then(
  doc => {
    console.log("Saved second record App", JSON.stringify(doc, undefined, 2));
  },
  error => {
    console.log("Unable to save data", error);
  }
);

*/
