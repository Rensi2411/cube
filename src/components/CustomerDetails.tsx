import React, { useState, useEffect } from 'react';
import { PhotoGrid } from './';
import axios from 'axios';

const NINJA_API_URL = 'https://api.unsplash.com/photos/random?count=1000'

interface CustomerDetails {
  name: string;
  title: string;
  address: string;
  photos: string[];
}

interface Props {
  details: CustomerDetails;
}

const CustomerDetails: React.FC<Props> = ({ details }) => {
  const [photos, setPhotos] = useState<string[]>(details.photos);

  useEffect(() => {
    const fetchNewPhotos = async () => {
      try {
        const response = await axios.get(NINJA_API_URL, {
          headers: { 'X-Api-Key': process.env.REACT_APP_NINJA_API_KEY, 'Accept': 'image/jpg' }
        });
        const newPhotos = response.data;
        setPhotos(newPhotos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    const timer = setInterval(fetchNewPhotos, 10000); // Fetch new photos every 10 seconds

    return () => clearInterval(timer); // Clear interval on component unmount
  }, []);

  return (
    <div className="customer-details">
      <h2>Customer Details</h2>
      <p>Name: {details.name}</p>
      <p>Title: {details.title}</p>
      <p>Address: {details.address}</p>
      <PhotoGrid photos={photos} />
    </div>
  );
};

export default CustomerDetails;
