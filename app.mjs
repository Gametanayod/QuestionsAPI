import express from "express";
import connectionPool from "./utils/db.mjs";

const app = express();
const port = 8888;

app.use(express.json());

app.get("/test", (req, res) => {
  return res.json("Server API is working");
});

app.get("/questions", async (req, res) => {
  const title = req.query.title;
  const category = req.query.category;
  let result;
  try {
    result = await connectionPool.query(
      `select * from questions where (title = $1 or $1 is null or $1 = '') and (category = $2 or $2 is null or $2 = '')`,
      [title, category]
    );
  } catch (error) {
    return res.status(400).json({
      message: "Missing or invalid request data",
    });
  }

  let questionsWithQurryParameter = result.rowCount;
  if (questionsWithQurryParameter === 0) {
    return res.status(404).json({
      message: "Can not find questions with qurryparameter",
    });
  }

  return res.status(201).json({
    message: "Successfully retrieved the list of questions",
    data: result.rows,
  });
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
