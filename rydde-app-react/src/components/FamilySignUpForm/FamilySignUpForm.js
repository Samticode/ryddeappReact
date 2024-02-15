import './FamilySignUpForn.css';
import React, { useState } from 'react';

function FamilySignUpForm() {
  const [isLoginVisible, setLoginVisible] = useState(true);
  const [signupFamilyName, setSignupFamilyName] = useState('');
  const [signupFamilyPassword, setSignupFamilyPassword] = useState('');

  const toggleVisibility = () => {
    setLoginVisible(!isLoginVisible);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await fetch('/api/createFamily', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        familyName: signupFamilyName,
        familyPassword: signupFamilyPassword
      })
    });

    const data = await response.json();
    console.log(`Success: ${data}`);

    setSignupFamilyName('');
    setSignupFamilyPassword('');
  };

  return (
    <div className='changingForm'>
      {isLoginVisible ? 
          <div className='the-form-div signup-div'>
          <h1 className='signup-title form-title'>Signup Family</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Family Name: <br />
              <input type='text' name='signupFamilyName' value={signupFamilyName} onChange={e => setSignupFamilyName(e.target.value)} />
            </label>
            <label>
              Family Password: <br />
              <input type='password' name='signupFamilyPassword' value={signupFamilyPassword} onChange={e => setSignupFamilyPassword(e.target.value)} />
            </label>
            <input className='submit-btn' type='submit' value='Submit' />
          </form>
          <button className='to-btn' onClick={toggleVisibility}>To Login</button>
        </div> 
        : 
        <div className='the-form-div login-div'>
          <h1 className='login-title form-title'>Login Family</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Family Name: <br />
              <input type='text' name='loginFamilyName' />
            </label>
            <label>
              Family Password: <br />
              <input type='password' name='loginFamilyPassword' />
            </label>
            <input className='submit-btn' type='submit' value='Submit' />
          </form>
          <button className='to-btn' onClick={toggleVisibility}>To Signup</button>
      </div>}
    </div>
  );
};

export default FamilySignUpForm;