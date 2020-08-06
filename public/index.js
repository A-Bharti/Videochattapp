var name=prompt('Enter Your Name');
var room=prompt('Enter room id');

var socket=io();
var peer=new Peer();

peer.on('open',(id)=>{
    console.log('myid ',id);
    socket.emit('room',{room:room,id:id});
    })

socket.on('id',(id)=>{
   navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
    
    var call=peer.call(id,stream);
    console.log('call made to '+ id)
    call.on('stream',(stream)=>{
        if(document.getElementById(id)===null){
        console.log('caller called ->')
        var video=document.createElement('video');
        video.id=id;
        addVideo(video,stream);
        }
    })

   })
})


peer.on('call',(call)=>{
    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
        call.answer(stream);
    })
        call.on('stream',(callerstream)=>{
            if(document.getElementById(call.peer)===null){
            var video=document.createElement('video');
            video.id=call.peer;
            addVideo(video,callerstream);
            }
         })
                
        
})


function addVideo(videoElement,stream)
{   
    document.body.appendChild(videoElement)
    videoElement.srcObject=stream;
    videoElement.controls="true";
    videoElement.play()
    
}

