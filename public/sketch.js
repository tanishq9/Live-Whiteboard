var socket;
function setup() {
  createCanvas(300,500);
  //createCanvas(windowWidth, windowHeight);
  background(0);
  
  socket = io(); // client sends io() connection request to server

  socket.on('connected',function(id){
    console.log('Connected '+id);
  })

  socket.on('mouse_react',function(data){
    //noStroke(); // disables drawing stroke (outline of shape)
    //fill(0,0,255); // sets the color used to fill shapes
    stroke(255);
    line(data.x1,data.y1,data.x2,data.y2);
  })
}

function mouseDragged(){
  console.log('Sending '+mouseX+","+mouseY);
  var data = {
      x1 : mouseX,
      y1 : mouseY,
      x2 : pmouseX,
      y2 : pmouseY
   };
   socket.emit('mouse_dragged',data);
   //  noStroke(); // disables drawing stroke (outline of shape)
   // fill(255); // sets the color used to fill shapes
   stroke(255);
   line(mouseX, mouseY, pmouseX, pmouseY);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   background(0);
// }

