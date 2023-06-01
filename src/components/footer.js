import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>Tämä on sivun alatunniste.</p>
    </footer>
  );
};

const styles = {
  footer: {
    background: '#f2f2f2',
    padding: '10px',
    position: 'fixed',
    bottom: '0',
    width: '100%',
    textAlign: 'center',
  },
};

export default Footer;