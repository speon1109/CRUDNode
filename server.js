import express from 'express';
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
        return res.json({message: "There are currently no tasks."});
    }
        return res.json(tasks);
});
//end of get all

//get id
server.get('/tasks/:id',(req,res)=>{
    const id= Number(req.params.id);
    const index= tasks.find((key)=> key.id === id); 
    if(!index){
        return res.status(404).json({message: `Task with ${id} can't be found`});
    }
    return res.json({message: `Here's what we found on id: ${id}`, task: index});
});
//end of get id

//post
server.post('/tasks',(req,res)=>{
    const {title} = req.body;
    if(!title){
        return res.status(400).json({message: "A title is requred"});
    }
    const newTask= {
        id: newId,
        title,
        completed: false
    };

    tasks.push(newTask);
    newId++;
    return res.status(201).json(newTask);
});
//end of post

//put
server.put('/tasks/:id',(req,res)=>{
    const id= Number(req.params.id);
    const index= tasks.find((key)=> key.id=== id);
    if(!index){
        return res.status(404).json({message: `Sorry, that id: ${id} doesn't exist.`});
    }
    const {title, completed}= req.body;
    if(title === undefined || completed === undefined){
        return res.status(400).json({message: "Title and Completed are required to be changed for the PUT action."});
    }
    index.title= title;
    index.completed= completed;
    res.status(201).json({message: "Sucessful, bruh.", task: index})
});

//server activation
server.listen(3000,()=>{
    console.log("Running on port 3000 now.");
});
//end 
