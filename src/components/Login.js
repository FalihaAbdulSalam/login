import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Login = ({ onSuccess, onFailure }) => {
  const googleClientId = '194721793640-q3sa4jjmd3ssijdsg2u1i8uj6mb0j8nm.apps.googleusercontent.com';

  const handleSuccess = (response) => {
    console.log("qwertyui");
    onSuccess(response.profileObj);
  };

  const handleFailure = (error) => {
    console.log("qwertyu63263823i");

    onFailure(error);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <GoogleLogin
        clientId={googleClientId}
        buttonText="Login with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Login;
