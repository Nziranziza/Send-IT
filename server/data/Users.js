import moment from 'moment';
import uuid from 'uuid';

const Users = [
  {
    id: 'dc20098c-a5a2-4694-8379-62d41ca03341',
    firstName: 'Daniel',
    lastName: 'Nziranziza',
    email: 'nziranzizadaniel@gmail.com',
    createdDate: moment.now(),
    password: '123456789',
    userName: 'Daniel',
    isloggedin: false
  },
  {
    id: uuid.v4(),
    firstName: 'Jennah',
    lastName: 'Haque',
    email: 'jhaque@gmail.com',
    createdDate: moment.now(),
    password: '123456789',
    userName: 'Jennah',
    isloggedin: false
  },
  {
    id: uuid.v4(),
    firstName: 'Mucyo',
    lastName: 'Elie',
    email: 'mucyoelie@gmail.com',
    createdDate: moment.now(),
    password: '123456789',
    userName: 'Mucyo',
    isloggedin: false
  }
];

export default Users;
