// src/components/ControlButton.jsx
import React from 'react';
import Icon from './Icon';
import './ControlButton.css';

function ControlButton({ type, onClick }) {
  return (
    <button className="control-button" onClick={onClick}>
      <Icon type={type} />
    </button>
  );
}

export default ControlButton;
