import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
    const [task, setTask] = useState('');

    const handleAdd = () => {
        axios
            .post('https://mern-todolist-rvav.onrender.com/add', { task: task })
            .then((result) => {
                // Reload the page automatically
                location.reload();
                console.log(result);
            })
            .catch((err) => console.log(err));
        };
        
        const notify = () => toast.error('Please Fill the Field');

    const bothFunction = () => {
        if (task === '') {
            notify();
        }
        handleAdd();
    };

    return (
        <div>
            <input
                className='Text_input'
                type='text'
                onChange={(e) => setTask(e.target.value)}
                name='Create field'
                placeholder='Enter Task'
            />
            <button className='Add_button' onClick={bothFunction}>
                Create
            </button>
            <ToastContainer />
        </div>
    );
};

export default Create;