import uuid from 'uuid';
import Database from '../db/database';

const Parcel = {

  async create(req, res) {
    if (!req.body.from || !req.body.destination || !req.body.weight) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const { from, destination, weight } = req.body;

    const createParcel = `INSERT INTO parcel_table
                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                          RETURNING *`;
    const newParcel = [
      uuid.v4(),
      from,
      destination,
      '981bd9ae-e716-4c9a-af90-602f8c19d861',
      new Date(),
      weight * 450,
      from,
      weight,
      'pending'
    ];
    const { rows } = await Database.execute(createParcel, newParcel);
    return res.status(201).send(rows[0]);
  },
  async getAll(req, res) {
    const selectAllParcels = 'SELECT * FROM parcel_table';
    const { rows } = await Database.execute(selectAllParcels);
    return res.status(200).send(rows);
  },
  async getOne(req, res) {
    const selectOneParcel = 'SELECT * FROM parcel_table WHERE id = $1';
    const id = req.params.id;
    const { rows } = await Database.execute(selectOneParcel, [id]);
    if (rows.length) return res.status(200).send(rows[0]);
    return res.status(404).send({ message: 'parcel not found' });
  }
};
export default Parcel;
