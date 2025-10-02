
const express = require("express");
const mysql = require("mysql2/promise"); // (async/await)
const dotenv = require("dotenv");

// (.env)
dotenv.config({ path: __dirname + "/../../../.env" });

const app = express();

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// 
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: process.env.DB_CHARSET,
};

// route
app.get("/metrics", async (req, res) => {
  const surveyId = req.query.surveyId || null;

  try {
    const connection = await mysql.createConnection(dbConfig);

    if (surveyId) {
  
      const [questions] = await connection.execute(
        "SELECT id, text FROM question WHERE surveyId = ?",
        [surveyId]
      );

      const metrics = [];

      for (const question of questions) {
        const [responses] = await connection.execute(
          `
          SELECT content, COUNT(*) as count
          FROM response
          WHERE questionId = ?
          GROUP BY content
          `,
          [question.id]
        );

        metrics.push({
          questionId: question.id,
          text: question.text,
          responses: responses,
        });
      }

      res.json(metrics);
    } else {

      const [surveys] = await connection.query(
        "SELECT id, qualification FROM survey"
      );

      const result = [];

      for (const survey of surveys) {
        const [questions] = await connection.execute(
          "SELECT id, text FROM question WHERE surveyId = ?",
          [survey.id]
        );

        result.push({
          id: survey.id,
          qualification: survey.qualification,
          questions: questions,
        });
      }

      res.json(result);
    }

    await connection.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error de base de datos: " + err.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});