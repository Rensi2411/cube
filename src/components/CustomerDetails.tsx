import React from 'react';

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
  return (
    <div className="customer-details">
      <h2>Customer Details</h2>
      <p>Name: {details.name}</p>
      <p>Title: {details.title}</p>
      <p>Address: {details.address}</p>
      <div className="photo-grid">
        {details.photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Photo ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
