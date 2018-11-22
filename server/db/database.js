import { Pool } from 'pg';

class Database {
  constructor() {
    this.pool = new Pool();
    this.connect = async () => this.pool.connect();
    this.execute(this.createUserTable);
    this.execute(this.createParcelTable);
  }
   createUserTable =
    `
    CREATE TABLE IF NOT EXISTS user_table (
      id UUID PRIMARY KEY,
      first_name VARCHAR(20),
      last_name VARCHAR(20),
      email VARCHAR(20),
      password VARCHAR(20),
      username VARCHAR(20),
      isloggedin BOOLEAN,
      created_date DATE
    )`;

  createParcelTable =
    `
    CREATE TABLE IF NOT EXISTS parcel_table (
      id UUID PRIMARY KEY,
      origin VARCHAR(20),
      destination VARCHAR(20),
      owner_id UUID REFERENCES user_table (id) ON DELETE CASCADE,
      created_date DATE, 
      price INT,
      present_location VARCHAR(20),
      weight INT
    )`;
  async execute(sql, data = []) {
    const connection = await this.connect();

    try {
      return await connection.query(sql, data);
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new Database();
