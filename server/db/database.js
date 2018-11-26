import { Pool } from 'pg';

class Database {
  constructor() {
    this.pool = new Pool();
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
      isloggedin BOOLEAN,
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
  async execute(sql, data = []) {
    const connection = await this.connect();

    try {
      if (data.length) return await connection.query(sql, data);
      return await connection.query(sql);
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }
  async initialize() {
    await this.execute(this.createUserTable);
    this.execute(this.createParcelTable);
  }
}

export default new Database();
