import React from 'react';
import './ShoeCard.css';

const ShoeCard = ({ shoe }) => {
  return (
    <div className="card">
      <div className="card-img-container">
        <a href={shoe.link} target="_blank" rel="noopener noreferrer">
          <img src={shoe.image_url} className="card-img" alt={shoe.name} />
        </a>
      </div>
      <div className="card-body">
        <h5 className="card-title">{shoe.name}</h5>
        <p className="card-text"><strong>Brand:</strong> {shoe.brand}</p>
        <p className="card-text"><strong>Store:</strong> {shoe.storename}</p>
        <div className="price-container">
          <p className="price">{shoe.price} KM</p>
        </div>
      </div>
    </div>
  );
}


export default ShoeCard;
