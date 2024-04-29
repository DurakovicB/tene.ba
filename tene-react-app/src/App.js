import React, { useState, useEffect } from 'react';
import './App.css';
import ShoeCard from './ShoeCard'; // Import the ShoeCard component
import ShoeShop from './ShoeShop';

function App() {
  return (
    <div className="App">
      {/* Render the ShoeShop component */}
      <ShoeShop />
    </div>
  );
}
export default App;
