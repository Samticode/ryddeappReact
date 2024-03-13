import React, { useState } from 'react';
import './NewTask.css';

function NewTask() {
    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => {
        setIsActive(!isActive);
    };


    const handleNewTask = async (event) => {
        event.preventDefault();
        
        const response = await fetch('/api/createChore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task: event.target.taskName.value,
                description: event.target.taskDescription.value,
                points: parseInt(event.target.taskPoints.value)
            })
        });

        const data = await response.json();

        if (data.message === 'Success') {
            alert('New Task Added!');
            event.target.taskName.value = '';
            event.target.taskDescription.value = '';
            event.target.taskPoints.value = '';

            toggleActive();
        } else {
            alert('Error Adding Task');
        }
    };

    return ( 
        <>
            <div className={`new-task-container ${isActive ? 'active' : ''}`}>
                <form onSubmit={handleNewTask}>
                    <h2>Add a New Task</h2>
                    <div>
                        <input name='taskName' type='text' placeholder='Task Name' required/><br />
                        <input name='taskDescription' type='text' placeholder='Task Description' required/><br />
                        <input name='taskPoints' type='text' placeholder='Task Points' required/> <br />
                    </div>
                    <button type='submit' >Add New Task</button>
                </form>
            </div>

            <button className='btn-style new-task-button' onClick={toggleActive}>New Task</button>
            <button className='btn-style edit-task-button' >Edit Task</button>
        </>
     );
}

export default NewTask;