import { Pool } from 'pg';
import uuid from 'uuid';
import dotenv from 'dotenv';
import helper from '../helper/helper';


dotenv.config();

class Database {
  constructor() {
    this.pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT
    });
    this.connect = async () => this.pool.connect();
    this.initialize();
  }

   createUserTable =
    `
    CREATE TABLE IF NOT EXISTS user_table (
      id UUID PRIMARY KEY,
      first_name VARCHAR(128) NOT NULL,
      last_name VARCHAR(128) NOT NULL,
      email VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      username VARCHAR(128),
      role VARCHAR(20),
      created_date DATE
    )`;

  createParcelTable =
    `
    CREATE TABLE IF NOT EXISTS parcel_table (
      id UUID PRIMARY KEY,
      origin VARCHAR(128) NOT NULL,
      destination VARCHAR(128) NOT NULL,
      owner_id UUID REFERENCES user_table (id) ON DELETE CASCADE,
      created_date DATE, 
      price INT,
      present_location VARCHAR(128),
      weight INT NOT NULL,
      status VARCHAR(128)
    )`;

    createAdminUser =`
      INSERT INTO user_table
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      `;
    /**
     *
     * @param {*} sql query string
     * @param {*} data values
     * @returns rows array
     */
    async execute(sql, data = []) {
      const connection = await this.connect();

      try {
        if (data.length) return await connection.query(sql, data);
        return await connection.query(sql);
      } catch (error) {
        return error;
      } finally {
        connection.release();
      }
    }
    async createAdmin() {
      const { rows } = await this.execute('SELECT * FROM user_table WHERE role = $1', ['Admin']);
      if (!rows[0]) {
        this.execute(this.createAdminUser, [
          uuid.v4(),
          'Admin',
          'Sendit',
          'admin@sendit.com',
          helper.hashThePassword('admin'),
          'Admin',
          'Admin',
          new Date()
        ]);
      }
    }
    async initialize() {
      await this.execute(this.createUserTable);
      await this.execute(this.createParcelTable);
      this.createAdmin();
    }
}

export default new Database();
