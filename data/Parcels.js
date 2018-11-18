import moment from 'moment';
import uuid from 'uuid';

const Parcels = [
  {
    id: uuid.v4(),
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
export default Parcels;
