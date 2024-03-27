// Importing necessary modules and components
import React, { useState } from 'react';
import './App.css';

import BackgroundThings from './components/BackgroundThings/BackgroundThings.js';
import Privacy from './components/Privacy/Privacy.js';
import Navigation from './components/Navigation/Navigation.js';
import Family from './components/FamilySignUpForm/Family.js';
import User from './components/User/User.js';
import Homepage from './components/Homepage/Homepage.js';
import Profile from './components/Profile/Profile.jsx';

// Main App component
function App() {
  // State variable to keep track of the current site number
  const [siteNumber, setSiteNumber] = useState(1);
  let siteComponent = null;

  // Depending on the siteNumber, different components are rendered
  if (siteNumber === 1) {
    siteComponent = <Family siteNumber={siteNumber} setSiteNumber={setSiteNumber}/>
  } else if (siteNumber === 2) {
    siteComponent =  <User siteNumber={siteNumber} setSiteNumber={setSiteNumber}/>
  } else if (siteNumber === 3) {
    siteComponent =  <Homepage siteNumber={siteNumber} setSiteNumber={setSiteNumber}/>
  } else if (siteNumber === 4) {
    siteComponent = <Profile siteNumber={siteNumber} setSiteNumber={setSiteNumber}/>
  }

  // The rendered JSX
  return (
    <>
      {/* Navigation component is always rendered */}
      <Navigation siteNumber={siteNumber} setSiteNumber={setSiteNumber} />
      {/* BackgroundThings component is always rendered */}
      <BackgroundThings />
      
      {/* Privacy component is rendered only when siteNumber is 1 or 2 */}
      {(siteNumber === 1 || siteNumber === 2) && <Privacy siteNumber={siteNumber} setSiteNumber={setSiteNumber}/>}

      {/* The component determined by the siteNumber state */}
      {siteComponent}
    </>
  );
};

// Exporting the App component to be used in other parts of the application
export default App;