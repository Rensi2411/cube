import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchCustomers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const fetchCustomerDetails = async (customerId: number) => {
  const response = await axios.get(`${API_URL}/users/${customerId}`);
  const user = response.data;
  return {
    name: user.name,
    title: 'Title Placeholder', // You can fetch title from user object if available
    address: 'Address Placeholder', // You can fetch address from user object if available
    photos: [], // Placeholder for photos
  };
};
