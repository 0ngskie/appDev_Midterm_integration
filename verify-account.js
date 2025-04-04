const fetch = require('node-fetch');

async function verifyAccount() {
  try {
    const response = await fetch('http://localhost:5000/users/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Miguel Louis Carandang',
        birthdate: '2004-02-01',
        nationality: 'fenoy',
        email: 'miguellouiscarandang@GMAIL.COM'
      })
    });

    const data = await response.json();
    console.log('Verification response:', data);
  } catch (error) {
    console.error('Error verifying account:', error);
  }
}

verifyAccount(); 