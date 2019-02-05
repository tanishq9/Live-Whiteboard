var socket;
function setup() {
  createCanvas(250,500);
  //createCanvas(windowWidth, windowHeight);
  background(0);
  
  socket = io(); // client sends io() connection request to server

  socket.on('connected',function(id){
    console.log('Connected '+id);
  })

  socket.on('mouse_react',function(data){
    noStroke(); // disables drawing stroke (outline of shape)
    fill(0,0,255); // sets the color used to fill shapes
    ellipse(data.x,data.y,20,20);
  })
}

function mouseDragged(){
  console.log('Sending '+mouseX+","+mouseY);

  var data = {
    x : mouseX,
    y : mouseY
  };

  socket.emit('mouse_dragged',data);

  noStroke(); // disables drawing stroke (outline of shape)
  fill(255); // sets the color used to fill shapes
  ellipse(mouseX,mouseY,20,20);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   background(0);
// }

