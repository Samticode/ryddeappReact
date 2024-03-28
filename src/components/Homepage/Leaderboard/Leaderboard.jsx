import './Leaderboard.css';
import { useEffect, useState } from "react";

function Leaderboard(props) {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        async function getLeaderboard() {
            const response = await fetch('/api/familyPoints');
            let data = await response.json();

            data = data.sort((a, b) => b.TotalPoints - a.TotalPoints);

            console.log(data);
            setLeaderboardData(data);
        }
        getLeaderboard();
    }, []);


    return ( 
        <div className='grid-child leaderboard-container'>
            <h2>Leaderboard</h2>


            {leaderboardData.map((user, index) => {
                return (
                    <p>
                        <img src={user.ProfilePictureLink ? user.ProfilePictureLink : "https://images.floorforce.com/Textures/13598/Ceramic-and-Porcelain/b6b2b11c-04cb-4eb9-89e4-b39132c308d4/Images/V55908351100226249_500x500.jpg"} alt="Profile Picture" />
                        {user.Username} - {user.TotalPoints} points
                    </p>
                )
            })}
        </div>
     );
}

export default Leaderboard;