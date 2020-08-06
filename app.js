const express=require('express');
const app=express();
const http=require('http').Server(app)
const io=require('socket.io')(http);


app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile('./public/index.html')
})

io.on('connection',(socket)=>{
    socket.on('room',(data)=>{
        console.log(data)
        socket.join(data.room);
        // io.sockets.in(data.room).emit('id',data.id)
        socket.to(data.room).broadcast.emit('id',data.id);

    })
})
http.listen(process.env.PORT,()=>{
    console.log('running')
})
