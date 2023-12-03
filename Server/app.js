const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require("cors")
const TodoModel = require("./Models/Todo")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://zezofalcon01:AZ01007488071az@dbbackend.jzoz9jx.mongodb.net/zezo')

// Read Tasks
app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})


//Add Tasks
app.post('/add', (req, res) => {
    const task = req.body.task;
    if (!task) {
        // If the task is empty
        return res.status(400).json({ error: 'Task is required' });
    }
    TodoModel.create({
        task: task
    })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

//Update Tasks
app.put('/update/:id', (req, res) => {
    const { id } = req.params
    TodoModel.findByIdAndUpdate({ _id: id }, { done: req.body.done })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

//Delete Tasks
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.listen(80, () => {
    console.log("Server Is Running ")
})
