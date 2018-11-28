import uuid from 'uuid';
import Database from '../db/database';

const Parcel = {
// create a parcel
  async create(req, res) {
    const { from, destination, weight, userId } = req.body;
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
      userId,
      new Date(),
      weight * 450,
      from,
      weight,
      'Pending'
    ];
    const { rows } = await Database.execute(createParcel, newParcel);
    return res.status(201).send(rows[0]);
  },
  // get all parcel
  async getAll(req, res) {
    const selectAllParcels = 'SELECT * FROM parcel_table';
    const { rows } = await Database.execute(selectAllParcels);
    return res.status(200).send(rows);
  },
  // get one parcel by id
  async getOne(req, res) {
    const selectOneParcel = 'SELECT * FROM parcel_table WHERE id = $1';
    const id = req.params.id;
    const { rows } = await Database.execute(selectOneParcel, [id]);
    if (rows.length) return res.status(200).send(rows[0]);
    return res.status(404).send({ message: 'parcel not found' });
  },
  // change the present location of the parcel
  async changePresentLocation(req, res) {
    const changePresentLocation = 'UPDATE parcel_table SET present_location = $1 WHERE id = $2 RETURNING *';
    const id = req.params.id;
    const newLocation = req.body.location;
    const { rows } = await Database.execute(changePresentLocation, [newLocation, id]);
    if (rows[0]) return res.status(201).send(rows[0]);
    return res.status(404).send({ message: 'parcel not found' });
  },
  // change the destination of the parcel
  async changeDestination(req, res) {
    const { userId } = req.body;
    const changeDestination = 'UPDATE parcel_table SET destination = $1 WHERE id = $2 AND owner_id = $3 RETURNING *';
    const id = req.params.id;
    const destination = req.body.destination;
    const { rows } = await Database.execute(changeDestination, [destination, id, userId]);
    if (rows[0]) return res.status(201).send(rows[0]);
    return res.status(404).send({ message: 'parcel not found' });
  },
  // change the status
  async changeStatus(req, res) {
    if (req.body.role !== 'Admin') return res.status(403).send({ message: 'Not authorized' });
    const id = req.params.id;
    const fetchParcel = 'SELECT * FROM parcel_table WHERE id = $1';
    const { rows } = await Database.execute(fetchParcel, [id]);
    if (!rows) return res.status(404).send({ message: 'parcel not found' });
    if (!rows[0]) return res.status(404).send({ message: 'parcel not found' });
    const prevStatus = rows[0].status;
    const changeStatus = 'UPDATE parcel_table SET status = $1 WHERE id = $2 RETURNING *';
    const status = prevStatus === 'Pending' ? 'Delivered' : 'Pending';
    const update = await Database.execute(changeStatus, [status, id]);
    return res.status(201).send(update.rows[0]);
  }
};
export default Parcel;
