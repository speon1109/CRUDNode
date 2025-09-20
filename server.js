import express from 'express';
import { resForErrors, resForSuccess } from './helpers';
const server= express();
server.use(express.json());
//tasks array
const tasks = [
  { id: 1, title: "Learn Express", completed: false },
  { id: 2, title: "Build a CRUD API", completed: false },
];
//end of tasks array

let newId= tasks.length ? tasks[tasks.length-1].id+1:1; //formula for newId

//get all
server.get('/tasks',(req,res)=>{
    if(tasks.length===0){
        return resForErrors(res,200);
    }
        return resForSuccess(res,200,{tasks});
});
//end of get all

//get id
server.get('/tasks/:id',(req,res)=>{
    const id= Number(req.params.id);
    const index= tasks.find((key)=> key.id === id); 
    if(!index){
        return resForErrors(res,404);
    }
    return resForSuccess(res,200,{index});
});
//end of get id

//post
server.post('/tasks',(req,res)=>{
    const {title} = req.body;
    if(!title){
        return resForErrors(res,400);
    }
    const newTask= {
        id: newId,
        title,
        completed: false
    };

    tasks.push(newTask);
    newId++;
    return resForSuccess(res,201,{newTask});
});
//end of post

//put
server.put('/tasks/:id',(req,res)=>{
    const id= Number(req.params.id);
    const index= tasks.find((key)=> key.id=== id);
    if(!index){
        return resForErrors(res,404);
    }
    const {title, completed}= req.body;
    if(title === undefined || completed === undefined){
        return resForErrors(res,400);
    }
    index.title= title;
    index.completed= completed;
    return resForSuccess(res, 200, {index});
});
//end of put

//patch
server.patch('/tasks/:id',(req,res)=>{
    const id= Number(req.params.id);
    const index= tasks.find((key)=> key.id===id);
    if(!index){
        return resForErrors(res,404);
    }
    const {title, completed}= req.body;
    if(title!==undefined) index.title= title;
    if(completed!==undefined) index.completed= completed;
    return resForSuccess(res, 200, {index});
});
//end of patch

server.delete('/tasks/:id',(req,res)=>{
    const id= Number(req.params.id);
    const index= tasks.findIndex((key)=>key.id===id);
    if(index===-1) return resForErrors(res,404);
    const deletedTask= tasks.splice(index,1)[0];
    return resForSuccess(res, 200, {deletedTask});
});

//server activation
server.listen(3000,()=>{
    console.log("Running on port 3000 now.");
});
//end 
