import { api } from '../api/api';

export const createOrder = (data) => {
  return api.post('/order', data);
};

export const getExposures = () => {
  return api.get(`/order/exposures`);
};