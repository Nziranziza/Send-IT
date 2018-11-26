import uuid from 'uuid';
import Database from '../db/database';

const Parcel = {

  async create(req, res) {
    const { from, destination, weight } = req.body;
    if (!from || !destination || !weight) {
      return res.status(400).send({ message: 'All fields are required' });
    }
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
  },
  async changePresentLocation(req, res) {
    const changePresentLocation = 'UPDATE parcel_table SET present_location = $1 WHERE id = $2 RETURNING *';
    const id = req.params.id;
    const newLocation = req.body.location;
    const { rows } = await Database.execute(changePresentLocation, [newLocation, id]);
    if (rows[0]) return res.status(201).send(rows[0]);
    return res.status(404).send({ message: 'parcel not found' });
  },
  async changeDestination(req, res) {
    const changeDestination = 'UPDATE parcel_table SET destination = $1 WHERE id = $2 RETURNING *';
    const id = req.params.id;
    const destination = req.body.destination;
    const { rows } = await Database.execute(changeDestination, [destination, id]);
    if (rows[0]) return res.status(201).send(rows[0]);
    return res.status(404).send({ message: 'parcel not found' });
  },
  async changeStatus(req, res) {
    const changeStatus = 'UPDATE parcel_table SET status = $1 WHERE id = $2 RETURNING *';
    const id = req.params.id;
    const status = req.body.status;
    const { rows } = await Database.execute(changeStatus, [status, id]);
    if (rows[0]) return res.status(201).send(rows[0]);
    return res.status(404).send({ message: 'parcel not found' });
  }
};
export default Parcel;
