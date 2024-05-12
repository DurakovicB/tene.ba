import './ShoeShop.css'; // Import your CSS file for styling
import ShoeCard from './ShoeCard'; // Import the ShoeCard component
import React, { useState, useEffect } from 'react';

const ShoeShop = () => {
    const [shoes, setShoes] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [sortByValue, setSortByValue] = useState("name.asc"); // Default sort value
    const [selectedSexes, setSelectedSexes] = useState([]);
    const [showAllSizes, setShowAllSizes] = useState(false);
    const [sizesArray, setSizesArray] = useState([]);
    const [shoeCount, setShoeCount] = useState(0);
    const [brands, setBrands] = useState([]);
    const [showAllBrands, setShowAllBrands] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [brandsArray, setBrandsArray] = useState([]);

    useEffect(() => {
      // Define the request options
      const requestOptions = {
        method: 'POST', // Use POST method
        headers: {
          'Content-Type': 'application/json' // Specify JSON content type
        },
        //getting sortBy and asc_desc value from jsx element value
        body: JSON.stringify({ "sortBy": sortByValue.split(".")[0] ,"sex":selectedSexes,"asc_desc":sortByValue.split(".")[1], "sizes": sizesArray, "brands":brandsArray}) 
      };
    
      // Fetch shoes from API
      fetch('http://localhost:5000/shoes/query', requestOptions)
        .then(response => response.json())
        .then(data => {
          //console.log('Shoes data:', data); // Display fetched data in console
          setShoes(data);
          setShoeCount(data.length);
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
  
      fetch('http://localhost:5000/shoebrands')
      .then(response => response.json())
      .then(data => {
        //console.log('Shoe brands:', data); // Display fetched data in console
        setBrands(data);
      })
      .catch(error => console.error('Error fetching shoe brands:', error));  

      }, [sortByValue,selectedSexes,sizesArray,brandsArray]); // Execute useEffect whenever sortByValue changes
    
    

      const handleSortChange = (event) => {
        setSortByValue(event.target.value);
      };

      // Function to toggle showing all sizes
      const toggleShowAllSizes = () => {
        setShowAllSizes(prevState => !prevState);
      };

      const toggleShowAllBrands = () => {
        setShowAllBrands(prevState => !prevState);
      };

    // Function to handle checkbox change
      const handleSexesCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
          setSelectedSexes(prevSelected => [...prevSelected, value]);
        } else {
          setSelectedSexes(prevSelected => prevSelected.filter(sex => sex !== value));
        }
      };

      // Function to handle checkbox change
      const handleSizesCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
          setSizesArray(prevSizes => [...prevSizes, value]);
        } else {
          setSizesArray(prevSizes => prevSizes.filter(size => size !== value));
        }
      };

      const handleBrandsCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
          setBrandsArray(prevBrands => [...prevBrands, value]);
        } else {
          setBrandsArray(prevBrands => prevBrands.filter(size => size !== value));
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

      {/* Element displaying the number of shoes found */}
      

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
          <h3>Shoe Sex</h3>
          <input type="checkbox" id="sex1" name="sex1" value="Male" onChange={handleSexesCheckboxChange} />
          <label htmlFor="sex1">Men</label>
          <input type="checkbox" id="sex2" name="sex2" value="Female" onChange={handleSexesCheckboxChange} />
          <label htmlFor="sex2">Women</label>
          <input type="checkbox" id="sex3" name="sex3" value="Kid" onChange={handleSexesCheckboxChange} />
          <label htmlFor="sex3">Kids</label>
        </div>
        <div className="filter-section">
            <h3>Brands</h3>
            {brands.slice(0, showAllBrands ? brands.length : 5).map((brand, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`brand${index + 1}`}
                  name={`brand${index + 1}`}
                  value={brand}
                  onChange={handleBrandsCheckboxChange}
                />
                <label htmlFor={`brand${index + 1}`}>{brand}</label>
              </div>
            ))}
            {brands.length > 5 && (
              <button onClick={toggleShowAllBrands}>
                {showAllBrands ? "Show Less" : "Show More"}
              </button>
            )}
            <p>Selected Brands: {brandsArray.join(', ')}</p>
        </div>
        <div className="filter-section">
            <h3>Shoe Sizes</h3>
            {sizes.slice(0, showAllSizes ? sizes.length : 5).map((size, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`size${index + 1}`}
                  name={`size${index + 1}`}
                  value={size}
                  onChange={handleSizesCheckboxChange}
                />
                <label htmlFor={`size${index + 1}`}>{size}</label>
              </div>
            ))}
            {sizes.length > 5 && (
              <button onClick={toggleShowAllSizes}>
                {showAllSizes ? "Show Less" : "Show More"}
              </button>
            )}
            <p>Selected Sizes: {sizesArray.join(', ')}</p>
          </div>
        </div>

        <div>

          {/* Shoe Count */}
          <div className="shoe-count">
            Found {shoeCount} shoes.
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
    </div>
  );
}

export default ShoeShop;
