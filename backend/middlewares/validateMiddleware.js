function validateMiddleware(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        error: result.error.flatten(),
      });
    }
    next();
  };
}

export default validateMiddleware;
