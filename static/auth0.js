import auth0 from 'auth0-js';

const clientID = process.env.AUTH0_CLIENT_ID;
const domain = process.env.AUTH0_DOMAIN;

function webAuth(clientID, domain) {
  return new auth0.WebAuth({
    clientID: clientID,
    domain: domain
  });
}

function login() {
  const options = {
    responseType: 'id_token',
    redirectUri: 'http://localhost:3000/redirect',
    scope: 'openid profile email'
  };
  
  return webAuth(clientID, domain).authorize(options);
}

function parseHash(cb) {
  return webAuth(clientID, domain).parseHash(cb);
}

function logout() {
  return webAuth(clientID, domain).logout();
}

export {
  login,
  parseHash,
  logout
};

