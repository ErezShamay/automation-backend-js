import nock from 'nock';
import userService from('../services/userService');

describe('User Service', () => {
  it('should fetch user by ID', async () => {
    nock(process.env.API_BASE_URL)
      .get('/users/1')
      .reply(200, { id: 1, name: 'John Doe' });

    const user = await userService.getUserById(1);
    expect(user).toEqual({ id: 1, name: 'John Doe' });
  });
});
