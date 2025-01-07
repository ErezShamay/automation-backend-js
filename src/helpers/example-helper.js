import userService from('./services/userService');
import authService from('./services/authService');

(async () => {
  try {
    // Login user
    const loginResponse = await authService.login({
      username: 'testuser',
      password: 'password123',
    });
    console.log('Login Response:', loginResponse);

    // Fetch user details
    const user = await userService.getUserById(1);
    console.log('User:', user);

    // Create a new user
    const newUser = await userService.createUser({
      name: 'New User',
      email: 'newuser@example.com',
    });
    console.log('Created User:', newUser);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
