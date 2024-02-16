import './FamilySignUpForn.css';
import React, { useState } from 'react';

function FamilySignUpForm() {
  const [isLoginVisible, setLoginVisible] = useState(true);

  const [signupFamilyName, setSignupFamilyName] = useState('');
  const [signupFamilyPassword, setSignupFamilyPassword] = useState('');

  const [loginFamilyName, setLoginFamilyName] = useState('');
  const [loginFamilyPassword, setLoginFamilyPassword] = useState('');


  const toggleVisibility = () => {
    setLoginVisible(!isLoginVisible);
  };

  const signupHandleSubmit = async event => {
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

  const loginHandleSubmit = async event => {
    event.preventDefault();

    console.log('loginHandleSubmit');
  };

  return (
    <div className='changingForm'>
      {isLoginVisible ? 
        <div className='the-form-div signup-div'>
          <h1 className='signup-title form-title'>Signup Family</h1>
          <form onSubmit={signupHandleSubmit}>
            <label>
              Family Name: <br />
              <input required type='text' name='signupFamilyName' value={signupFamilyName} onChange={e => setSignupFamilyName(e.target.value)} />
            </label>
            <label>
              Family Password: <br />
              <input required type='password' name='signupFamilyPassword' value={signupFamilyPassword} onChange={e => setSignupFamilyPassword(e.target.value)} />
            </label>
            <input className='submit-btn' type='submit' value='Submit' />
          </form>
          <button className='to-btn' onClick={toggleVisibility}>To Login</button>
        </div> 
        : 
        <div className='the-form-div login-div'>
          <h1 className='login-title form-title'>Login Family</h1>
          <form onSubmit={loginHandleSubmit}>
            <label>
              Family Name: <br />
              <input required type='text' name='loginFamilyName'  value={loginFamilyName} onChange={e => setLoginFamilyName(e.target.value)}/>
            </label>
            <label>
              Family Password: <br />
              <input required type='password' name='loginFamilyPassword' value={loginFamilyPassword} onChange={e => setLoginFamilyPassword(e.target.value)}/>
            </label>
            <input className='submit-btn' type='submit' value='Submit' />
          </form>
          <button className='to-btn' onClick={toggleVisibility}>To Signup</button>
        </div>}
    </div>
  );
};

export default FamilySignUpForm;