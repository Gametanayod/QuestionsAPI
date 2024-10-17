export const validateCreateQuestion = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "Missing or invalid request title",
    });
  }
  if (!req.body.description) {
    return res.status(400).json({
      message: "Missing or invalid request description",
    });
  }
  if (!req.body.category) {
    return res.status(400).json({
      message: "Missing or invalid request category",
    });
  }
  let objectLength = Object.keys(req.body).length;
  if (objectLength > 3) {
    return res.status(400).json({
      message: "invalid request data",
    });
  }
  next();
};

export const validateCreateAnswerQuerstionById = (req, res, next) => {
  if (!req.body.content) {
    return res.status(400).json({
      message: "Missing or invalid request content",
    });
  }
  let objectLength = Object.keys(req.body).length;
  if (objectLength > 1) {
    return res.status(400).json({
      message: "invalid request data",
    });
  }
  let length = req.body.content.length;
  if (length > 300) {
    return res.status(400).json({
      message: "anwsers content exceed 300 characters",
    });
  }
  next();
};

export const validateUpdateQuerstionById = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "Missing or invalid request title",
    });
  }
  if (!req.body.description) {
    return res.status(400).json({
      message: "Missing or invalid request description",
    });
  }
  if (!req.body.category) {
    return res.status(400).json({
      message: "Missing or invalid request category",
    });
  }

  let objectLength = Object.keys(req.body).length;
  if (objectLength > 3) {
    return res.status(400).json({
      message: "invalid request data",
    });
  }

  next();
};
