import './Profile.css'
import React, { useEffect, useState } from 'react';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [userID, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function getUserInfo() {
      const response = await fetch('/api/user');
      const data = await response.json();
      setUserInfo(data);
      setUserId(data.UserID);
      setUsername(data.Username);
      setEmail(data.Email);

    }
    getUserInfo();
  }, []);

  const handleUpdateSubmit = async e => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to update your info?")) { 
      const response = await fetch('/api/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserID: userID,
          Username: username,
          Email: email,
          Password: password
        }),
      });
      const data = await response.json();
      if (data.message === 'Success') {
        alert('User info updated');
      } else {
        alert(data.message);
      }
    } else {

    }

  }


  return (
    <div className="profile-section">
      <h1>Profile</h1>
      <div className="tile-grid-container">
        <form className='user-info-div' onSubmit={handleUpdateSubmit}>
          {userInfo && (
            <>
              <label>Username:<br /> <input name='updateUsername' type='text' value={username} onChange={e => setUsername(e.target.value)}/></label>
              <label>Email:<br /> <input name='updateEmail' type='text' value={email} onChange={e => setEmail(e.target.value)}/></label>
              <label>Password:<br /> <input name='updatePassword' type='text' value={password} onChange={e => setPassword(e.target.value)}/></label>
              <label>Family:<br /> <input readOnly name='' type='text' value={userInfo.FamilyName}/></label>
              <div></div>
              <input name='submit-update' type='submit' value='Update Info'/>
            </>
          )}
        </form>

        <div className='profile-picture-div'>
            <img src='https://f4.bcbits.com/img/a0278225955_65'/>
            <div className='profile-picture-setting-div'>

            </div>
        </div>

        <div className='email-test-div'>
          <div>
            <h2>Test Email</h2>
            <p>Send a test email to your email address to verify that it is correct.</p>
          </div>
          <button>Send Test Email</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;