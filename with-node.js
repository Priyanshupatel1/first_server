//server creation .
//basic server very minimal .
const http = require("http"); //require keyworrd useed to import all the mnodules that are being used .
const toDoList = ["Need to learn", "Need to code"];

//http method

// GET => GETTING certain details from server pass this request on browser .
// PUT => ovewrite ,fully update .
// DELETE => deleting  data from server .
// PATCH => update very few fields / certain fields .
// POST => sending to the server .  
const port = 8081;// this is free port make sure that port is free and not engaged . 
const server = http.createServer((req, res) => {// user can use anything .
    // res.writeHead(200,{"Content-Type": "text/html"});// 200 is the statius/indication code of succesfully made server .
    // respose me content ka kya type hai voh lega ("Content-Type": "text/html") .

    // res.write("<h4>hello Priyanshu, this is new server</h4>");//when user use key within object then dot operator .
    // res.end();//end response .

    const { method, url } = req;//two things required to deal with routes .
    // console.log(method , url);
    // res.end();
    if (url === "/todos") {
        // http://localhost:8081/todos

        if (method === "GET") {//is condtion pe run krega .
            res.writeHead(200, { "Content-Type": "text/html" }); // when content type not given then then black background . 
            res.write(toDoList.toString());//string value kr dega and show krega .

        }
        else if (method === "POST") {
            let body = "";//variable
            req.on('error', (err) => {//on means whenever it get triggered;
                console.log(err);
            }).on('data', (chunk) => {   // body = body + chunk;
                body += chunk;//body me append krega
                console.log("chunk of data : ", chunk);//chunk is the data which is sent in body
            }).on('end', () => {
                body = JSON.parse(body);//isko human understable form me convert kr rhe hai //string conversion;
                //console.log("body data", body) 
                let newToDo = toDoList;
                newToDo.push(body.item);
                console.log(newToDo);
            });
            // res.writeHead(501);
        }

        //deletion
        else if(method ==="DELETE"){
            let body = ""; //string format .
            req.on("error",(err)=> {
                console.error(err);
            });
            req.on("data",(chunk)=>{
                body+=chunk;
                     });

           req.on("end",()=>{
                body =JSON.parse(body);
                let deleteItem = body.item;
                for(let i= 0; i<toDoList.length ; i++){
                    if(toDoList[i]===deleteItem){
                        toDoList.splice(i,1);
                        break;
                    }
                }
                res.writeHead(204);
            });


        }

        else {//error message show krne ke lie .
            res.writeHead(501);//server response should be with writehead .
        }
    }
    else {
        res.writeHead(404);
    }
    res.end();
}); 

server.listen(port, () => {//continuously listen to all the changes user makes .
    console.log(`my Nodejs sever started on port ${port}`);
});

//routing from one file to other . 
// http://localhost:8081 .
// http://localhost:8081/ .
// http://localhost:8081/home .
// http://localhost:8081/aboutUs .    => navigation
// http://localhost:8081/contactUs .

//cntrl + c se server end kr dega .



//CSR => client side rendering .
//Url : http://localhost:8081 (req) .
//Server side data (res) .

//SSR server side render .
