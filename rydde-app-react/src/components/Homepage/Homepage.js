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

            console.log(data); // Log the user information

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
            </div>
        </>
    )
}

export default Homepage;