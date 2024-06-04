import React, { useEffect } from 'react';

const GoogleSignIn = () => {
  useEffect(() => {
    // Function to load the Google API script
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.onload = () => {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: '137768872745-qfgqvave8lfmeqh924rbibhbs4tqk5oo.apps.googleusercontent.com'
          }).then(() => {
            renderButton();
          });
        });
      };
      document.body.appendChild(script);
    };

    const renderButton = () => {
      window.gapi.signin2.render('g-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn
      });
    };

    const onSignIn = (googleUser) => {
      var profile = googleUser.getBasicProfile();
      console.log('ID:', profile.getId());
      console.log('Name:', profile.getName());
      console.log('Image URL:', profile.getImageUrl());
      console.log('Email:', profile.getEmail());
    };

    loadGoogleScript();
  }, []);

  const signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  };

  return (
    <div>
      <div id="g-signin2"></div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default GoogleSignIn;
