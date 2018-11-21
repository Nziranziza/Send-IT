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
    const { firstName, lastName, email, password, userName } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const newUser = {
      id: uuid.v4(),
      firstName,
      lastName,
      email,
      createdDate: moment.now(),
      password,
      userName: userName || `${firstName}${lastName}`,
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
    return res.status(200).send(Users);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  getOne(req, res) {
    const targetUser = Users.find(user => req.params.id === user.id);
    if (!targetUser) {
      return res.status(404).send({ message: 'user not found' });
    }
    return res.status(200).send(targetUser);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  signin(req, res) {
    const { email, password } = req.body;
    const targetUser = Users.find(user => user.email === email && user.password === password);
    if (!targetUser) {
      return res.status(404).send({ message: 'user not found' });
    }
    const index = Users.indexOf(targetUser);
    Users[index].isloggedin = true;
    const activeUser = Users[index];
    return res.status(200).send(activeUser);
  },
  /**
   *
   * @param {void}
   * @returns {object} user object
   *
   */
  signout(req, res) {
    const activeUser = Users.find(user => user.isloggedin === true);
    if (!activeUser) {
      return res.status(404).send({ message: ' u are not logged in' });
    }
    const index = Users.indexOf(activeUser);
    Users[index].isloggedin = false;
    const passiveUser = Users[index];
    return res.status(200).send(passiveUser);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} updated user
   */
  update(req, res) {
    const { firstName, lastName, email } = req.body;
    const targetUser = Users.find(user => req.params.id === user.id);
    if (!targetUser) {
      return res.status(404).send({ message: 'user not found' });
    }
    const index = Users.indexOf(targetUser);
    Users[index].firstName = firstName || targetUser.firstName;
    Users[index].lastName = lastName || targetUser.lastName;
    Users[index].email = email || targetUser.email;
    const updatedUser = Users[index];
    return res.status(200).send(updatedUser);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  deleteUser(req, res) {
    const targetUser = Users.find(user => req.params.id === user.id);
    if (!targetUser) {
      return res.status(404).send({ message: 'user not found' });
    }
    const index = Users.indexOf(targetUser);
    Users.splice(index, 1);
    return res.status(201).send({ message: 'user was deleted successfully!!!' });
  }
};
export default User;