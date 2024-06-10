import React from 'react';

const Boton = ({ sendText, onClick }) => {
  return (
    <button onClick={onClick}>
      {sendText}
    </button>
  );
};

export default Boton;