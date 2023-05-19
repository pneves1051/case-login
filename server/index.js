const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cadastro",
});

app.use(cors());
app.use(express.json());

app.post("/signup", (req, res)=> {
  const { email } = req.body;
  const { password } = req.body;

  let SQL = "INSERT INTO user ( email, password ) VALUES ( ?,? )";

  db.query(SQL, [email, password], (err, result) => {
    console.log(err);
  });

});


app.listen(3001, () => {
    console.log("rodando servidor");
  }
);
