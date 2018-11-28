import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Database from '../db/database';

const Helper = {
  hashThePassword(password) {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
  },
  checkThepassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  getToken(id, role) {
    const token = jwt.sign({ id, role }, process.env.SECRETKEY);
    return token;
  },
  async verifyToken(req, res, next) {
    const token = req.headers['authorization-token'];
    if (!token) {
      return res.status(403).send({ message: 'Not authorized!' });
    }
    try {
      const { id, role } = await jwt.verify(token, process.env.SECRETKEY);
      const getUser = 'SELECT * FROM user_table WHERE id = $1';
      const { rows } = await Database.execute(getUser, [id]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'Invalid Token' });
      }
      req.body.userId = id;
      req.body.role = role;
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};
export default Helper;
