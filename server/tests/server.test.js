const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");

const todos = [
  {
    _id: new ObjectID(),
    text: "First test Todo"
  },
  {
    _id: new ObjectID(),
    text: "Second test Todo"
  },
  {
    id: new ObjectID(),
    text: "Dont Give in at the morning"
  },
  {
    id: new ObjectID(),
    text: "Face Your Fears,Be aware there will be resistance from Mr X"
  }
];

// run before everuy test case
beforeEach(done => {
  //Todo.remove({}).then(() => done());
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("Test Post request for Todo App", () => {
  it("should create new todo", done => {
    var text = "First test Todo";
    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(resp => {
        expect(resp.body.text).toBe(text);
      })
      .end((err, resp) => {
        if (err) {
          return done(err);
        }
        // verify models
        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(5);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should not create todo if invalid body data", done => {
    var text = "";
    request(app)
      .post("/todos")
      .send({ text })
      .expect(400)
      .end((err, resp) => {
        if (err) {
          return done(err);
        }
        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(4);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe("GET /todos", () => {
  it("should get all Todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        console.log("res.body.todos....", res.body.todos);
        expect(res.body.todos.length).toBe(4);
      })
      .end(done);
  });
});
//5a502acb6a281905e41ec20a
//5a502acb6a281905e41ec20a
describe("GET /todos/:id", () => {
  it("should return to do doc", done => {
    // request(app)
    // .get(`/todos/${todos[0]._id.toHexString()`)
    // .expect(200);
    console.log(`----${todos[0]._id.toHexString()}-----------`);
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        console.log("--------", res.body.todo.text);
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it("should return 404 if to do not found", done => {
    console.log();
    let newId = new ObjectID();
    request(app)
      .get(`/todos/${newId.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 : for non object id s ", done => {
    console.log();
    request(app)
      .get(`/todos/12345678`)
      .expect(404)
      .end(done);
  });
});

describe("DELETE /todos/:id", () => {
  it("should a remove a todo ", done => {
    let hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(resp => {
        expect(resp.body.todo._id).toBe(hexId);
      })
      .end((error, resp) => {
        return done(error);

        Todo.findByid(hexId)
          .then(todo => {
            expect(null).toNotExist();
            done();
          })
          .catch(error => {
            done(e);
          });
      });
  });

  it("should return 404 if todo not found", done => {
    let newId = new ObjectID();
    request(app)
      .delete(`/todos/${newId.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 for invalid ID", done => {
    request(app)
      .delete(`/todos/12345678`)
      .expect(404)
      .end(done);
  });
});
