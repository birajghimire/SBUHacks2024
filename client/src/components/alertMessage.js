import React, { useEffect } from 'react';

const AlertMessage = ({ message, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Remove the alert after the specified duration
      document.getElementById('alert').remove();
    }, duration);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div id="alert" className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
      <p className="font-bold">Informational message</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default AlertMessage;
