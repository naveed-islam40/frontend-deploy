import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');




  console.log(userName);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {userName ? (
        <p>Welcome, {userName}!</p>
      ) : (
        <p>User information not available.</p>
      )}
    </div>
  );
};

export default Profile;
