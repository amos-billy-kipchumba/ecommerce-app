// Spinner.js
import React from 'react';
import './Spinner.css';

const Spinner = () => (
  <div className="cloud-background">
    <img src="/res/svg/plane.svg" className="plane-icon" alt="Flying plane" />
    <div className="spinner-icon"></div>
  </div>
);

export default Spinner;
