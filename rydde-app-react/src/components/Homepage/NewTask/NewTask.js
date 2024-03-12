import React, { useState } from 'react';
import './NewTask.css';

function NewTask() {
    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => {
        setIsActive(!isActive);
    };


    const handleNewTask = async (event) => {
        event.preventDefault();
        
        const body = {
            task: event.target.taskName.value
        };
        alert('Task: ' + body.task);
    };

    return ( 
        <>
            <div className={`new-task-container ${isActive ? 'active' : ''}`}>
                <form onSubmit={handleNewTask}>
                    <input name='taskName' type='text' placeholder='Task Name' required/><br />
                    <input name='taskDescription' type='text' placeholder='Task Description' required/><br />
                    <input name='taskPoints' type='number' placeholder='Task Points' required/> <br />
                    <input type='submit' />
                </form>
            </div>

            <button className='new-task-button' onClick={toggleActive}>New Task</button>
        </>
     );
}

export default NewTask;