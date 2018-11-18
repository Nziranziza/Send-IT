import moment from 'moment';
import uuid from 'uuid';
import Users from '../data/Users';

const User = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  create(req, res) {
    const { firstname, lastname, email, password, username } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const newUser = {
      id: uuid.v4(),
      firstname,
      lastname,
      email,
      createdDate: moment.now(),
      password,
      username: username || firstname + lastname,
      isloggedin: true
    };
    Users.push(newUser);
    return res.status(201).send(newUser);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} users array
   */
  getAll(req, res) {
    const users = Users;
    return res.status(200).send(users);
  },
};
export default User;
