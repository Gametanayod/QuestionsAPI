import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const answersRouter = Router();

answersRouter.post("/:id/upvote", async (req, res) => {
  const answersId = req.params.id;
  const upvoteDate = {
    created_at: new Date(),
    updated_at: new Date(),
  };
  let result;
  try {
    await connectionPool.query(
      `insert into answer_votes (answer_id,vote,created_at,updated_at) values ($1,$2,$3,$4) `,
      [answersId, 1, upvoteDate.created_at, upvoteDate.updated_at]
    );
    result = await connectionPool.query(
      `select * from answer_votes where answer_id = $1`,
      [answersId]
    );
  } catch (error) {
    return res.status(404).json({
      message: "answer not found",
    });
  }
  const lastIndex = result.rows.length - 1;

  return res.status(200).json({
    message: "Successfully upvoted the answer",
    data: result.rows[lastIndex],
  });
});

answersRouter.post("/:id/downvote", async (req, res) => {
  const answersId = req.params.id;
  const downvoteDate = {
    created_at: new Date(),
    updated_at: new Date(),
  };
  let result;
  try {
    await connectionPool.query(
      `insert into answer_votes (answer_id,vote,created_at,updated_at) values ($1,$2,$3,$4) `,
      [answersId, -1, downvoteDate.created_at, downvoteDate.updated_at]
    );
    result = await connectionPool.query(
      `select * from answer_votes where answer_id = $1`,
      [answersId]
    );
  } catch (error) {
    return res.status(404).json({
      message: "answer not found",
    });
  }
  const lastIndex = result.rows.length - 1;

  return res.status(200).json({
    message: "Successfully downvoted the answer",
    data: result.rows[lastIndex],
  });
});

export default answersRouter;
