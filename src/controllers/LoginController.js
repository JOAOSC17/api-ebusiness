const User = require('../models/User')
const jwt =require('jsonwebtoken')
const bcryptjs =require('bcryptjs')
require('dotenv').config()
const LoginController = async (req, res) => {
  try {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }
     User.findOneEmail(
        email, async (err, user) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).json({
              message: `Not found User with email ${email}.`
            });
          } else {
            res.status(500).json({
              message: "Error retrieving User with email " + email
            });
          }
        } 
        if (!user) {
          return res.status(401).json({
            errors: ['Usuário não existe'],
          });
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password_hash);
        if (!isPasswordCorrect) {
          return res.status(401).json({
            errors: ['Senha inválida'],
          });
        }
    
        const { id, is_admin } = user;
        const token = jwt.sign({ id, email, is_admin }, process.env.TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRATION,
        });
    
        return res.json({ token });
    });
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};
module.exports = LoginController;