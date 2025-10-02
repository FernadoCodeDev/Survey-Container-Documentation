const express = require("express");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/../../../.env" });

const app = express();

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: process.env.DB_CHARSET,
};

app.get("/getResponse", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.query(`
      SELECT 
        r.id,
        r.surveyId,
        r.questionId,
        q.content AS questionText,
        r.answer
      FROM Response r
      JOIN Question q ON r.questionId = q.id
    `);

    const responses = rows.map((row) => ({
      id: row.id,
      surveyId: row.surveyId,
      questionId: row.questionId,
      questionText: row.questionText,
      answer: row.answer,
    }));

    res.json(responses);

    await connection.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error de base de datos: " + err.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});