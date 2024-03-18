import './Profile.css'
import React, { useEffect, useState } from 'react';

function Profile(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [pfps, setPfps] = useState([]);

  const [userID, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pfp, setPfp] = useState('');

  const [taskHistory, setTaskHistory] = useState([]);

  useEffect(() => {
    async function getUserInfo() {
      const response = await fetch('/api/user');
      const data = await response.json();

      setUserInfo(data);
      setUserId(data.UserID);
      setUsername(data.Username);
      setEmail(data.Email);
      setPfp(data.ProfilePictureLink);
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    async function getAllPfp() {
      const response = await fetch('/api/pfp');
      const data = await response.json();
      setPfps(data);
      console.log(pfps);
    }
    getAllPfp();
  }, []);

  useEffect(() => {
    async function getTaskHistory() {
      const response = await fetch('/api/taskHistory');
      let data = await response.json();

      data.sort((a, b) => {
        let dateA = new Date(a.Date.split(":").reverse().join("-"));
        let dateB = new Date(b.Date.split(":").reverse().join("-"));
        return dateB - dateA;
      });

      setTaskHistory(data);
    }
    getTaskHistory();
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
  };

  const handlePfpButton = () => {
    const pfpOptionContainer = document.querySelector('.pfp-option-container');
    pfpOptionContainer.classList.toggle('active');
  };

  const handleChangePfp = async event => {
    event.preventDefault();
    
    const key = event.target.getAttribute('alt');
    console.log(key);

    const response = await fetch('/api/updatePfp', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ProfilePictureID: key
      }),
    });

    const data = await response.json();
    if (data.message === 'Success') {
      alert('Profile picture updated');
      handlePfpButton();
      window.location.reload();
    } else {
      alert(data.message);
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
          <img src={pfp} alt='alt'/>
          <div className='profile-picture-setting-div'>
            <div>
              <h2>Profile Picture</h2>
              <p>Upload a new profile picture</p>
              <button onClick={handlePfpButton}>Chose A New Picture</button>
            </div>
          </div>
        </div>

        <div className='task-history-div'>
          <h2>Task History</h2>
          <section>
            {taskHistory.map((task) => (
            <div>
              <p><span>{task.ChoreName}</span> <span>{task.Points} Points</span> <span>{task.Date}</span></p>
            </div>
            ))}

{/* 
            <div>
              <p><span>Wash my car</span> <span>32 points</span> <span>17:03:2024</span></p>
            </div>
            <div>
              <p><span>Wash my car</span> <span>32 points</span> <span>17:03:2024</span></p>
            </div>
            <div>
              <p><span>Wash my car</span> <span>32 points</span> <span>17:03:2024</span></p>
            </div>
            <div>
              <p><span>Wash my car</span> <span>32 points</span> <span>17:03:2024</span></p>
            </div>
            <div>
              <p><span>Wash my car</span> <span>32 points</span> <span>17:03:2024</span></p>
            </div> */}
          </section>
        </div>
      </div>

      <div className='pfp-option-container'>
        {pfps.map((pfp) => (
          <img onClick={handleChangePfp} key={pfp.PictureID} src={pfp.ProfilePictureLink} alt={pfp.PictureID} />
        ))}
      </div>
    </div>
  );
}

export default Profile;