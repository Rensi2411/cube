import axios from 'axios';

const JSONPLACEHOLDER_API_URL = 'https://jsonplaceholder.typicode.com';
const UNSPLASH_API_URL = 'https://api.unsplash.com/photos/random?count=1000'; // Fetch 9 random photos

/**
 * Fetches customers from the JSONPlaceholder API.
 * @returns {Promise<any[]>} The list of customers.
 */
export const fetchCustomers = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${JSONPLACEHOLDER_API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return []; // Return an empty array in case of error
  }
};

/**
 * Fetches details of a specific customer, including photos from the Unsplash API.
 * @param {number} customerId - The ID of the customer.
 * @returns {Promise<object>} Details of the customer, including name, title, address, and photos.
 */
export const fetchCustomerDetails = async (customerId: number): Promise<object> => {
  try {
    // Fetch customer details from JSONPlaceholder API
    const response = await axios.get(`${JSONPLACEHOLDER_API_URL}/users/${customerId}`);
    const user = response.data;

    // Fetch random photos from Unsplash API
    const unsplashResponse = await axios.get(UNSPLASH_API_URL, {
      headers: { 'Authorization': `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}` }
    });

    const photos = unsplashResponse.data.map((photo: any) => photo.urls.regular);

    return {
      name: user.name,
      title: user.company?.name || 'Title Placeholder',
      address: `${user.address?.street}, ${user.address?.city}`,
      photos: photos // Include photos from Unsplash API
    };
  } catch (error) {
    console.error('Error fetching customer details:', error);
    return {
      name: 'Unknown',
      title: 'Title Placeholder',
      address: 'Address Placeholder',
      photos: [] 
    };
  }
};
