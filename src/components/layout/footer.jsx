import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <style jsx>{`
        .app-footer {
          text-align: center;
          padding: 20px;
          background-color: #222;
          color: white;
        }
      `}</style>
      
      <p>&copy; 2025 Universidad Laica Eloy Alfaro de Manabí</p>
    </footer>
  );
};

export default Footer;