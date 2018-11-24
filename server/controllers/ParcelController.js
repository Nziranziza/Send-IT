import uuid from 'uuid';
import Database from '../db/database';

const Parcel = {

  create(req, res) {
    if (!req.body.from || !req.body.destination || !req.body.weight) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const { from, destination, weight } = req.body;

    const createParcel = `INSERT INTO parcel_table
                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                          RETURNING id`;
    const newParcel = [
      uuid.v4(),
      from,
      destination,
      '981bd9ae-e716-4c9a-af90-602f8c19d861',
      new Date(),
      weight * 450,
      from,
      weight
    ];
    Database.execute(createParcel, newParcel);
    return res.status(201).send(newParcel);
  },
};
export default Parcel;
