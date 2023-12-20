import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import Create from './Create';
import axios from 'axios';
import { BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import { FaEdit, FaCircle } from "react-icons/fa";
import { toast } from 'react-toastify';


const Home = () => {
    const [todos, setTodos] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [updatedValue, setUpdatedValue] = useState('');
    const [popupTodoId, setPopupTodoId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        axios.get('https://mern-todolist-rvav.onrender.com/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);




    const handleEdit = (id, currentDoneStatus) => {
        const updatedDoneStatus = !currentDoneStatus;
        axios
            .put(`https://mern-todolist-rvav.onrender.com/update/${id}`, { done: updatedDoneStatus })
            .then(result => {
                console.log(result);
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo._id === id ? { ...todo, done: updatedDoneStatus } : todo
                    )
                );
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios
            .delete(`https://mern-todolist-rvav.onrender.com/delete/${id}`)
            .then(result => {
                console.log(result);
                setTodos(prevTodos =>
                    prevTodos.filter(todo => todo._id !== id)
                );
            })
            .catch(err => console.log(err));
    };

    const handleEditPopup = (id) => {
        setUpdatedValue('');
        setPopupTodoId(id);
        setShowPopup(true);
        setIsModalOpen(true);

    };


    const handleUpdate = () => {
        if (updatedValue === '') {
            toast.error("Update task can't be empty");
            return;
        }
        axios
            .put(`https://mern-todolist-rvav.onrender.com/popup/${popupTodoId}`, { task: updatedValue })
            .then(result => {
                console.log(result);
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo._id === popupTodoId ? { ...todo, task: updatedValue } : todo
                    )
                );
                setShowPopup(false);
            })
            .catch(err => console.log(err));
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setIsModalOpen(false);

    };

    return (
        <div className='home mt-5'>
            <h2 className='mb-5'>TODO List</h2>
            <Create />
            {todos.length === 0 ? (
                <div>
                    <h3>No Tasks</h3>
                </div>
            ) : (
                todos.map((todo, index) => (
                    <div key={index} className='Task_Added'>
                        <div className='Check_box' onClick={() => handleEdit(todo._id, todo.done)}>
                            {todo.done ? (
                                <BsFillCheckCircleFill className='icon' />
                            ) : (
                                <FaCircle className='icon' />
                            )}
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span className='span popup-btn'>
                                <FaEdit onClick={() => handleEditPopup(todo._id)} className='icon' />
                            </span>
                            <span className='span'>
                                <BsFillTrashFill onClick={() => handleDelete(todo._id)} className='icon' />
                            </span>
                        </div>
                    </div>
                ))
            )}
            {showPopup && (
                <Modal className='text-center' title="Update Task" open={isModalOpen} onOk={handleUpdate} onCancel={handleClosePopup}>
                    <input
                        type="text"
                        value={updatedValue}
                        onChange={(e) => setUpdatedValue(e.target.value)}
                    />
                </Modal>
            )}
        </div>
    );
};

export default Home;