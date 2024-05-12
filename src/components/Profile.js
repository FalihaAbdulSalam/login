import React from 'react';

const Profile = ({ user }) => {
  return (
    <div>
      <h2>Profile Page</h2>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      
      )}
    </div>
  );
};

export default Profile;
