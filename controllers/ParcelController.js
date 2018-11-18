import moment from 'moment';
import uuid from 'uuid';
import Parcels from '../data/Parcels';

const Parcel = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} parcel object
   */
  create(req, res) {
    if (!req.body.from || !req.body.destination || !req.body.weight) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const { from, destination, weight } = req.body;
    const newParcel = {
      id: uuid.v4(),
      from,
      destination,
      price: weight * 450,
      createdDate: moment.now(),
      owner: uuid.v4(),
      presentLocation: from,
      weight,
    };
    Parcels.push(newParcel);
    return res.status(201).send(newParcel);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} parcels array
   */
  getAll(req, res) {
    const parcels = Parcels;
    return res.status(200).send(parcels);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} parcel object
   */
  getOne(req, res) {
    const oneParcel = Parcels.find(parcel => parcel.id === req.params.id);
    if (!oneParcel) {
      return res.status(404).send({ message: 'parcel not found' });
    }
    return res.status(200).send(oneParcel);
  },
};

export default Parcel;
