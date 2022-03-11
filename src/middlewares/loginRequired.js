const jwt =require('jsonwebtoken')
require('dotenv').config()
exports.verifyToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        errors: ['Login required'],
      });
    }
    try {
      const [, token] = authorization.split(' ');
      const data = jwt.verify(token, process.env.TOKEN_SECRET);
      const { id, email, is_admin } = data;
      req.userId = id;
      req.userEmail = email;
      req.userIsAdmin = is_admin;
      return next();
    } catch (e) {
      return res.status(403).json('Token is not valid!');
    }
}