const express = require('express');

const app = express();//app ko access krke express ke sare modules use kar skte . 

//appln will now use json format for the data transfer
app.use(express.json());
//const hostname = "priyanshu";
const port = 8081;

const toDoList = ["Need to learn", "Need to code"];

//http://localhost:8081/todos 

app.get("/todos" , (req,res) =>{
    res.status(200).send(toDoList);
    });

    app.post("/todos",(req,res)=> {
 let newToDoItem = req.body.item;
 toDoList.push(newToDoItem);
 res.status(201).send({
    message  : "the to do get added got succesfuly"
 });
    });
app.delete("/todos",(req,res) =>{
    let itemToDelete = req.body.item;

    toDoList.find((element,index)=>{
        if(element === itemToDelete){
            toDoList.splice(index,1);
        }
    });
    res.status(201).send({message : `deleted item ${req.body.item}`,});//204 is for no content is does not shows any content
});
//one route which will handle all the routes which are not explicitly mentioned
app.all("/todos",(req,res)=>{
    res.status(501).send({
        message : "THIS METHOD IS NOT IMPLEMENTED"
    });
});

app.all("*",(req,res)=>{//" * " this here repesents everything other than "/todos"
    res.status(404).send();//this error code holds priority here id stated at the top it wont allow anything but state only error message
});



    app.listen(port ,()=>{
        console.log(`node js server started at ${port}`)
    });