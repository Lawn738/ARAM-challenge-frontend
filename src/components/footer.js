import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>Aramchallenge.com isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</p>
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