const express=require('express');
const app=express();
const http=require('http').Server(app)
const io=require('socket.io')(http);


app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile('./public/index.html')
})

io.on('connection',(socket)=>{
    socket.on('id',(id)=>{
        console.log(id)
        socket.broadcast.emit('id',id);
    })
})
http.listen(process.env.PORT,()=>{
    console.log('running')
})
