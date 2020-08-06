var name=prompt('Enter Your Name');
var room=prompt('Enter room id');
document.getElementById('heading').innerHTML+=room;
var socket=io();
var peer=new Peer();

socket.on('info',(data)=>{
    store(data);
})

peer.on('open',(id)=>{
    socket.emit('room',{room:room,id:id,name:name});
    sessionStorage.setItem(id,name);
    })
    peer.on('close',()=>{
        console.log('sds')
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
   
})
function addVideo(videoElement,stream)
{   var delicon=document.createElement('img');
        delicon.src="./delicon.jpg"
        delicon.style.width="15px"
        delicon.style.height="15px"
        delicon.style.display="inline"
        delicon.style.float="right"
        delicon.style.padding="10px"
        delicon.onclick=remove;
        delicon.id="delicon";
    var div=document.createElement('div');
    div.appendChild(videoElement);
    videoElement.srcObject=stream;
    videoElement.controls="true";
    videoElement.play()
    var p=document.createElement('span');
    p.innerHTML=sessionStorage.getItem(videoElement.id);
    div.appendChild(p);
    div.appendChild(delicon);
    document.getElementById('main').appendChild(div);

    
}
function remove(e){
    document.getElementById('main').removeChild(e.srcElement.parentNode);
   
}
function store(data){

    
    // console.log(data)
    data.forEach(obj => {
        sessionStorage.setItem(obj.id,obj.name)
    });
   


}