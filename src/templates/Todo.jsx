import React, { useState, useEffect } from "react"
import axios from 'axios'



export default function Todos() {

    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(()=> {
fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try{
            const response = await axios.get('http://localhost:8000/api/todos/');
            setTasks(response.data)
        }catch(error){
            console.log("error: ", error);
        }
    }
    const addTask = async () => {
        try {
            if (inputValue.trim() !== '') {
                const response = await axios.post('http://localhost:8000/api/todos/add', {
                    title: inputValue,
                    completed: false
                });
                setTasks([...tasks, response.data]);
                setInputValue('');
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    // const toggleCompleted = async (taskId) => {
    //     try {
    //         const taskToUpdate = tasks.find(task=>task.id === taskId)

    //         if(taskToUpdate){

            
    //         if (inputValue.trim() !== '') {
    //             const response = await axios.put(`http://localhost:8000/api/todos/${taskId}/update`, {
    //                 completed: !taskToUpdate.completed
    //             });
    //     const updatedTasks = tasks.map(tasks =>
    //         tasks.id === taskId ? { ...tasks, completed: response.data.completed } : tasks
    //     )
    //     setTasks(updatedTasks);
    //         }
    //         }
    //     } catch (error) {
    //         console.log('error: ', error);
    //     }
    // }

    const toggleCompleted = async (taskId) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === taskId);
    
            if (!taskToUpdate) {
                alert('Task not found');
                console.log('Task not found');
                return;
            }
    
            const response = await axios.put(`http://localhost:8000/api/todos/${taskId}/update`, {
                completed: !taskToUpdate.completed
            });
    
            const updatedTask = { ...taskToUpdate, completed: response.data.completed };
            const updatedTasks = tasks.map(task => (task.id === taskId ? updatedTask : task));
    
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };
    


    const deleteTask = async (taskId) => {
        try{
            const response = await axios.delete(`http://localhost:8000/api/todos/${taskId}/delete`);
            const updatedTask = tasks.filter(task => task.id !== taskId)
            setTasks(updatedTask)
            
        }catch(error){
            console.log("error: ", error);
        }
    }

    return (
        

        <div className="container">
            <div className="todo-app">
                <div className="app-title">
                    <h2>To-Do application</h2>
                    <i className="fa-solid fa-book-bookmark"></i>
                </div>
                <div className="row">
                    <input type="text" id="input-box" placeholder="Add task"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)} />
                    <button onClick={addTask}>Add</button>
                </div>
                <ul id="list-container">
                    {tasks.map(task => (
                        <li key={task.id}
                         onClick={() => toggleCompleted(task.id)} 
                         className={task.completed ? "checked" : ''}

                         >{task.completed ? <del>{task.title}</del> : task.title}
                        <span onClick={() => deleteTask(task.id)}>X</span></li>
                    ))}
                </ul>
            </div>
            
        </div>





    )
}