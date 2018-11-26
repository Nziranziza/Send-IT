import uuid from 'uuid';
import Database from '../db/database';
import helper from '../helper/helper';

const User = {
  async create(req, res) {
    const { firstName, lastName, email, password, userName } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const createUser = `INSERT INTO user_table
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                        RETURNING *`;
    const hashPassword = helper.hashThePassword(password);
    const newUser = [
      uuid.v4(),
      firstName,
      lastName,
      email,
      hashPassword,
      userName || `${firstName}${lastName}`,
      true,
      new Date()
    ];
    const { rows } = await Database.execute(createUser, newUser);
    return res.status(201).send(rows[0]);
  },
};
export default User;
