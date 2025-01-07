//example

const httpSender = require('./httpSender');

const authService = {
  async login(credentials) {
    return httpSender.post('/auth/login', credentials);
  },

  async register(userDetails) {
    return httpSender.post('/auth/register', userDetails);
  },

  async logout() {
    return httpSender.post('/auth/logout');
  },
};

module.exports = authService;
