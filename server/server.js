require("./config/config.js")


const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { ObjectID } = require("mongodb");

const { Todo } = require("./models/todo");
const { User } = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

//When you are creating json resource use Post

app.post("/todos", (req, res) => {
  var todo = new Todo({ text: req.body.text });
  console.log("todo-------", todo);
  todo.save().then(
    document => {
      res.send(document);
    },
    error => {
      res.status(400).send(error);
      // console.log("error...:", error);
    }
  );
  console.log("req.body.......", req.body);
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    error => {
      res.status(400).send(error);
    }
  );
});

app.get("/todos/:id", (req, res) => {
  let id = req.params.id;
  console.log(`----req.params---${id}-----------`);
  if (!ObjectID.isValid(id)) {
    console.log("ObjectID is Invalid");
    //  res.send({});
    return res.status(404).send({});
  } else if (ObjectID.isValid(id)) {
    Todo.findById(id)
      .then(todo => {
        console.log("todo..", todo);
        if (!todo) {
          console.log("id not found");

          return res.status(404).send({ text: "ID not found" });
        } else {
          console.log(".....findById  user......", JSON.stringify(todo, undefined, 2));
          return res.status(200).send({ todo });
        }
      })
      .catch(e => {
        console.log("error:", res.status(400).send(e));
      });
  }
});

app.delete("/todos/:id", (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    console.log("ObjectID is Invalid");
    return res.status(404).send({});
  } else if (ObjectID.isValid(id)) {
    Todo.findByIdAndRemove(id)
      .then(todo => {
        if (!todo) {
          console.log("did not return anything");
          return res.status(404).send({ text: "ID NOT FOUND" });
        }
        res.status(200).send({ todo });
      })
      .catch(e => {
        console.log("error on DELETE method :", res.status(400, send(e)));
      });
  }

  //get the id
  // validate the id , not valid? return 404
  // remove to do by id
  //success
  // if no doc, send 404
  // if doc, send th doc back with 200
  // error with empty body
});

app.patch("/todos/:id", (req, res) => {
  let id = req.params.id;
  // updates are stored in body
  console.log("........id.....", id);
  let body = _.pick(req.body, ["text", "completed"]);
  console.log("body after pick.......", body);

  if (!ObjectID.isValid(id)) {
    console.log("ObjectID is Invalid");
    return res.status(404).send({});
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        console.log("todo not found.......", todo);

        return res.status(404).send({});
      }

      res.status(200).send({ todo });
    })
    .catch(error => {
      console.log("error occured:", error);
      res.status(400).send(error);
    });
});

app.listen(port, () => {
  console.log(`Server is listening at PORT :${port}`);
});
/*
app.get("/todos/:id", (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    console.log("ObjectID is Invalid");
    //  res.send({});
    return res.status(404).send({});
  } else if (ObjectID.isValid(id)) {
    // validate id send 404, empty body
    // query db, findById
    // success
    // if todo send it back, if no todo send 404 with empty body
    // error- send empty body back

    //res.send(req.params);

    User.findById(id)
      .then(user => {
        if (!user) {
          //return console.log("id not found");
          return res.status(404).send({ text: "ID not found" });
        } else {
          console.log(".....findById  user......", JSON.stringify(user, undefined, 2));
          return res.status(200).send({ user });
        }
      })
      .catch(e => {
        console.log("error:", res.status(400).send(e));
      });
  }
});
*/

module.exports = { app };

/*

// command for seting up test dependencies
//npm i expect@1.20.2 mocha@3.0.2 nodemon@1.10.2 supertest@2.0.0 --save-dev
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
