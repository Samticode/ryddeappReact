import './Homepage.css'
import React, { useEffect, useState } from 'react';


function Homepage(props) {
    const [userInfo, setUserInfo] = useState(null);
    const [pfps, setPfps] = useState([]);
  
    const [userID, setUserId] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pfp, setPfp] = useState('');


    useEffect(() => {
        async function getUserInfo() {
            const response = await fetch('/api/user');
            const data = await response.json();

            console.log(data);

            setUserInfo(data);
            setUserId(data.UserID);
            setUsername(data.Username);
            setEmail(data.Email);
            setPfp(data.ProfilePictureLink);
        }
        getUserInfo();
    }, []);



    return(
        <>
            <div className='homepage-main-section'>
                <h1 className='hompage-h1'>Welcome Back {username}</h1>
                <section className='tie-grid-container'>
                   <div className='grid-child leaderboard-container'>
                        <h2>Leaderboard</h2>

                        <p>1. Brown foxerman</p>
                        <p>2. Brown foxerman</p>
                        <p>3. Brown foxerman</p>
                        <p>4. Brown foxerman</p>
                        <p>5. Brown foxerman</p>
                   </div>
                   <div className='grid-child tasks-container'>
                        <h2>Tasks</h2>
                        <div className='tasks-container'>

                        </div>
                   </div>
                </section>
            </div>
        </>
    )
}

export default Homepage;