import React, { useState } from 'react';
import './App.css';

import BackgroundThings from './components/BackgroundThings/BackgroundThings.js';
import Privacy from './components/Privacy/Privacy.js';

import Navigation from './components/Navigation/Navigation.js';

import Family from './components/FamilySignUpForm/Family.js';
import User from './components/User/User.js';
import Homepage from './components/Homepage/Homepage.js';
import Profile from './components/Profile/Profile.jsx';


function App() {
  const [siteNumber, setSiteNumber] = useState(1);
  let siteComponent = null;

  if (siteNumber === 1) {
    siteComponent = <Family siteNumber={siteNumber} setSiteNumber={setSiteNumber}/>
  } else if (siteNumber === 2) {
    siteComponent =  <User siteNumber={siteNumber} setSiteNumber={setSiteNumber}/>
  } else if (siteNumber === 3) {
    siteComponent =  <Homepage siteNumber={siteNumber} setSiteNumber={setSiteNumber}/>
  } else if (siteNumber === 4) {
    siteComponent = <Profile siteNumber={siteNumber} setSiteNumber={setSiteNumber}/>
  }

  return (
    <>
      <Navigation siteNumber={siteNumber} setSiteNumber={setSiteNumber} />
      <BackgroundThings />
      
      {(siteNumber === 1 || siteNumber === 2) && <Privacy siteNumber={siteNumber} setSiteNumber={setSiteNumber}/>}

      {siteComponent}

      {/* <div className="color-palet-div">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div> */}
    </>
  );
};

export default App;