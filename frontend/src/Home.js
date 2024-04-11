import React, { useState } from 'react';


function App() {
  const [username, setUsername] = useState('');

  const redirectToLoginPage = () => {
    window.location.href = '/login'; 
  };

  return (
    <div>


    </div>
  );
}

export default App;
