import React from 'react';

const ShoeCard = ({ shoe }) => {
  return (
    <div className="card">
      <img src={shoe.image_url} className="card-img-top" alt={shoe.title} />
      <div className="card-body">
        <h5 className="card-title">{shoe.name}</h5>
        <p className="card-text">Brand: {shoe.brand}</p>
        <p className="card-text">Price: {shoe.price} KM</p>
        <a href={shoe.link} className="btn btn-primary">View Details</a>
      </div>
    </div>
  );
}

export default ShoeCard;
