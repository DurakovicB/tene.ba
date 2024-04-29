import React from 'react';

const ShoeCard = ({ shoe }) => {
  return (
    <div className="card">
      <img src={shoe.image} className="card-img-top" alt={shoe.title} />
      <div className="card-body">
        <h5 className="card-title">{shoe.title}</h5>
        <p className="card-text">Brand: {shoe.brand}</p>
        <p className="card-text">Price: {shoe.price}</p>
        <a href={shoe.productUrl} className="btn btn-primary">View Details</a>
      </div>
    </div>
  );
}

export default ShoeCard;
