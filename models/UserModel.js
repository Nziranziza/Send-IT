import moment from 'moment';
import uuid from 'uuid';

class User {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.users = [];
  }

  /**
   *
   * @returns {object} user object
   */
  create(data) {
    const newUser = {
      id: uuid.v4(),
      firstname: data.firstname || '',
      lastname: data.lastname || '',
      email: data.email || '',
      confemail: data.confemail || '',
      createdDate: moment.now(),
      password: data.password || '',
      username: data.username || data.firstname + data.lastname,
      isloggedin: true
    };
    this.users.push(newUser);
    return newUser;
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} user object
   */
  findOne(id) {
    return this.users.find(user => user.id === id);
  }

  /**
   * @returns {object} returns all users
   */
  findAll() {
    return this.users;
  }

  /**
   *
   * @param {uuid} id
   * @param {object} data
   */
  update(id, data) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users[index].firstname = data.firstname || user.firstname;
    this.users[index].lastname = data.lastname || user.lastname;
    this.users[index].email = data.email || user.email;
    return this.users[index];
  }

  /**
   *
   * @param {uuid} id
   */
  delete(id) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    return {};
  }

  /**
   *
   *  @param {object} data
   *  @returns {object} user object
   */
  login(data) {
    const activeUser = this.users.find(
      user => user.email === data.email && user.password === data.password
    );
    const index = this.users.indexOf(activeUser);
    this.users[index].isloggedin = true;
    return this.users[index];
  }

  /**
   *
   * @param {void}
   * @returns {object} user object
   */
  logout() {
    const activeUser = this.users.find(user => user.isloggedin);
    const index = this.users.indexOf(activeUser);
    this.users[index].isloggedin = false;
    return this.users[index];
  }
}
export default new User();
