let varying = 'precision highp float; varying vec2 vPos;'

let vs =
  varying +
  'attribute vec3 aPosition;' +
  'void main() { vPos = (gl_Position = vec4(aPosition,1.0)).xy; }'

let fs =
  varying +
  'uniform float t;' +
  'uniform vec2 r;' +
  '' +
  'vec3 hsb2rgb( in vec3 c ){' +
  'vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),' +
  '                        6.0)-3.0)-1.0,' +
  '               0.0,' +
  '              1.0 );' +
  'rgb = rgb*rgb*(3.0-2.0*rgb);' +
  'return c.z * mix(vec3(1.0), rgb, c.y);' +
  '}' +
  '' +
  'void main() {' +
  'const float PI = 3.14159265;' +
  'const int MAX = 48;' +
  'vec2 pos[MAX];' +
  'for(int i=0;i<MAX;i++){' +
  ' pos[i] = vec2(' +
  '  cos(PI*2.0/float(MAX)*float(i)*t/160.0+t/(100.0+20.0*sin(t/100.0))),' +
  ' sin(PI*2.0/float(MAX)*float(i)*t/200.0+t/100.0)' +
  ' )*0.8;' +
  '}' +
  ' vec2 m = vec2(0, 0);' +
  ' vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);' +
  ' float h;' +
  ' float s=0.6;' +
  ' for(int i=0;i<MAX;i++){' +
  '   h=1.0/float(MAX)*float(i);' +
  '   float b = 0.05 / length(pos[i] - p);' +
  '   b = pow(b, 1.8);' +
  '   gl_FragColor += vec4(hsb2rgb(vec3(h,s,b)), 1.0);' +
  ' }' +
  '}'

let myShader
function setup() {
  let size = windowWidth > windowHeight ? windowHeight : windowWidth
  size /= 2
  createCanvas(size, size, WEBGL)

  myShader = createShader(vs, fs)
  shader(myShader)
  noStroke()
}

function draw() {
  myShader.setUniform('r', [width, height])
  myShader.setUniform('t', frameCount)
  quad(-1, -1, 1, -1, 1, 1, -1, 1)
}
