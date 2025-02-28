const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/teachers", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const {
  base64decode
} = require('nodejs-base64');


const {
  teacherPatch,
  teacherPost,
  teacherGet,
  teacherDelete
} = require("./controllers/teacherController.js");


// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");

// Middlewares
app.use(cors({
  domains: '*',
  methods: "*"
}));

// Auth basic http
app.use(function (req, res, next) {
  if (req.headers["authorization"]) {
    //Basic VVROOlBhc3N3b3JkMQ==
    const authBase64 = req.headers['authorization'].split(' ');
    const userPass = base64decode(authBase64[1]);
    const user = userPass.split(':')[0];
    const password = userPass.split(':')[1];

    if (user === 'admin' && password == '1234') {
      // saveSession('admin');
      next();
      return;
    }
  }
  res.status(401);
  res.send({
    error: "Unauthorized"
  });
});


// listen to the task request
app.get("/api/teachers", teacherGet);
app.post("/api/teachers", teacherPost);
app.patch("/api/teachers", teacherPatch);
app.put("/api/teachers", teacherPatch);
app.delete("/api/teachers", teacherDelete);

// // course
// app.get("/api/courses", courseGet);
// app.post("/api/courses", coursePost);

app.listen(3001, () => console.log(`Example app listening on port 3001!`))
