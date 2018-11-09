import moment from 'moment';
import uuid from 'uuid';

/**
   *
   * @param {number} weight
   * @returns {number} price
   */
function calculatePrice(weight) {
  return Number(weight) * 500;
}

class Parcel {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.parcels = [
      {
        id: '1232-3c44-xr4-35452-4c45c4c-35c345c-ccr',
        from: 'Muhanga',
        destination: 'Kigali',
        price: '1500',
        createdDate: moment.now(),
        owner: 'dc20098c-a5a2-4694-8379-62d41ca03341',
        presentLocation: 'Muhanga',
        weight: '10 kg',
      },
      {
        id: uuid.v4(),
        from: 'Huye',
        destination: 'Rusizi',
        price: '2500',
        createdDate: moment.now(),
        owner: 'dc20098c-a5a2-4694-8379-62d41ca03341',
        presentLocation: 'Huye',
        weight: '23 kg',
      },
      {
        id: uuid.v4(),
        from: 'Nyagatare',
        destination: 'Rusizi',
        price: '3500',
        createdDate: moment.now(),
        owner: 'dc20098c-a5a2-4694-8379-62d41ca03341',
        presentLocation: 'Rusizi',
        weight: '45 kg',
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
      from: data.from,
      destination: data.destination,
      price: calculatePrice(data.weight),
      createdDate: moment.now(),
      owner: uuid.v4(),
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
