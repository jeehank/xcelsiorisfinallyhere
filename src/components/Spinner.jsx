import React from 'react';
import './Spinner.css';



const Spinner= ({ size = 'medium', color = '#3498db' }) => {
  return (
    
      <div 
        className={`spinner ${size}`}
      />
  );
};

export default Spinner;
