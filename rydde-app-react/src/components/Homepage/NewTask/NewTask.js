import React, { useState } from 'react';
import './NewTask.css';

function NewTask() {
    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    
    return ( 
        <>
            <button className='btnbtn' onClick={toggleActive}>new task</button>

            <div className={`new-task-container ${isActive ? 'active' : ''}`}></div>
        </>
     );
}

export default NewTask;