// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Profile from './components/Profile';

// const App = () => {
//   const [user, setUser] = useState(null);

//   const handleLoginSuccess = (userData) => {
//     setUser(userData);
//   };

//   const handleLoginFailure = (error) => {
//     if (error.error === 'popup_closed_by_user') {
//       console.error('User closed the login popup.');
//       // You can display a message to the user indicating that the login was cancelled
//       // For example: setError("Login cancelled by user.");
//     } else {
//       console.error('Login failed:', error);
//       // Handle other login failure scenarios
//       // For example: setError("An error occurred during login.");
//     }
//   };
  

//   const handleExternalLinks = () => {
//     if (navigator.userAgent.includes('Instagram')) {
//       document.querySelectorAll('a').forEach((a) => {
//         a.addEventListener('click', (e) => {
//           e.preventDefault();
//           window.open(a.getAttribute('href'), '_system');
//         });
//       });
//     }
//   };

//   // Handle external links when the component mounts
//   useEffect(() => {
//     handleExternalLinks();
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/profile"
//           element={user ? <Profile user={user} /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/"
//           element={<Login onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        // Detect if the app is opened within the Instagram in-app browser
        const isInstagram = navigator.userAgent.includes('Instagram');
        if (isInstagram) {
            document.addEventListener('click', handleInstagramLinks);
            return () => {
                document.removeEventListener('click', handleInstagramLinks);
            };
        }
    }, []);

    const handleInstagramLinks = (event) => {
        const { target } = event;
        if (target.tagName === 'A' && target.getAttribute('href').startsWith('http')) {
            event.preventDefault();
            window.open(target.getAttribute('href'), '_system');
        }
    };

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}
export default App;
