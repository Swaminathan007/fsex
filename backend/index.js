const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const arr = [];

app.get('/',(req,res)=>{
    res.json({message:"Hello world",arr:arr});
});

app.get('/api',(req,res)=>{
    res.json({message:"Hello world from api"});
});

app.get("/:idx",(req,res)=>{
    let idx = parseInt(req.params.idx);
    if(idx >= 0 && idx < arr.length){
        res.json({ele:arr[idx]});
    }
    else{
        res.json({ele:"Out of bounds"});
    }
});

app.post("/",(req,res)=>{
    let ele = parseInt(req.body.num);
    arr.push(ele);
    res.json({message:"Element added",arr:arr});
});
app.put("/:idx",(req,res)=>{
    let idx = parseInt(req.params.idx);
    let ele = parseInt(req.body.num);
    console.log(ele)
    arr[idx] = ele;
    res.json({message:"Element updated",arr:arr});
});
app.delete("/:idx",(req,res)=>{
    let idx = parseInt(req.params.idx);
    arr.splice(idx,1);
    res.json({message:"Element deleted",arr:arr});
})
app.listen(5000,()=>{console.log("App listening on 5000");});
