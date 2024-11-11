const socket=io();
if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const{latitude,longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude});
    },(error)=>{
        console.error(error);
    },{
        enableHighAccuracy:true,
        maximumAge:0,
        timeout:3000
    });
     
}
const map = L.map("map").setView([0,0], 16);  
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: 's'
}).addTo(map);
const markers={};
socket.on("recive-location",(data)=>{
    const{socketID,latitude,longitude}=data;
    
    if(markers[socketID]){
        markers[socketID].setLatLng([latitude,longitude]);
    }else{
        markers[socketID]=L.marker([latitude,longitude]).addTo(map)
        .bindPopup(`User: ${socketID}`)
        .openPopup();
    }
    map.setView([latitude,longitude],16);
    
})
socket.on("user-disconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})
