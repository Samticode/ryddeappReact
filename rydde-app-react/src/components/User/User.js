import './User.css';
import React, { useState } from 'react';


function User(props) {
    const [isLoginVisible, setLoginVisible] = useState(true);
    
    const [userUsername, setUserUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userIsParent, setUserIsParent] = useState(0);

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');


    const toggleVisibility = () => {
        setLoginVisible(!isLoginVisible);
    };

    const clearInputs = () => {
        setUserUsername('');
        setUserPassword('');
        setUserEmail('');
        setUserIsParent(0);
    };

    const signupUserHandleSubmit = async event => {
        event.preventDefault();

        const response = await fetch('/api/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userUsername,
                password: userPassword,
                mail: userEmail,
                isParent: userIsParent
            })
        });

        const data = await response.json();
        if (data.message === 'Success') {
            alert('Success! Please login.');
            toggleVisibility();
        } else {
            alert(data.message);
        }

        clearInputs();

    };
    const loginUserHandleSubmit = async event => {
        event.preventDefault();

        const response = await fetch('/api/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: loginUsername,
                password: loginPassword
            })
        });

        const data = await response.json();
        if (data.message === 'Success') {
            alert('Success!');
            props.setSiteNumber(3);
        } else {
            alert(data.message);
        }
    };


    return (
        <div className='changingForm'>
        {isLoginVisible ? 
          // Signup form
          <div className='the-form-div signup-div'>
            <h1 className='signup-title form-title'>Signup User</h1>
            <form onSubmit={signupUserHandleSubmit}>
                <label>
                    Username: <br />
                    <input required type='text' name='userUsername' placeholder='Username' value={userUsername} onChange={e => setUserUsername(e.target.value)}/>
                </label>
                <label>
                    Password: <br />
                    <input required type='password' name='userPassword' placeholder='Password' value={userPassword} onChange={e => setUserPassword(e.target.value)}/>
                </label>
                <label>
                    Email: <br />
                    <input required type='text' name='userEmail' placeholder='Email' value={userEmail} onChange={e => setUserEmail(e.target.value)}/>
                </label>
                <label>
                    Parent:
                    <input type='checkbox' name='userIsParent' checked={userIsParent === 1} onChange={e => setUserIsParent(e.target.checked ? 1 : 0)}/>
                </label>
            <input className='submit-btn' type='submit' value='Submit' />
            </form>
            <button className='to-btn' onClick={toggleVisibility}>To Login</button>
          </div> 
          : 
          // Login form
          <div className='the-form-div login-div'>
            <h1 className='login-title form-title'>Login User</h1>
            <form onSubmit={loginUserHandleSubmit}>
                <label>
                    Username: <br />
                    <input type='text' name='loginUserUsername' placeholder='Username' value={loginUsername} onChange={e => setLoginUsername(e.target.value)}/>
                </label>
                <label>
                    Password: <br />
                    <input type='password' name='loginUserPassword' placeholder='Password' value={loginPassword} onChange={e => setLoginPassword(e.target.value)}/>
                </label>
            <input className='submit-btn' type='submit' value='Submit' />
            </form>
            <button className='to-btn' onClick={toggleVisibility}>To Signup</button>
          </div>}
      </div>
    );
}

export default User;