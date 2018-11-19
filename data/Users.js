import moment from 'moment';
import uuid from 'uuid';

const Users = [
  {
    id: 'dc20098c-a5a2-4694-8379-62d41ca03341',
    firstname: 'Daniel',
    lastname: 'Nziranziza',
    email: 'nziranzizadaniel@gmail.com',
    confemail: 'nziranzizadaniel@gmail.com',
    createdDate: moment.now(),
    password: '123456789',
    username: 'Daniel',
    isloggedin: false
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
    isloggedin: false
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
    isloggedin: false
  }
];

export default Users;
