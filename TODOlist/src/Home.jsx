import { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";


const Home = () => {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleEdit = (id, currentDoneStatus) => {
        const updatedDoneStatus = !currentDoneStatus;
        axios
            .put(`http://localhost:3000/update/${id}`, { done: updatedDoneStatus })
            .then(result => {
                console.log(result);
                setTodos(prevTodos => prevTodos.map(todo => todo._id === id ? { ...todo, done: updatedDoneStatus } : todo)
                );
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3000/delete/${id}`)
            .then(result => {
                console.log(result);
                // prevent reload
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h2>TODO List</h2>
            <Create />
            {todos.length === 0 ? (
                <div>
                    <h3>No Tasks</h3>
                </div>
            ) : (
                todos.map((todo, index) => (
                    <div key={index} className='Task_Added'>
                        <div className='Check_box' onClick={() => handleEdit(todo._id)}>
                            {todo.done ?
                                <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                                :
                                <FaCircle className='icon' />
                            }
                            <p className={todo.done ? "line_through" : ""}>   {todo.task}</p>
                        </div>
                        <div>
                            <span className='span'><BsFillTrashFill onClick={() => handleDelete(todo._id)} className='icon' /> </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;