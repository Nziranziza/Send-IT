async function getData() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const header = new Headers();

  header.append('Accept', 'application/json');
  header.append('Content-Type', 'application/json');
  const response = await fetch('../../api/v1/auth/login', {
    method: 'post',
    headers: header,
    body: JSON.stringify({
      email,
      password
    })
  });
  const data = await response.json();
  return data;
}
function login() {
  getData()
    .then((data) => {
      if (data.token) {
        localStorage.setItem('sendit-user-token', JSON.stringify(data));
        if (data.user.role === 'user') {
          window.location.replace('/pages/createparcel.html');
        } else {
          window.location.replace('/pages/admin.html');
        }
      } else {
        const errarea = document.getElementById('err-msg');
        errarea.innerHTML = data.message;
      }
    });
}
