import axios from 'axios';

const fakeStoreBaseUrl = 'https://fakestoreapi.com';

export const api = axios.create({
  baseURL: fakeStoreBaseUrl,
});
