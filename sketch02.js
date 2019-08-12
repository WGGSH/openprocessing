// the vertex shader is called for each vertex
let vs =
  varying +
  'attribute vec3 aPosition;' +
  'void main() { vPos = (gl_Position = vec4(aPosition,1.0)).xy; }'

// the fragment shader is called for each pixel
let fs =
  varying +
  'uniform vec2 p;' +
  'uniform float r;' +
  'const int I = 500;' +
  'void main() {' +
  '  vec2 c = p + vPos * r, z = c;' +
  '  float n = 0.0;' +
  '  for (int i = I; i > 0; i --) {' +
  '    if(z.x*z.x+z.y*z.y > 4.0) {' +
  '      n = float(i)/float(I);' +
  '      break;' +
  '    }' +
  '    z = vec2(z.x*z.x-z.y*z.y, 2.0*z.x*z.y) + c;' +
  '  }' +
  '  gl_FragColor = vec4(0.5-cos(n*17.0)/2.0,0.5-cos(n*13.0)/2.0,0.5-cos(n*23.0)/2.0,1.0);' +
  '}'

let myShader

function setup() {
  createCanvas(600, 600, WEBGL)
  // noLoop()

  strokeWeight(0)

  colorMode(HSB, 360, 100, 100, 100)

  myShader = createShader(vs, fs)
  shader(myShader)
}

function draw() {
  console.log(frameCount)

  quad(-1, -1, 1, -1, 1, 1, -1, 1)

  // background(0)

  // stroke(100, 50)

  // let graph = createGraphics(600, 600)

  // graph.background(0)
  // graph.colorMode(HSB, 360, 100, 100, 100)

  // for (let y = 0; y < height; y++) {
  //   for (let x = 0; x < width; x++) {
  //     graph.stroke(
  //       ((360 / width) * x + sin(y / 200) * 80 + frameCount) % 360,
  //       100,
  //       100
  //     )
  //     graph.point(x, y)
  //   }
  // }

  // image(graph, 0, 0)
}
