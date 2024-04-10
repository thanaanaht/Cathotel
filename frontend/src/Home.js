import React, { useState } from 'react';
import LoginPage from './pages/LoginPage'; // Import your login page component
import CheckLogin from './components/checklogin'; // Import the CheckLogin component

function App() {
  const [username, setUsername] = useState('');

  const redirectToLoginPage = () => {
    window.location.href = '/login'; 
  };

  return (
    <div>
      <CheckLogin setUsername={setUsername} redirectToLoginPage={redirectToLoginPage} />

      {username ? (
        <div>Welcome, {username}!</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
