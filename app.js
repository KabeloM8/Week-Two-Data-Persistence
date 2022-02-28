const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();

var students;
var studentsAvg = [];
var SUBJECTS_NUM = 4;

const con = mysql.createConnection({
  host: "localhost",
  user: "Kabelo",
  password: "BallIsLife23%",
  database: "college"
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

con.connect((err) => {
  if (err) {
    throw err.message;
  } else {
    console.log("MySQL Connected!");
    con.query("SELECT * FROM student", function (err, result, fields) {
      if (err) {
        throw err.message;
      } else {
        // console.log(result);
        students = result;

        for(i = 0; i < students.length; i++){
          //Set students average
          let avg = Math.round(((parseInt(students[i].algebra) + parseInt(students[i].calculus)
          + parseInt(students[i].databases) + parseInt(students[i].programming))/SUBJECTS_NUM)*10)/10;

          // Get grade
          let grade;
          if (80 <= avg && avg < 100){
            grade = 'A';
          }
          else if (70 <= avg && avg < 80){
            grade = 'B';
          }
          else if (60 <= avg && avg < 70){
            grade = 'C';
          }
          else if (50 <= avg && avg < 60){
            grade = 'D';
          }
          else if (40 <= avg && avg < 50){
            grade = 'E';
          }
          else if (0 <= avg && avg < 40){
            grade = 'F';
          }
          else{
            grade = 'Unknown'
          }
          
          // Set students average csv data
          // console.log(students[i]);
          studentsAvg[i] = {
            firstname: students[i].firstname,
            surname: students[i].surname,
            average: avg,
            grade: grade
          }
        }
        // console.log(students.length);
        // console.log(studentsAvg);
      }
    });
  }
});

app.get("/", (req, res) => {
  // res.send("<h1>Home Page</h1>");
  // res.render("index", { studentMarks: students, studentsAverage: studentsAvg, listExists: true});
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(8080, () => {
  console.log("Server started on Port 8080");
})

app.get('/saveCsvFile', (req, res) => {
  res.send(studentsAvg);
});

app.get('/readFile', (req, res) => {
  res.send({students, studentsAvg});
});