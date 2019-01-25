import uuid from 'uuid';
import joi from 'joi';
import Database from '../db/database';
import helper from '../helper/helper';
import schema from '../helper/validation';
import Mailer from '../helper/mailer';

const User = {
  /**
   * create user account
   *
   * @param {*} req user data
   * @param {*} res
   * @returns user object
   */
  async create(req, res) {
    const { error } = joi.validate(req.body, schema.user);
    if (error) {
      if (error.details[0].type === 'any.required') {
        return res.status(400).send({
          message: 'All fields are required'
        });
      } else if (error.details[0].type === 'string.regex.base') {
        return res.status(400).send({
          message: 'The password must contain an uppercase, lowercase, number, special character and at least 8 characters long'
        });
      }
      return res.status(400).send(error.details[0].message);
    }
    const { firstName, lastName, email, password, userName } = req.body;
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
      'user',
      new Date()
    ];
    const token = helper.getToken(newUser[0], newUser[6]);
    try {
      const { rows } = await Database.execute(createUser, newUser);
      return res.status(201).send({ user: rows[0], token });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * login a user account
   *
   * @param {*} req object{ email,password }
   * @param {*} res
   * @retuns user object
   */
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const findUser = 'SELECT * FROM user_table WHERE email = $1';
    const { rows } = await Database.execute(findUser, [email]);
    if (!rows) return res.status(404).send({ message: 'user not found' });
    if (!rows[0]) return res.status(404).send({ message: 'user not found' });
    if (!helper.checkThepassword(rows[0].password, password)) {
      return res.status(400).send({ message: 'The password is incorrect!!!' });
    }
    const token = helper.getToken(rows[0].id, rows[0].role);
    return res.status(200).send({ user: rows[0], token });
  },
  /**
   * Get all user
   *
   * @param {*} req
   * @param {*} res
   * @returns user array
   */
  async getAllUser(req, res) {
    if (req.body.role !== 'Admin') return res.status(403).send({ message: 'Not Authorized' });
    try {
      const getAllUser = 'SELECT * FROM user_table';
      const { rows } = await Database.execute(getAllUser);
      if (!rows[0]) return res.status(404).send('users not found');
      return res.status(200).send(rows);
    } catch (error) {
      return res.status(408).send({ message: 'OOPS!!! Something goes wrong!!!' });
    }
  },
  /**
   * Get one user
   *
   * @param {*} req user id
   * @param {*} res
   * @returns user object
   */
  async getOneUser(req, res) {
    if (req.body.role !== 'Admin') return res.status(403).send({ message: 'Not Authorized' });
    try {
      const getOneUser = 'SELECT * FROM user_table WHERE id = $1';
      const id = req.params.id;
      const { rows } = await Database.execute(getOneUser, [id]);
      if (!rows[0]) return res.status(404).send({ message: 'user not found' });
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(408).send({ message: 'OOPS!!! something goes wrong!!!' });
    }
  },
  /**
   * delete user
   *
   * @param {*} req
   * @param {*} res
   * @returns deleted user object
   */
  async deleteUser(req, res) {
    if (req.body.role !== 'Admin') return res.status(403).send({ message: 'Not authorized!!!' });
    try {
      const deleteUser = 'DELETE FROM user_table WHERE id = $1 RETURNING *';
      const { id } = req.params;
      const { rows } = await Database.execute(deleteUser, [id]);
      if (!rows[0]) return res.status(404).send({ message: 'user not found' });
      return res.status(200).send({ message: 'user was delete successful', deleted: rows[0] });
    } catch (error) {
      return res.status(520).send({ message: 'OOPS!!! something wwent wrong!!!' });
    }
  },
  /**
   *
   * @param {*} req email
   * @param {*} res
   * @returns {*} message object
   */
  async reqReset(req, res) {
    const { email } = req.body;
    try {
      const message = `
      <div>
       <p>You requested for a password reset, kindly use this</p>
       <div style="
       display:flex;
       flex-direction:column;
       width:100px;
       ">
       <a href='#' 
       style="background-color: green;
        color:white; border-radius:25px;
        padding:10px;
        font-size:20px;
        text-decoration:none;
        text-align:center;
        width:100%;
        ">Reset</a>
       </div>
       <div>
      `;
      const subject = 'Password Reset!!!!';
      Mailer.sendMail(email, '', subject, '', message);
      return res.status(200).send({ message: 'Your email reset was received. To proceed check your email' });
    } catch (error) {
      return res.status(400).send({ message: 'OOPS something has gone wrong!!!', error });
    }
  }
};
export default User;
