import React, { useState, useEffect } from 'react';

function Data() {

    const [backendData, setBackendData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/all')
            .then(response => response.json())
            .then(data => setBackendData(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            {(backendData.length === 0) ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {backendData.map((item, index) => (
                        <div className='user' key={index}>
                            <h2>{item.FamilyName}</h2>
                            <p>Username: {item.Username}</p>
                            <p>Email: {item.Email}</p>
                            <p>Is Parent: {item.IsParent ? 'Yes' : 'No'}</p>
                            <p>Chore: {item.ChoreName}</p>
                            <p>Description: {item.Description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Data;