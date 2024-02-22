import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Family from './components/FamilySignUpForm/Family.js';
import BackgroundThings from './components/BackgroundThings/BackgroundThings.js';
import User from './components/User/User.js';

function App() {
  const [siteNumber, setSiteNumber] = useState(1);
  let siteComponent = null;

  if (siteNumber === 1) {
    siteComponent = <Family siteNumber={siteNumber} setSiteNumber={setSiteNumber}/>
  } else if (siteNumber === 2) {
    siteComponent =  <User iteNumber={siteNumber} setSiteNumber={setSiteNumber}/>
  } else if (siteNumber === 3) {
    siteComponent =  <div>Site 3</div>
  } else if (siteNumber === 4) {
    siteComponent = <div>Site 4</div>
  }

  return (
    <>
      <Navigation siteNumber={siteNumber} setSiteNumber={setSiteNumber} />
      <BackgroundThings />

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
