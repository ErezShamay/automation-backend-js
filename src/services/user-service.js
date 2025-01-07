//example

const httpSender = require('./httpSender');

const userService = {
  async getUserById(userId) {
    return httpSender.get(`/users/${userId}`);
  },

  async createUser(userData) {
    return httpSender.post('/users', userData);
  },

  async updateUser(userId, userData) {
    return httpSender.put(`/users/${userId}`, userData);
  },

  async deleteUser(userId) {
    return httpSender.delete(`/users/${userId}`);
  },
};

module.exports = userService;
