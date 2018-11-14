import ParcelModel from '../models/ParcelModel';

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
    const parcel = ParcelModel.create(req.body);
    return res.status(201).send(parcel);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} parcels array
   */
  getAll(req, res) {
    const parcels = ParcelModel.findAll();
    return res.status(200).send(parcels);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} parcel object
   */
  getOne(req, res) {
    const parcel = ParcelModel.findOne(req.params.id);
    if (!parcel) {
      return res.status(404).send({ message: 'parcel not found' });
    }
    return res.status(200).send(parcel);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} updated parcel
   */
  update(req, res) {
    const parcel = ParcelModel.findOne(req.params.id);
    if (!parcel) {
      return res.status(404).send({ message: 'parcel not found' });
    }
    const updatedParcel = ParcelModel.update(req.params.id, req.body);
    return res.status(200).send(updatedParcel);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  delete(req, res) {
    const parcel = ParcelModel.findOne(req.params.id);
    if (!parcel) {
      return res.status(404).send({ message: 'parcel not found' });
    }
    const ref = ParcelModel.delete(req.params.id);
    return res.status(201).send(ref);
  },
  /**
   *
   * @param {uuid} req
   * @returns {object} res
   */
  getAllForUser(req, res) {
    const parcels = ParcelModel.findAllForUser(req.params.id);
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
    const parcel = ParcelModel.cancel(req.params.id);
    if (!parcel) {
      return res.status(404).send({ message: 'parcel not found' });
    }
    return res.status(200).send(parcel);
  }
};

export default Parcel;
