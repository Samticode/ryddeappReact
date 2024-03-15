import './Tasks.css';
import React, { useEffect, useState } from 'react';

function Tasks(props) {
    const [chores, setChores] = useState([]);


    useEffect(() => {
        async function getChores() {
            const response = await fetch('/api/undoneChores');
            let data = await response.json();

            data = data.map((chore) => {
                return {
                    choreId: chore.ChoreID,
                    choreName: chore.ChoreName,
                    choreDescription: chore.Description,
                    chorePoints: chore.Points,
                    assignedUserID: chore.AssignedUserID,
                    assignedUserName: chore.Username
                }
            });
            setChores(data);
        }
        getChores();
    }, []);


    const handleTaskSubmit = async (event, task) => {
        event.preventDefault();

        if (window.confirm('Are you sure you want to finish this task?')) {
            const response = await fetch('/api/finishChore', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    choreId: task
                })
            });

            const data = await response.json();

            if (data.message === 'Success') {
                alert('Task finished!');
                window.location.reload();
            } else {
                alert('Error finishing task');
            }
        }
    };

    const handleShowMore = async (e, choreDes) => {
        e.preventDefault();

        alert(`Task Description: \n${choreDes}`)
    };


        return ( 
            <div className='grid-child tasks-container' style={props.isParent === 0 ? { gridColumn: '10 / span 21' } : {}}>
                <h2>Tasks</h2>
                <div className='taskss-container'>
                    {chores.map((chore) => (
                        <section key={chore.choreID} className='task'>
                            <form onSubmit={(event) => handleTaskSubmit(event, chore.choreId)}>
                                <input className='input-task-name' type='text' value={`${chore.choreName}`} readOnly/>
                                <input className='input-task-point' type='text' value={`${chore.chorePoints} points`} readOnly/>
                                <div>
                                    <button onClick={(event) => handleShowMore(event, chore.choreDescription)} className='show-more-button'><i class="fa-solid fa-info"></i></button>
                                    <button type='submit'><i className="fa-solid fa-check"></i></button>
                                </div>
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
         );
    }

export default Tasks;