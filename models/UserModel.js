import moment from 'moment';
import uuid from 'uuid';

class User {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.users = [
      {
        id: uuid.v4(),
        firstname: 'Daniel',
        lastname: 'Nziranziza',
        email: 'nziranzizadaniel@gmail.com',
        confemail: 'nziranzizadaniel@gmail.com',
        createdDate: moment.now(),
        password: '123456789',
        username: 'Daniel',
        isloggedin: true
      },
      {
        id: uuid.v4(),
        firstname: 'Jennah',
        lastname: 'Haque',
        email: 'jhaque@gmail.com',
        confemail: 'jhaque@gmail.com',
        createdDate: moment.now(),
        password: '123456789',
        username: 'Jennah',
        isloggedin: true
      },
      {
        id: uuid.v4(),
        firstname: 'Mucyo',
        lastname: 'Elie',
        email: 'mucyoelie@gmail.com',
        confemail: 'mucyoelie@gmail.com',
        createdDate: moment.now(),
        password: '123456789',
        username: 'Mucyo',
        isloggedin: true
      }
    ];
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
   * @param {object} credentials object
   * @returns {object} user object
   */
  findUser(data) {
    return this.users.find(
      user => user.email === data.email && user.password === data.password
    );
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
    const index = this.users.indexOf(data);
    this.users[index].isloggedin = true;
    return this.users[index];
  }

  /**
   *
   * @param {void}
   * @returns {object} user object
   */
  logout(data) {
    const index = this.users.indexOf(data);
    this.users[index].isloggedin = false;
    return this.users[index];
  }
  /**
   *
   * @param {void}
   * @returns {boolean}
   */
  isloggedin() {
    return this.users.find(user => user.isloggedin === true);
  }
}
export default new User();
