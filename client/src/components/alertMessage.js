// AlertMessage.js
import React, { useEffect, useState } from 'react';

const AlertMessage = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [duration]);

  // CSS styles for positioning the alert at the center bottom of the screen
  const alertStyles = {
    position: 'fixed',
    bottom: '20px', // Adjust as needed
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'fit-content',
    backgroundColor: '#6EE7B7',
    border: '1px solid #333',
    borderRadius: '5px',
    padding: '10px',
    color: '#333',
    textAlign: 'center',
    zIndex: 9999
  };

  // Render the alert only if it's visible
  return (
    visible && (
      <div style={alertStyles} role="alert">
        <p className="font-bold">Informational message</p>
        <p className="text-sm">{message}</p>
      </div>
    )
  );
};

export default AlertMessage;
