// const SimplePeer = require("simple-peer");

var socket=io();
var peer=new Peer();


peer.on('open',(id)=>{
    console.log(id);
    socket.emit('id',id);
})


socket.on('id',(id)=>{
   var conn= peer.connect(id);


   navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
    var call=peer.call(id,stream);
    console.log('call made')
    call.on('stream',(stream)=>{
        addVideo(stream);
    })

   })
   conn.on('open',()=>{
       console.log(id);
       conn.send('hiiii working')
   })
})

peer.on('connection',(co)=>{
    co.on('data',(data)=>{
        console.log(data)
    })
})

peer.on('call',(call)=>{
    console.log("call came")
    call.on('stream',(stream)=>{
        addVideo(stream);
    })
        navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
            call.answer(stream);
            
        })
})
function addVideo(stream)
{
   
        var video=document.createElement('video');
        document.body.appendChild(video)
        video.srcObject=stream;
        video.play();
}