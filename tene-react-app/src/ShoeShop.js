import './ShoeShop.css'; // Import your CSS file for styling
import ShoeCard from './ShoeCard'; // Import the ShoeCard component
import React, { useState, useEffect } from 'react';

const ShoeShop = () => {
    const [shoes, setShoes] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [sortByValue, setSortByValue] = useState("name.asc"); // Default sort value
    const [selectedSexes, setSelectedSexes] = useState([]);

    useEffect(() => {
      // Define the request options
      const requestOptions = {
        method: 'POST', // Use POST method
        headers: {
          'Content-Type': 'application/json' // Specify JSON content type
        },
        //getting sortBy and asc_desc value from jsx element valu
        body: JSON.stringify({ "sortBy": sortByValue.split(".")[0] ,"sex":selectedSexes,"asc_desc":sortByValue.split(".")[1]}) 
      };
    
      // Fetch shoes from API
      fetch('http://localhost:5000/shoes/query', requestOptions)
        .then(response => response.json())
        .then(data => {
          //console.log('Shoes data:', data); // Display fetched data in console
          setShoes(data);
        })
        .catch(error => console.error('Error fetching shoes:', error));
    
      // Fetch shoe sizes from API
      fetch('http://localhost:5000/shoesizes')
      .then(response => response.json())
      .then(data => {
        //console.log('Shoe sizes:', data); // Display fetched data in console
        setSizes(data);
      })
      .catch(error => console.error('Error fetching shoe sizes:', error));
  
        
      }, [sortByValue,selectedSexes]); // Execute useEffect whenever sortByValue changes
    
    

      const handleSortChange = (event) => {
        setSortByValue(event.target.value);
      };

    // Function to handle checkbox change
      const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
          setSelectedSexes(prevSelected => [...prevSelected, value]);
        } else {
          setSelectedSexes(prevSelected => prevSelected.filter(sex => sex !== value));
        }
      };

  return (
    <div className="shoe-shop">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">tene.ba</div>
        <ul className="navbar-nav">
          <li className="nav-item"><a href="#" className="nav-link">Contact</a></li>
          <li className="nav-item"><a href="#" className="nav-link">About us</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Log in/Register</a></li>
        </ul>
      </nav>

      {/* Content wrapper */}
      <div className="content-wrapper">
        {/* Filters */}
        <div className="filters">
          <h2>Filters</h2>
          <div className="filter-section">
            <h3>Sort By</h3>
            <select value={sortByValue} onChange={handleSortChange}>
              <option value="name.asc">Name - A to Z</option>
              <option value="name.desc">Name - Z to A</option>
              <option value="price.asc">Price - Low to High</option>
              <option value="price.desc">Price - High to Low</option>
            </select>
          </div>
          <div className="filter-section">
            <h3>Brands</h3>
            <input type="checkbox" id="brand1" name="brand1" />
            <label htmlFor="brand1">Nike</label>
            <input type="checkbox" id="brand2" name="brand2" />
            <label htmlFor="brand2">Adidas</label>
            {/* Add more brand checkboxes here */}
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
          <h3>Shoe Sex</h3>
          <input type="checkbox" id="sex1" name="sex1" value="Male" onChange={handleCheckboxChange} />
          <label htmlFor="sex1">Men</label>
          <input type="checkbox" id="sex2" name="sex2" value="Female" onChange={handleCheckboxChange} />
          <label htmlFor="sex2">Women</label>
          <input type="checkbox" id="sex3" name="sex3" value="Kid" onChange={handleCheckboxChange} />
          <label htmlFor="sex3">Kids</label>
          {/* Add more type checkboxes here */}
        </div>
          <div className="filter-section">
            <h3>Shoe Sizes</h3>
            {sizes.map((size, index) => (
              <div key={index}>
                <input type="checkbox" id={`size${index + 1}`} name={`size${index + 1}`} />
                <label htmlFor={`size${index + 1}`}>{size}</label>
              </div>
            ))}
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
