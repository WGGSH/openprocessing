// the 'varying's are shared between both vertex & fragment shaders
let varying = 'precision highp float; varying vec2 vPos;'

// the vertex shader is called for each vertex
let vs =
  varying +
  'attribute vec3 aPosition;' +
  'void main() { vPos = (gl_Position = vec4(aPosition,1.0)).xy; }'

// the fragment shader is called for each pixel
let fs =
  varying +
  'uniform float t;\
  uniform vec2 r;\
  \
  vec3 hsb2rgb( in vec3 c ){\
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),\
                             6.0)-3.0)-1.0,\
                     0.0,\
                     1.0 );\
    rgb = rgb*rgb*(3.0-2.0*rgb);\
    return c.z * mix(vec3(1.0), rgb, c.y);\
  }\
  \
  void main() {\
    vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);\
    float a = gl_FragCoord.y / 512.0;\
    float h=p.x/2.0+1.0+sin((p.y*t/100.0)*8.0*cos(t/100.0)-t/100.0);\
    float s=0.6;\
    float b=1.0;\
    gl_FragColor = vec4(hsb2rgb(vec3(h,s,b)), 1.0);\
  }'

let myShader
function setup() {
  createCanvas(600, 600, WEBGL)

  // create and initialize the shader
  myShader = createShader(vs, fs)
  shader(myShader)
  noStroke()
  // noloop()
}

function draw() {
  // 'r' is the size of the image in Mandelbrot-space
  myShader.setUniform('r', [width, height])
  myShader.setUniform('t', frameCount)
  quad(-1, -1, 1, -1, 1, 1, -1, 1)
}
