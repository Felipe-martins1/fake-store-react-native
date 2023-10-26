import { api } from '@src/lib/api';

const findAll = () => {
  return api.get<string[]>('/products/categories').then((response) => response.data);
};

export const categoriesService = {
  findAll,
};
