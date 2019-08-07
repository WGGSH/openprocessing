class Particle {
  constructor(vec,col){
    this.position = createVector(0,0);
    this.vec = vec;
    this.color = col;
    this.cnt = 0;
  }
}

let particles;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  particles = new Array();
  noStroke();
  colorMode(HSB, 360, 100, 100);
  // blendMode(ADD);
}

function draw() {
  background(10,0.05);
  translate(width/2, height/2);

  particles.push(new Particle(createVector(5,0).rotate(cos(frameCount*frameCount/10000)*Math.PI+Math.PI/4),color(frameCount%360,40,100)));

  particles.forEach(element => {
    element.cnt++;
    element.position.add(element.vec);
    if(element.cnt<600){
      element.vec.rotate(0.0097);
    }

    fill(element.color);
    ellipse(element.position.x, element.position.y, 10, 10);
  });


  if(frameCount>1200){
    particles.shift();
  }

}
