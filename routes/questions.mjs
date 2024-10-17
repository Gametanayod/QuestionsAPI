import { Router } from "express";
import {
  validateCreateQuestion,
  validateCreateAnswerQuerstionById,
  validateUpdateQuerstionById,
} from "../middlewares/questions.validation.mjs";
import connectionPool from "../utils/db.mjs";

const questionsRouter = Router();

questionsRouter.post("/", [validateCreateQuestion], async (req, res) => {
  const newQuestions = {
    ...req.body,
    created_at: new Date(),
    updated_at: new Date(),
  };

  try {
    await connectionPool.query(
      `insert into questions (title,description,category,created_at,updated_at) values ($1,$2,$3,$4,$5)`,
      [
        newQuestions.title,
        newQuestions.description,
        newQuestions.category,
        newQuestions.created_at,
        newQuestions.updated_at,
      ]
    );
  } catch (error) {
    return res.status(400).json({
      message: "Missing or invalid request data",
    });
  }

  return res.status(201).json({
    message: "Question created successfully",
    data: newQuestions,
  });
});

questionsRouter.post(
  "/:id/answers",
  [validateCreateAnswerQuerstionById],
  async (req, res) => {
    const questionId = req.params.id;
    const newAnswer = {
      ...req.body,
      created_at: new Date(),
      updated_at: new Date(),
    };

    try {
      await connectionPool.query(
        `insert into answers (question_id,content,created_at,updated_at) values ($1,$2,$3,$4)`,
        [
          questionId,
          newAnswer.content,
          newAnswer.created_at,
          newAnswer.updated_at,
        ]
      );
    } catch (error) {
      return res.status(400).json({
        message: "Missing or invalid request data",
      });
    }

    return res.status(201).json({
      message: "Answer created successfully",
      data: newAnswer,
    });
  }
);

questionsRouter.post("/:id/upvote", async (req, res) => {
  const questionId = req.params.id;
  const upvoteDate = {
    created_at: new Date(),
    updated_at: new Date(),
  };
  let result;
  try {
    await connectionPool.query(
      `insert into question_votes (question_id,vote,created_at,updated_at) values ($1,$2,$3,$4) `,
      [questionId, 1, upvoteDate.created_at, upvoteDate.updated_at]
    );
    result = await connectionPool.query(
      `select * from question_votes where question_id = $1`,
      [questionId]
    );
  } catch (error) {
    return res.status(404).json({
      message: "Question not found",
    });
  }
  const lastIndex = result.rows.length - 1;

  return res.status(200).json({
    message: "Successfully upvoted the question",
    data: result.rows[lastIndex],
  });
});

questionsRouter.post("/:id/downvote", async (req, res) => {
  const questionId = req.params.id;
  const downvoteDate = {
    created_at: new Date(),
    updated_at: new Date(),
  };
  let result;
  try {
    await connectionPool.query(
      `insert into question_votes (question_id,vote,created_at,updated_at) values ($1,$2,$3,$4) `,
      [questionId, -1, downvoteDate.created_at, downvoteDate.updated_at]
    );
    result = await connectionPool.query(
      `select * from question_votes where question_id = $1`,
      [questionId]
    );
  } catch (error) {
    return res.status(404).json({
      message: "Question not found",
    });
  }
  const lastIndex = result.rows.length - 1;

  return res.status(200).json({
    message: "Successfully downvoted the question",
    data: result.rows[lastIndex],
  });
});

questionsRouter.get("/", async (req, res) => {
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

questionsRouter.get("/:id", async (req, res) => {
  const questionsId = req.params.id;
  let result;
  try {
    result = await connectionPool.query(
      `select * from questions where id = $1`,
      [questionsId]
    );
  } catch (error) {
    return res.status(400).json({
      message: "Missing or invalid request data",
    });
  }

  if (!result.rows[0]) {
    return res.status(404).json({
      message: "Question not found",
    });
  }

  return res.status(200).json({
    message: "Successfully retrieved the question",
    data: result.rows[0],
  });
});

questionsRouter.get("/:id/answers", async (req, res) => {
  const questionId = req.params.id;
  let questionResult;
  let anwserResult;
  try {
    anwserResult = await connectionPool.query(
      `select * from answers where question_id = $1`,
      [questionId]
    );
    questionResult = await connectionPool.query(
      `select * from questions where id = $1`,
      [questionId]
    );
  } catch (error) {
    return res.status(400).json({
      message: "Missing or invalid request data",
    });
  }

  if (anwserResult.rowCount === 0 && questionResult.rowCount === 1) {
    return res.status(404).json({
      message: "This question does not have any answsers",
    });
  } else if (anwserResult.rowCount === 0 && questionResult.rowCount === 0) {
    return res.status(404).json({
      message: "This question does not exit",
    });
  }

  return res.status(200).json({
    message: "Successfully retrieved the answers",
    data: anwserResult.rows,
  });
});

questionsRouter.put("/:id", [validateUpdateQuerstionById], async (req, res) => {
  const questionsId = req.params.id;
  const updatedQuestions = {
    ...req.body,
    updated_at: new Date(),
  };

  let result;

  try {
    await connectionPool.query(
      `update questions set title = $2,description = $3,category = $4,updated_at = $5 where id = $1 `,
      [
        questionsId,
        updatedQuestions.title,
        updatedQuestions.description,
        updatedQuestions.category,
        updatedQuestions.updated_at,
      ]
    );

    result = await connectionPool.query(
      `select * from questions where id = $1`,
      [questionsId]
    );
  } catch (error) {
    return res.status(400).json({
      message: "Missing or invalid request data",
    });
  }

  if (result.rowCount == 0) {
    return res.status(404).json({
      message: "Question not found",
    });
  }

  return res.status(201).json({
    message: "Successfully updated the question",
    data: result.rows[0],
  });
});

questionsRouter.delete("/:id", async (req, res) => {
  const questionId = req.params.id;
  let result;
  try {
    result = await connectionPool.query(
      `delete from questions where id = $1 `,
      [questionId]
    );
    await connectionPool.query(`delete from answers where question_id = $1`, [
      questionId,
    ]);
  } catch (error) {
    return res.status(400).json({
      message: "Missing or invalid request data",
    });
  }

  if (result.rowCount == 0) {
    return res.status(404).json({
      message: "Question not found",
    });
  }

  return res.status(200).json({
    message: "Question deleted successfully",
  });
});

export default questionsRouter;
