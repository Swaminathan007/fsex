const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test1")
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {console.log("Error" + err);});

const todoSchema = new mongoose.Schema({
    task:String,
    dueDate:Date,
    isFinished:Boolean
});

const todo = mongoose.model('Todo',todoSchema);

app.get("/",async (req,res)=>{
    const todos = await todo.find();
    res.send({todos:todos});
});

app.post("/",async (req,res)=>{
    let task = req.body.task;
    let due = req.body.date;

    let newTodo = new todo({
        task:task,
        dueDate:due,
        isFinished:false
    });
    await newTodo.save();
    const todos = await todo.find();
    res.send({todos:todos});
});
app.listen(5000,()=>{console.log("App listening on 5000");});