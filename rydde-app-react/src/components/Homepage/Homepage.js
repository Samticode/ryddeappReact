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

    const [chores, setChores] = useState([]);


    // useEffect(() => {
    //     async function getUserInfo() {
    //         const response = await fetch('/api/user');
    //         const data = await response.json();

    //         console.log(data);

    //         setUserInfo(data);
    //         setUserId(data.UserID);
    //         setUsername(data.Username);
    //         setEmail(data.Email);
    //         setPfp(data.ProfilePictureLink);
    //     }
    //     getUserInfo();
    // }, []);

    useEffect(() => {
        async function getChores() {
            const response = await fetch('/api/undoneChores');
            let data = await response.json();

            data = data.map((chore) => {
                return {
                    choreId: chore.ChoreID,
                    choreName: chore.ChoreName,
                    choreDescription: chore.Description,
                    assignedUserID: chore.AssignedUserID,
                    assignedUserName: chore.Username
                }
            });
            console.log(data);
            setChores(data);
        }
        getChores();
    }, []);



    const handleTaskSubmit = async (event, task) => {
        event.preventDefault();

        console.log(task);
    };


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
                            {chores.map((chore) => (
                                <section key={chore.choreID} className='task'>
                                    <form onSubmit={(event) => handleTaskSubmit(event, chore.choreId)}>
                                        <input type='text' value={chore.choreName} readOnly/>
                                        <button type='submit'><i className="fa-solid fa-check"></i></button>
                                    </form>
                                </section>
                            ))}
                            {/* <section className='task'>
                                <form onSubmit={handleTaskSubmit}>
                                    <input type='text' value={'Wash man'} readOnly/>

                                    <button type='submit'><i class="fa-solid fa-check"></i></button>
                                </form>
                            </section> */}
                        </div>
                   </div>
                </section>
            </div>
        </>
    )
}

export default Homepage;