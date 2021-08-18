const defaultErrorHandler = (err, req, res, next) => {
  console.log({ errorStack: err.stack });
  return res.status(500).json({ message: err.stack });
};

module.exports = defaultErrorHandler;
