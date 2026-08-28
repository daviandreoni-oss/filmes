import React from 'react';

export default function ButtonComponent({ children, type = 'button', className = '', onClick }) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}