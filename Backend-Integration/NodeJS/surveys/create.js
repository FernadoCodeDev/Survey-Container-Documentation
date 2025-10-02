// Creating surveys

/*
template for testing the API

{
  "qualification": "survey name",
  "questions": [
    { "text": "ask" },
    { "text": "ask" }
  ]
}

*/

const express = require("express");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config({ path: __dirname + "/../../../.env" });

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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
app.post("/create", async (req, res) => {
  const input = req.body;

  if (!input || !input.qualification || !input.questions) {
    return res
      .status(400)
      .json({
        error:
          'Datos inválidos. Se requiere "qualification" y "questions".',
      });
  }

  const connection = await mysql.createConnection(dbConfig);

  try {
    await connection.beginTransaction();

    // Id
    const surveyId = crypto.randomUUID();

    await connection.execute(
      "INSERT INTO survey (id, qualification) VALUES (?, ?)",
      [surveyId, input.qualification]
    );


    const insertQuestion =
      "INSERT INTO question (id, surveyId, text) VALUES (?, ?, ?)";

    for (const question of input.questions) {
      if (!question.text) continue;

      const questionId = crypto.randomUUID();
      await connection.execute(insertQuestion, [
        questionId,
        surveyId,
        question.text,
      ]);
    }

    await connection.commit();

    res.json({
      message: "Encuesta creada exitosamente",
      survey_id: surveyId,
    });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({
      error: "Error al crear la encuesta",
      details: err.message,
    });
  } finally {
    await connection.end();
  }
});

app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});