import axios from('axios');
import AxiosMockAdapter from('axios-mock-adapter');
import restAssure from ('../services/http-sender.js')

const httpSender = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


describe('HTTP Sender Tests', () => {
  const mock = new AxiosMockAdapter(httpSender);

  afterEach(() => mock.reset()); // Reset mocks after each test
  afterAll(() => mock.restore()); // Restore Axios instance after all tests

  test('GET request', async () => {
    mock.onGet('/users').reply(200, [{ id: 1, name: 'John Doe' }]);

    const response = await restAssure.get('/users');
    expect(response).toEqual([{ id: 1, name: 'John Doe' }]);
  });

  test('POST request', async () => {
    const userData = { name: 'Jane Doe', email: 'jane@example.com' };
    mock.onPost('/users', userData).reply(201, { id: 1, ...userData });

    const response = await restAssure.post('/users', userData);
    expect(response).toEqual({ id: 1, name: 'Jane Doe', email: 'jane@example.com' });
  });

  test('PUT request', async () => {
    const updatedData = { name: 'John Updated' };
    mock.onPut('/users/1', updatedData).reply(200, { id: 1, ...updatedData });

    const response = await restAssure.put('/users/1', updatedData);
    expect(response).toEqual({ id: 1, name: 'John Updated' });
  });

  test('DELETE request', async () => {
    mock.onDelete('/users/1').reply(204);

    const response = await restAssure.delete('/users/1');
    expect(response).toBeUndefined(); // DELETE returns no content
  });

  test('PATCH request', async () => {
    const patchData = { name: 'John Patched' };
    mock.onPatch('/users/1', patchData).reply(200, { id: 1, ...patchData });

    const response = await restAssure.patch('/users/1', patchData);
    expect(response).toEqual({ id: 1, name: 'John Patched' });
  });

  test('HEAD request', async () => {
    mock.onHead('/users/1').reply(200, {}, { 'X-Custom-Header': 'value' });

    const response = await restAssure.head('/users/1');
    expect(response.headers['x-custom-header']).toBe('value');
  });

  test('OPTIONS request', async () => {
    mock.onOptions('/users').reply(200, {}, { Allow: 'GET, POST' });

    const response = await restAssure.options('/users');
    expect(response.headers.allow).toBe('GET, POST');
  });
});
