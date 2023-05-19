const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cadastro",
});

app.use(cors());
app.use(express.json());

/*
app.post("/signup", (req, res)=> {
  const { email } = req.body;
  const { password } = req.body;

  let SQL = "INSERT INTO data ( email, password ) VALUES ( ?,? )";

  db.query(SQL, [email, password], (err, result) => {
    console.log(err);
  });

});
*/

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.create({
      data: {
          email: email,
          password: password,
      },
  });
  res.json(user);
});


app.listen(3001, () => {
    console.log("rodando servidor");
  }
);
