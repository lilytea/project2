// All the paths
let paths = [];
// Are we painting?
let painting = false;
// How long until the next circle
let next = 0;
// Where are we now and where were we?
let current;
let previous;
let bg;

let img1;

function setup() {
  bg = loadImage(
    "https://cdn.glitch.me/21e0e233-611c-4362-a876-bd76a0fc45d1%2Fcanvasbg800x800.png?v=1634152115684");
  img1=loadImage("https://cdn.glitch.me/21e0e233-611c-4362-a876-bd76a0fc45d1%2Fgirl_whole_adobespark%20(1).png?v=1635089021346");
  var myCanvas = createCanvas(640, 640);
  myCanvas.parent("Mom");

  current = createVector(0, 0);
  previous = createVector(0, 0);
}

function draw() {

  background(bg);

  
  

  // If it's time for a new point
  if (millis() > next && painting) {
    // Grab mouse position
    current.x = mouseX;
    current.y = mouseY;

    // New particle's force is based on mouse movement
    let force = p5.Vector.sub(current, previous);
    force.mult(0.05);

    // Add new particle
    paths[paths.length - 1].add(current, force);

    // Schedule next circle
    next = millis() + random(100);

    // Store mouse values
    previous.x = current.x;
    previous.y = current.y;
  }

  // Draw all paths
  for (let i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

// Start it up
function mousePressed() {
  var snd = new Audio(
    "https://cdn.glitch.me/21e0e233-611c-4362-a876-bd76a0fc45d1%2Fzapsplat_foley_stone_small_set_down_wood_001_32923.mp3?v=1634228049019"
  ); // buffers automatically when created
  snd.play();
  if (mouseX > 50 && mouseX < 3000 && mouseY > 20 && mouseY < 500) {
    next = 0;
    painting = true;
    previous.x = mouseX;
    previous.y = mouseY;

    paths.push(new Path());
  }
}

// Stop
function mouseReleased() {
  painting = false;
}

function drawpeople(x, y) {
  image(img1, x-32, y-32, 70, 70);
//  ellipse(x, y, 60, 60);
   let k = color("black");
  fill(k);

  line(x, y + 30, x, y + 80); //middle
  
  line(x-15, y+40, x+15, y+40);  //shoulder
  
  line(x-15, y+40, x, y+80);
  line(x, y+80, x+15, y+40);
  
  line(x - 25, y + 66, x-15, y + 40);
  line(x+15, y + 40, x + 25, y + 66);
  line(x, y + 80, x + 20, y + 126);
  line(x - 20, y + 126, x, y + 80);
}
// A Path is a list of particles
class Path {
  constructor() {
    this.particles = [];
    this.hue = random(100);
  }

  add(position, force) {
    // Add a new particle with a position, force, and hue
    this.particles.push(new Particle(position, force, this.hue));
  }

  // Display plath
  update() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
    }
  }

  // Display plath
  display() {
    // Loop through backwards
    for (let i = this.particles.length - 1; i >= 0; i--) {
      // If we shold remove it
      if (this.particles[i].lifespan <= 0) {
        this.particles.splice(i, 1);
        // Otherwise, display it
      } else {
        this.particles[i].display(this.particles[i + 1]);
      }
    }
  }
}

// Particles along the path
class Particle {
  constructor(position, force, hue) {
    this.position = createVector(position.x, position.y);
    this.velocity = createVector(force.x, force.y);
    this.drag = 0.95;
    this.lifespan = 255;
  }

  update() {
    // Move it
    this.position.add(this.velocity);
    // Slow it down
    this.velocity.mult(this.drag);
    // Fade it out
    this.lifespan--;
  }

  // Draw particle and connect it with a line
  // Draw a line to another
  display(other) {
    let c = color(85, 107, 47);
    stroke(c, this.lifespan);
    strokeWeight(2);
    fill(c, this.lifespan / 2);

    drawpeople(this.position.x, this.position.y);
    // If we need to draw a line

    if (other) {
      stroke(c);
      fill(c);
      line(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
    }
  }
}
