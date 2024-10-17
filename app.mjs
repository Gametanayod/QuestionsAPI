import express from "express";
import questionsRouter from "./routes/questions.mjs";
import answersRouter from "./routes/answers.mjs";

const app = express();
const port = 8888;

app.use(express.json());
app.use("/questions", questionsRouter);
app.use("/answers", answersRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working");
});

app.get("/", (req, res) => {
  res.send("welcome to QuestionsAPI");
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
