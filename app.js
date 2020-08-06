const express=require('express');
const app=express();
const http=require('http').Server(app)
const io=require('socket.io')(http);


app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile('./public/index.html')
})
var info=[{id:"testid",name:"testname"}];
io.on('connection',(socket)=>{

    socket.on('room',(data)=>{

        socket.join(data.room);
        info.push({id:data.id,name:data.name});
        socket.emit('info',info);

        socket.to(data.room).broadcast.emit('id',{id:data.id,name:data.name});

    })
})
http.listen(process.env.PORT || 3000,()=>{
    console.log('running')
})
