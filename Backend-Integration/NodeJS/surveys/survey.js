const express = require("express");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/../../../.env" });

const app = express();

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: process.env.DB_CHARSET,
};

// Route
app.get("/survey", async (req, res) => {
  const surveyId = req.query.id || null;

  if (!surveyId) {
    return res.status(400).json({ error: 'Falta el parámetro "id".' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [surveyRows] = await connection.execute(
      "SELECT id, qualification FROM survey WHERE id = ?",
      [surveyId]
    );

    if (surveyRows.length === 0) {
      await connection.end();
      return res.status(404).json({ error: "Encuesta no encontrada." });
    }

    const survey = surveyRows[0];

    // Get the questions
    const [questions] = await connection.execute(
      "SELECT id, text FROM question WHERE surveyId = ?",
      [surveyId]
    );

    survey.questions = questions;

    res.json(survey);

    await connection.end();
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error del servidor", details: err.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});