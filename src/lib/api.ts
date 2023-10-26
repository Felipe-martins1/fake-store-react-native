import axios from 'axios';

const fakeStoreBaseUrl = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: fakeStoreBaseUrl,
});
