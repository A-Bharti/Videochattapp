var name=prompt('Enter Your Name');
var room=prompt('Enter room id');
document.getElementById('heading').innerHTML+=room;

var socket=io();
var peer=new Peer();

peer.on('open',(id)=>{
    socket.emit('room',{room:room,id:id,name:name});
    sessionStorage.setItem(id,name);
    })

navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
    //adding own video
    var video=document.createElement('video');
    video.muted=true;
    addVideo(video,stream)
    //making the call
    socket.on('id',(data)=>{
        sessionStorage.setItem(data.id,data.name);
        var call=peer.call(data.id,stream);
        console.log('call made to '+ data.id)
        call.on('stream',(stream)=>{
            if(document.getElementById(data.id)===null){
            var video=document.createElement('video');
            video.id=data.id;
            addVideo(video,stream);
            
            }
        })
        

    })
    //answering the call
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
    peer.on('close',()=>{
        console.log('sds')
    })
})
function addVideo(videoElement,stream)
{   
    var div=document.createElement('div');
    div.appendChild(videoElement);
    videoElement.srcObject=stream;
    videoElement.controls="true";
    videoElement.play()
    var p=document.createElement('span');
    p.innerHTML=sessionStorage.getItem(videoElement.id);
    div.appendChild(p);
    document.getElementById('main').appendChild(div);
    
}

