var express = require('express');

var app=express();
var http2 = require('http');
var http=http2.Server(app);

app.use(express.static('public'));

var temp = require('socket.io');

var io=temp(http);

app.get('/', function(req, res){
  res.sendFile(__dirname +'/public/login.html');
});


/* io.on('connection',(socket)=>{
    
     socket.broadcast.emit('hi a new socket joined');
    
})

*/

var activeusers=[];

var room_namespace=io.of('/room');

room_namespace.on('connection',(socket)=>{
  
  
  
   socket.on('chat message', (msg)=>{
     
  var currentuser =  activeusers.filter((element,index)=>{
     
     if (element.id===socket.id){
       
       return true;
     }
     else{
       return false;
       
     }
   });
   console.log(socket.id);
   console.log(activeusers[0]);
//   console.log(currentuser[0]);
   
   
//   var currentusername=currentuser[0].nick;
   
  //s console.log(currentusername);
   
     
    console.log('message: ' + msg);
    
    
  //  io.emit('chat message', msg);
   io.of('/room').emit('chat message',msg);
   
    
  });
  


  
  socket.on('disconnect',()=>{
    
    
    
      
      io.emit('chat message','a user got disconnected');
      
      
      console.log('user disconnected');
      
  })
  
  
});



var login_namespace=io.of('/login');


login_namespace.on('connection',(socket)=>{
  
  console.log('login test');
  
    
socket.on('name',(name)=>{
  
  
  
 if (  activeusers.indexOf(name) > -1 ) {
  
  // send a message he cant join
  console.log('sorry a user with that name is already registered');
  
  
  
}

else {
  
   io.of('/room').emit('chat message', name + ' has joined  ');
  
 //  console.log(name + ' has connected');
  
   activeusers.push({
     
     nick:name,
     id:socket.id
     
   });
  //console.log(' active users are now ' + activeusers);
  
  console.log(name + ' has joined');
  
  
}
  
 
  
});
  
  
 
  
});




http.listen(3000, function(){
  console.log('listening on *:3000');
});