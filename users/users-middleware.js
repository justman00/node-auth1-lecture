function restrict() {
  // This middleware function should restrict routes to authorized users only.
  // It should get the username and password from the request headers.
  return async (req, res, next) => {
    try {
      if (!req.session && !req.session.user) {
        return res.status(401).json({
          message: 'Invalid credentials',
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  restrict,
};
