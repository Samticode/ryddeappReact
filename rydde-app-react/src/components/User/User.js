import './User.css';

function User(props) {
    return (
        <div className='changingForm'>
        {isLoginVisible ? 
          // Signup form
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
          // Login form
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
}

export default User;