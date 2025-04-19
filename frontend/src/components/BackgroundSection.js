import React from 'react';

const BackgroundSection= () => {
  const containerStyle = {
    width: '100%',
    height: '100vh',  // Full page height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',  // Pure white background
    fontFamily: "italic",  // Clean modern font
  };

  const quoteStyle = {
    color: '#222222',  // Soft black for text
    fontSize: '5.5rem',
    fontWeight: '600',
    textAlign: 'center',
    poition:"absolute",
    top:"30%"
  };

  return (
    <div style={containerStyle}>
      <div style={quoteStyle}>
        Learn English. <br /> Unlock possibilities.
      </div>
    </div>
  );
};


export default BackgroundSection;
