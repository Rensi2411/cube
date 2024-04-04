import React from 'react';

interface Props {
  photos: string[];
}

const PhotoGrid: React.FC<Props> = ({ photos }) => {
  return (
    <div className="photo-grid">
      {photos.map((photo, index) => (
        <img key={index} src={photo} alt={`Photo ${index}`} />
      ))}
    </div>
  );
};

export default PhotoGrid;
