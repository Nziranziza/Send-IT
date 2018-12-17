async function getData() {
  const header = new Headers();
  const { user } = JSON.parse(localStorage.getItem('sendit-user-token'));
  const { token } = JSON.parse(localStorage.getItem('sendit-user-token'));
  header.append('Accept', 'application/json');
  header.append('Content-Type', 'application/json');
  header.append('x-access-token', token);
  const response = await fetch(`../../api/v1/users/${user.id}/parcels`, {
    method: 'GET',
    headers: header
  });
  const data = await response.json();
  return data;
}
async function fetchParcel() {
  const displayParcel = document.getElementById('display');

  if (localStorage.getItem('sendit-user-token') === null || !JSON.parse(localStorage.getItem('sendit-user-token'))) {
    window.location.replace('/pages/login.html');
  }
  await getData()
    .then((data) => {
      if (data.message === ('Not authorized!!!' || 'Not authorized!' || 'OOPS!!! Something went wrong!!!')) {
        alert(data.message);
      } else if (data.message === 'No parcels were found') {
        displayParcel.innerHTML = `<div class='box margin-left'>
          <p>Your recent parcel delivery order is empty.
          Please create the first 3 for free</p>
          </div>`;
      } else {
        const length = data.length;
        displayParcel.innerHTML = '';
        for (let i = length - 1; i >= 0; --i) {
          const from = data[i].origin;
          const destination = data[i].destination;
          const weight = data[i].weight;
          const status = data[i].status;
          const price = data[i].price;
          const date = data[i].created_date;
          const ordered = status === 'Pending' ? 'Cancel' : 'Order';
          const id = data[i].id;
          const presentLoc = data[i].present_location;
          const btnclass = status === 'Pending' ? 'label del' : 'label success';
          displayParcel.innerHTML += `<div class='box margin-left'>
          <div class='popup right' onMouseOver='popup("${id}")' onMouseOut='popup("${id}")' onclick='deleteParcel("${id}")'>x<span class='popuptext' id='${id}p'>Remove</span></div>
          <h3>Parcel order from ${from} to ${destination}</h3>
          <label><b>Status:</b> ${status}</label></br />
          <label><b>Weight:</b> ${weight} kg</label><br />
          <label><b>Price:</b> ${price} Rwf</label><br />
          <label><b>Present location:</b>${presentLoc}</label><br />
          <label>${date}</label><br />
          <button onClick='cancelParcel("${id}")' class='${btnclass}'>${ordered}</button>
          <button onClick='edit("${id}")' class='label primary'>Change location</button>
          <div id='${id}'></div>
      </div>`;
        }
      }
    });
}
async function createParcel() {
  const header = new Headers();
  const from = document.getElementById('from').value;
  const destination = document.getElementById('destination').value;
  const weight = document.getElementById('weight').value;
  const { token } = JSON.parse(localStorage.getItem('sendit-user-token'));
  header.append('Accept', 'application/json');
  header.append('Content-Type', 'application/json');
  header.append('x-access-token', token);
  await fetch('../../api/v1/parcels', {
    method: 'POST',
    headers: header,
    body: JSON.stringify({
      from,
      destination,
      weight
    })
  });
  fetchParcel();
}
async function changeDestination(id) {
  const header = new Headers();
  const destination = document.getElementById(`${id}i`).value;
  const { token } = JSON.parse(localStorage.getItem('sendit-user-token'));
  header.append('Accept', 'application/json');
  header.append('Content-Type', 'application/json');
  header.append('x-access-token', token);
  await fetch(`../../api/v1/parcels/${id}/destination`, {
    method: 'PUT',
    headers: header,
    body: JSON.stringify({
      destination
    })
  });
  fetchParcel();
}
function edit(id) {
  const dist = document.getElementById(id);
  dist.innerHTML = `<input type='text' placeholder='Type in new destination' id='${id}i'><br />
                 <button class='label primary' onClick='changeDestination("${id}")'>Update</button>`;
}

async function cancelParcel(id) {
  const header = new Headers();
  const { token } = JSON.parse(localStorage.getItem('sendit-user-token'));
  header.append('Accept', 'application/json');
  header.append('Content-Type', 'application/json');
  header.append('x-access-token', token);
  await fetch(`../../api/v1/parcels/${id}/cancel`, {
    method: 'PUT',
    headers: header
  });
  fetchParcel();
}
