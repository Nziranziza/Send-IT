import uuid from 'uuid';
import Database from '../db/database';

const Parcel = {
/**
 * create a parcel
 *
 * @param {object} req parcel data
 * @param {*} res
 * @returns {object} user
 */
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
    try {
      const { rows } = await Database.execute(createParcel, newParcel);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.send(error);
    }
  },
  /**
   * get all parcel
   *
   * @param {*} req
   * @param {*} res
   * @returns {array} parcels
   */
  async getAll(req, res) {
    if (req.body.role !== 'Admin') return res.status(403).send({ message: 'Not authorized' });
    try {
      const selectAllParcels = 'SELECT * FROM parcel_table';
      const { rows } = await Database.execute(selectAllParcels);
      if (!rows[0]) return res.status(404).send({ message: 'parcels not found' });
      return res.status(200).send(rows);
    } catch (error) {
      return res.status(520).send({ message: 'OOPS!!! something went wrong!!!' });
    }
  },
  /**
   * get one parcel by id
   *
   * @param {uuid} req parcel id
   * @param {*} res
   * @returns {object} parcel
   */
  async getOne(req, res) {
    const selectOneParcel = 'SELECT * FROM parcel_table WHERE id = $1';
    const id = req.params.id;
    try {
      const { rows } = await Database.execute(selectOneParcel, [id]);
      if (rows[0]) return res.status(200).send(rows[0]);
      return res.status(404).send({ message: 'parcel not found' });
    } catch (error) {
      return res.status(520).send({ message: 'OOPS!!! something went wrong!!!' });
    }
  },
  /**
   * change the present location of the parcel
   *
   * @param {string} req present location
   * @param {*} res
   * @returns {object} updated parcel
   */
  async changePresentLocation(req, res) {
    if (req.body.role !== 'Admin') return res.status(403).send({ message: 'Not authorized???' });
    const changePresentLocation = 'UPDATE parcel_table SET present_location = $1 WHERE id = $2 RETURNING *';
    const id = req.params.id;
    const newLocation = req.body.location;
    const { rows } = await Database.execute(changePresentLocation, [newLocation, id]);
    if (!rows) return res.status(404).send({ message: 'parcel not found' });
    if (rows[0]) return res.status(201).send(rows[0]);
  },
  /**
   * change the destination of the parcel
   *
   * @param {string} req destination
   * @param {*} res
   * @returns {object} updated parcel
   */
  async changeDestination(req, res) {
    if (!req.body.destination) return res.status(400).send({ message: 'Please enter the destination' });
    const { userId } = req.body;
    const id = req.params.id;
    const fetchParcel = 'SELECT * FROM parcel_table WHERE id = $1';
    const { rows } = await Database.execute(fetchParcel, [id]);
    if (!rows) return res.status(403).send({ message: 'parcel not found' });
    if (!rows[0]) return res.status(403).send({ message: 'parcel not found' });
    if (userId !== rows[0].owner_id) return res.status(403).send({ message: 'Not authorized???' });
    const changeDestination = 'UPDATE parcel_table SET destination = $1 WHERE id = $2 AND owner_id = $3 RETURNING *';
    const destination = req.body.destination;
    const update = await Database.execute(changeDestination, [destination, id, userId]);
    return res.status(201).send(update.rows[0]);
  },
  /**
   * change the status
   *
   * @param {*} req
   * @param {*} res
   * @returns {object} updated parcel
   */
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
  },
  /**
   * cancel a parcel delivery order
   *
   * @param {*} req
   * @param {*} res
   * @returns {object} parcel
   */
  async cancelParcel(req, res) {
    const { userId } = req.body;
    const id = req.params.id;
    const fetchParcel = 'SELECT * FROM parcel_table WHERE id = $1';
    try {
      const { rows } = await Database.execute(fetchParcel, [id]);
      if (!rows[0]) return res.status(403).send({ message: 'parcel not found' });
      if (userId !== rows[0].owner_id) return res.status(403).send({ message: 'Not authorized???' });
      const cancel = 'UPDATE parcel_table SET status = $1 WHERE id = $2 AND owner_id = $3 RETURNING *';
      const update = await Database.execute(cancel, ['canceled', id, userId]);
      return res.status(201).send(update.rows[0]);
    } catch (error) {
      return res.status(520).send({ message: 'OOPS!!! something went wrong!!!' });
    }
  },
  /**
   * Get all parcels for a specific user
   *
   * @param {*} req
   * @param {*} res
   * @returns {array} parcels
   */
  async getParcelsForUser(req, res) {
    const { userId } = req.body;
    if (req.params.id !== userId) return res.status(403).send({ message: 'Not authorized!!!' });
    const userParcels = 'SELECT * FROM parcel_table WHERE owner_id = $1';
    try {
      const { rows } = await Database.execute(userParcels, [req.params.id]);
      if (!rows[0]) return res.status(404).send({ message: 'No parcels were found' });
      return res.status(200).send(rows);
    } catch (error) {
      return res.status(502).send({ message: 'OOPS!!! Something went wrong!!!' });
    }
  },
  /**
   * delete a parcel delivery order
   *
   * @param {*} req
   * @param {*} res
   * @returns {object} deleted parcel
   */
  async deleteParcel(req, res) {
    const { userId } = req.body;
    const { id } = req.params;
    const fetchParcel = 'SELECT * FROM parcel_table WHERE id = $1';
    try {
      const { rows } = await Database.execute(fetchParcel, [id]);
      if (!rows[0]) return res.status(404).send({ message: 'parcel not found' });
      if (userId !== rows[0].owner_id) return res.status(403).send({ message: 'Not authorized!!!' });
      const deleteParcel = 'DELETE FROM parcel_table WHERE id = $1 RETURNING *';
      const deleted = await Database.execute(deleteParcel, [id]);
      return res.status(200).send({ message: 'parcel was deleted successful', deleted: deleted.rows[0] });
    } catch (error) {
      return res.status(520).send({ message: 'OOPS!!! something went wrong!!!' });
    }
  }
};
export default Parcel;
