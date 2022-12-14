const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const db = require("./config/db");
//C O R S     helps in sending crossplatform information lije from frontend to backend
app.use(cors());
app.use(express.json());

const PORT = 3001;
app.listen(process.env.PORT || PORT, () => {
  console.log(`hurray , server running on port ${PORT}`);
});

app.post("/addstudents", (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const location = req.body.location;
    const email = req.body.email;
    const dob = req.body.dob;
    const education = req.body.education;
  
    db.query(
      "INSERT INTO student (firstname,lastname,location,email,dob,education) VALUES (?,?,?,?,?,?)",
      [firstname,lastname,location,email,dob,education],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send({ err: err });
        }
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "already exists" });
        }
      }
    );
  });

  app.get("/students", (req, res) => {
    db.query("SELECT * FROM student", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM student WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM student WHERE id = ?",[id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


  app.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const location = req.body.location;
    const email = req.body.email;
    const dob = req.body.dob;
    const education = req.body.education;
    db.query(
      "UPDATE student SET firstname = ?, lastname = ?, location = ?, email = ?, dob = ?, education = ? WHERE id = ?",
      [firstname,lastname,location,email,dob,education,id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });