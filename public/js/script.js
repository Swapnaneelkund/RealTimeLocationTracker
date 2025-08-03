const socket=io();
let Usersocket=null;
if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const{latitude,longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude});
    },(error)=>{
        console.error(error);
    },{
        enableHighAccuracy:true,
        maximumAge:2000,
        timeout:5000
    });
     
}
const map = L.map("map").setView([0,0], 2);  
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: 's'
}).addTo(map);
const markers={};
let routerControl=null;
const users={};
socket.on("recive-location",(data)=>{
    const{socketID,latitude,longitude,user}=data;
    users[user]=socketID;
    Usersocket=socket.id;
    if(markers[socketID]){
        markers[socketID].setLatLng([latitude,longitude]);
    }else{
        markers[socketID]=L.marker([latitude,longitude]).addTo(map)
        .bindPopup(`User: ${user}`)
        .openPopup();
    }


})
socket.on("user-disconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
        if (routerControl && (routerControl.getWaypoints()[0].name === id || routerControl.getWaypoints()[1].name === id)) {
            map.removeControl(routerControl); 
            routerControl = null;
            alert("The target user has disconnected. The route has been removed.");
        }

    }
})
document.getElementById("message-form").addEventListener("submit",(event)=>{
    event.preventDefault();
    const target=document.getElementById("message").value;
    if(target){
        const targetSocketId=users[target];
        document.getElementById("message").value="";
        if (targetSocketId) {
            if (routerControl) {
                map.removeControl(routerControl);
                routerControl=null;
            }
            const currentUserLocation=markers[Usersocket].getLatLng();
            const targetLocation=markers[targetSocketId].getLatLng();

            const distance = currentUserLocation.distanceTo(targetLocation);
            routerControl = L.Routing.control({
                waypoints: [currentUserLocation, targetLocation],
                routeWhileDragging: true,
                collapsible: false,
                createMarker: function() {
                    return null; 
                }
            }).addTo(map);
             routerControl.getWaypoints()[0].name = Usersocket; 
             routerControl.getWaypoints()[1].name = targetSocketId;
        }else{
            alert("target not found")
        }
    }else{
        alert("enter the target");
    }

})
