import { useState } from 'react'
import axios from 'axios'

const Creat = () => {
    const [task, setTask] = useState()
    const handleAdd = () => {
        axios.post('http://localhost:3000/add', { task: task })
            .then(result => {
                //reload Automatic
                location.reload()
                console.log(result)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <input className='Text_input' type='text' onChange={(e) => setTask(e.target.value)} name='Create field' placeholder='Enter Task' />
            <button className='Add_button' onClick={handleAdd}>Create</button>
        </div>
    )
}

export default Creat
