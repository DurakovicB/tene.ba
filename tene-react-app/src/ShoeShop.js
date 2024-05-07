// ShoeShop.jsx

import './ShoeShop.css'; // Import your CSS file for styling
import ShoeCard from './ShoeCard'; // Import the ShoeCard component
import React, { useState, useEffect } from 'react';


const sampleShoes = [
  {
    id: 1,
    brand: "Nike",
    title: "Air Force 1",
    image: "https://via.placeholder.com/150",
    price: "$100",
    productUrl: "#"
  },
  {
    id: 2,
    brand: "Adidas",
    title: "Superstar",
    image: "https://via.placeholder.com/150",
    price: "$90",
    productUrl: "#"
  },
  {
    id: 3,
    brand: "Puma",
    title: "Cali",
    image: "https://via.placeholder.com/150",
    price: "$80",
    productUrl: "#"
  },
  {
    id: 1,
    brand: "Nike",
    title: "Air Force 1",
    image: "https://via.placeholder.com/150",
    price: "$100",
    productUrl: "#"
  },
  {
    id: 2,
    brand: "Adidas",
    title: "Superstar",
    image: "https://via.placeholder.com/150",
    price: "$90",
    productUrl: "#"
  },
  {
    id: 3,
    brand: "Puma",
    title: "Cali",
    image: "https://via.placeholder.com/150",
    price: "$80",
    productUrl: "#"
  },
  {
    id: 1,
    brand: "Nike",
    title: "Air Force 1",
    image: "https://via.placeholder.com/150",
    price: "$100",
    productUrl: "#"
  },
  {
    id: 2,
    brand: "Adidas",
    title: "Superstar",
    image: "https://via.placeholder.com/150",
    price: "$90",
    productUrl: "#"
  },
  {
    id: 3,
    brand: "Puma",
    title: "Cali",
    image: "https://via.placeholder.com/150",
    price: "$80",
    productUrl: "#"
  }
];

const ShoeShop = () => {
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        // Fetch shoes from API
        fetch('http://localhost:5000/shoes')
          .then(response => response.json())
          .then(data => {
            console.log('Shoes data:', data); // Display fetched data in console
            setShoes(data);
          })
          .catch(error => console.error('Error fetching shoes:', error));
      }, []);

  return (
    <div className="shoe-shop">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Shoe Shop</div>
        <ul className="navbar-nav">
          <li className="nav-item"><a href="#" className="nav-link">Male Shoes</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Female Shoes</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Kid Shoes</a></li>
        </ul>
      </nav>

      {/* Content wrapper */}
      <div className="content-wrapper">
        {/* Filters */}
        <div className="filters">
          <h2>Filters</h2>
          <div className="filter-section">
            <h3>Brands</h3>
            <input type="checkbox" id="brand1" name="brand1" />
            <label htmlFor="brand1">Nike</label>
            <input type="checkbox" id="brand2" name="brand2" />
            <label htmlFor="brand2">Adidas</label>
            {/* Add more brand checkboxes here */}
          </div>
          <div className="filter-section">
            <h3>Shoe Sizes</h3>
            <input type="checkbox" id="size1" name="size1" />
            <label htmlFor="size1">US 7</label>
            <input type="checkbox" id="size2" name="size2" />
            <label htmlFor="size2">US 8</label>
            {/* Add more size checkboxes here */}
          </div>
          <div className="filter-section">
            <h3>Shoe Types</h3>
            <input type="checkbox" id="type1" name="type1" />
            <label htmlFor="type1">Sneakers</label>
            <input type="checkbox" id="type2" name="type2" />
            <label htmlFor="type2">Boots</label>
            {/* Add more type checkboxes here */}
          </div>
          <div className="filter-section">
            <h3>Sort By</h3>
            <select>
              <option value="price_asc">Price - Low to High</option>
              <option value="price_desc">Price - High to Low</option>
              <option value="name_asc">Name - A to Z</option>
              <option value="name_desc">Name - Z to A</option>
            </select>
          </div>
        </div>

        {/* Shoe Display Section */}
        <div className="shoe-display">
          <div className="row">
            {shoes.map(shoe => (
              <div key={shoe.id} className="col-md-4 mb-4">
                <ShoeCard shoe={shoe} /> {/* Render the ShoeCard component */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoeShop;
