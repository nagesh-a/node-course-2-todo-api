const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");

const todos = [{ text: "First test Todo" }, { text: "Second test Todo" }];

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
            expect(todos.length).toBe(3);
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
            expect(todos.length).toBe(2);
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
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});
