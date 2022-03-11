const jwt =require('jsonwebtoken')
require('dotenv').config()
const verifyToken = (req, res, next) => {
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
const verifyTokenAndAuthorization = (req, res, next) => {
    try {
      const { id } = req.params;
      verifyToken(req, res, () => {
        if (req.userId === Number(id) || req.userIsAdmin) {
          return next();
        }
        return res.status(403).json({
          errors: ['You are not alowed to do that!'],
        });
      });
    } catch (e) {
      console.log(e)
    }
}
module.exports = {verifyToken, verifyTokenAndAuthorization}