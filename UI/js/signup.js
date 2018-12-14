async function getData() {
  const firstName = document.getElementById('fname').value.trim();
  const lastName = document.getElementById('lname').value.trim();
  const email = document.getElementById('email').value.trim();
  const cemail = document.getElementById('cemail').value.trim();
  const password = document.getElementById('password').value.trim();

  if (email === cemail) {
    const response = await fetch('../../api/v1/auth/signup', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    });
    const data = await response.json();
    return data;
  }
  alert('Email must match confirm email');
}
function signup() {
  getData()
    .then(data => localStorage.setItem('sendit-user-token', JSON.stringify(data)));
  window.location.replace('/pages/createparcel.html');
}
