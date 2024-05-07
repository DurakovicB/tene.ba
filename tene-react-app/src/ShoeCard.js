import React from 'react';
import './ShoeCard.css';

const ShoeCard = ({ shoe }) => {
  return (
    <div className="card">
      <div className="card-img-container">
        <img src={shoe.image_url} className="card-img" alt={shoe.title} />
      </div>
      <div className="card-body">
        <h5 className="card-title">{shoe.name}</h5>
        <p className="card-text">Brand: {shoe.brand}</p>
        <p className="card-text">Price: {shoe.price} KM</p>
        <a href={shoe.link}  target="_blank" rel="noopener noreferrer">View Details</a>
      </div>
    </div>
  );
}

export default ShoeCard;
