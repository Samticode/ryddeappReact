import React, { useState, useEffect } from 'react';

function Data() {

    const [backendData, setBackendData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api')
            .then(response => response.json())
            .then(data => setBackendData(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            {(typeof backendData.users === 'undefined') ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <ul className='user'>
                        {backendData.users.map((user, index) => (
                            <li key={index}>{user}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Data;