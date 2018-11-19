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
  /**
   *
   * @param {uuid} req
   * @returns {object} res
   */
  getAllForUser(req, res) {
    const parcels = Parcels.filter(parcel => req.params.id === parcel.owner);
    if (!parcels.length) {
      return res.status(404).send({ message: 'parcels not found' });
    }
    return res.status(200).send(parcels);
  },
  /**
   *
   *  @param {uuid} req
   *  @param {object} res
   *  @returns {object} status code
   */
  cancel(req, res) {
    const targetParcel = Parcels.find(parcel => req.params.id === parcel.id);
    if (!targetParcel) {
      return res.status(404).send({ message: 'parcel not found' });
    }
    const index = Parcels.indexOf(targetParcel);
    Parcels[index].status = 'canceled';
    return res.status(200).send(Parcels[index]);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} updated parcel
   */
  update(req, res) {
    const targetParcel = Parcels.find(parcel => req.params.id === parcel.id);
    const data = req.body;
    if (!targetParcel) {
      return res.status(404).send({ message: 'parcel not found' });
    }
    const index = Parcels.indexOf(targetParcel);
    Parcels[index].from = data.from || targetParcel.from;
    Parcels[index].destination = data.destination || targetParcel.destination;
    Parcels[index].weight = data.weight || targetParcel.weight;
    const updatedParcel = Parcels[index];
    return res.status(200).send(updatedParcel);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  delete(req, res) {
    const targetParcel = Parcels.find(parcel => req.params.id === parcel.id);
    if (!targetParcel) {
      return res.status(404).send({ message: 'parcel not found' });
    }
    const index = Parcels.indexOf(targetParcel);
    Parcels.splice(index, 1);
    return res.status(201).send({ message: 'parcel was deleted successfully!!!' });
  }
};

export default Parcel;
