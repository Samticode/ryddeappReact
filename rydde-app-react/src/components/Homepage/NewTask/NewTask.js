import React, { useState, useEffect } from 'react';
import './NewTask.css';

function NewTask(props) {
    const [isActive, setIsActive] = useState(false);
    const [whichTaskScreen, setWhichTaskScreen] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState({});

    const toggleActive = () => {
        setIsActive(!isActive);
    };


    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/undoneChores');
            const data = await response.json();
            setTasks(data);
        };

        fetchTasks();
    }, []);


    const handleRowClick = (task) => {
        setSelectedTask(task);
        console.log(selectedTask)
    };

    const handleInputChange = (event) => {
        setSelectedTask({
            ...selectedTask,
            [event.target.name]: event.target.value,
        });
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
            window.location.reload();
            props.setSiteNumber(4);
        } else {
            alert('Error Adding Task');
        }
    };

    const handleEditTask = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/editChore', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                choreId: parseInt(selectedTask.ChoreID),
                task: selectedTask.ChoreName,
                description: selectedTask.Description,
                points: parseInt(selectedTask.Points)
            })
        });

        const data = await response.json();

        if (data.message === 'Success') {
            alert('Task Edited!');
            toggleActive();
            window.location.reload();
        } else {
            alert('Error Editing Task');
        }
    };

    const handleDeleteTask = async (event) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            event.preventDefault();
            
            const response = await fetch('/api/deleteChore', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    choreId: selectedTask.ChoreID
                })
            });
            
            const data = await response.json();
            
            if (data.message === 'Success') {
                alert('Task Deleted!');
                toggleActive();
                window.location.reload();
            } else {
                alert('Error Deleting Task');
            }
        }
    };
    

    return ( 
        <>
            <div className={`new-task-container ${isActive ? 'active' : ''}`}>
                <form onSubmit={handleNewTask} style={whichTaskScreen === 0 ? { display : 'none' } : {}}>
                    <h2>Add a New Task</h2>
                    <div>
                        <input name='taskName' type='text' placeholder='Task Name' required/><br />
                        <input name='taskDescription' type='text' placeholder='Task Description' required/><br />
                        <input name='taskPoints' type='text' placeholder='Task Points' required/> <br />
                    </div>
                    <button type='submit'>Add New Task</button>
                </form>
                <section className='edit-task-screen' style={whichTaskScreen === 1 ? { display : 'none' } : {}}>
                <div className='edit-panel-div'>
                    <h2>Edit Task</h2>
                    <form className='edit-task-form' onSubmit={handleEditTask}>
                        <input type='number' name='ChoreID' value={selectedTask.ChoreID} style={{ display : 'none' }} readOnly/>
                        <input type='text' placeholder='Task Name' name='ChoreName' value={selectedTask.ChoreName} onChange={handleInputChange} required/><br />
                        <input type='text' placeholder='Task Description' name='Description' value={selectedTask.Description} onChange={handleInputChange} required/><br />
                        <input type='text' placeholder='Task Points' name='Points' value={selectedTask.Points} onChange={handleInputChange} required/> <br />

                        <button type='submit'>Edit Task</button>
                        <button type='button' className='btn-delete' onClick={handleDeleteTask}>Delete</button>
                    </form>
                </div>
                    <div className='view-task-div'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Task Name</th>
                                    <th>Task Description</th>
                                    <th>Task Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr className='body-table-row' onClick={() => handleRowClick(task)} key={task.ChoreID}>
                                        <td>{task.ChoreName}</td>
                                        <td>{task.Description}</td>
                                        <td>{task.Points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <button className='btn-style new-task-button' onClick={() => { setWhichTaskScreen(1); toggleActive(); }}>New Task</button>
            <button className='btn-style edit-task-button' onClick={() => { setWhichTaskScreen(0); toggleActive(); }}>Edit Task</button>
        </>
     );
}

export default NewTask;