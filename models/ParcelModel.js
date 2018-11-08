import moment from 'moment';
import uuid from 'uuid';

class Parcel {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.parcels = [
      {
        id: uuid.v4(),
        from: 'Muhanga',
        destination: 'Kigali',
        price: '1500',
        createdDate: moment.now(),
        owner: 'John Doe',
        presentLocation: 'Muhanga',
        weight: '10 kg'
      },
      {
        id: uuid.v4(),
        from: 'Huye',
        destination: 'Rusizi',
        price: '2500',
        createdDate: moment.now(),
        owner: 'Dany William',
        presentLocation: 'Huye',
        weight: '23 kg'
      },
      {
        id: uuid.v4(),
        from: 'Nyagatare',
        destination: 'Rusizi',
        price: '',
        createdDate: moment.now(),
        owner: 'Willy Smith',
        presentLocation: 'Rusizi',
        weight: '45 kg'
      }
    ];
  }

  /**
   *
   * @returns {object} parcel object
   */
  create(data) {
    const newParcel = {
      id: uuid.v4(),
      from: data.from || '',
      destination: data.destination || '',
      price: data.price || '',
      createdDate: moment.now(),
      owner: '',
      presentLocation: data.from,
      weight: data.weight || ''
    };
    this.parcels.push(newParcel);
    return newParcel;
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} parcel object
   */
  findOne(id) {
    return this.parcels.find(parcel => parcel.id === id);
  }

  /**
   * @returns {object} returns all parcels
   */
  findAll() {
    return this.parcels;
  }

  /**
   *
   * @param {uuid} id
   * @param {object} data
   */
  update(id, data) {
    const parcel = this.findOne(id);
    const index = this.parcels.indexOf(parcel);
    this.parcels[index].frrom = data.from || parcel.from;
    this.parcels[index].destination = data.destination || parcel.destination;
    this.parcels[index].weight = data.weight || parcel.weight;
    return this.parcels[index];
  }

  /**
   *
   * @param {uuid} id
   */
  delete(id) {
    const parcel = this.findOne(id);
    const index = this.parcels.indexOf(parcel);
    this.parcels.splice(index, 1);
    return {};
  }
}
export default new Parcel();
