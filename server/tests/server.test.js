const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");

// run before everuy test case
beforeEach(done => {
  Todo.remove({}).then(() => done());
});

describe("Test Post request for Todo App", () => {
  it("should create new todo", done => {
    var text = "Working on 99.99 minute timee block";
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
            expect(todos.length).toBe(1);
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
      .expect(400).end((err,resp)=>{
        if(err){
          return done(err);
        }
        Todo.find().then(todos=>{
          expect(todos.length).toBe(0);
          done();
        }).catch(e=>done(e));
      })
  });
});
