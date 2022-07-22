uniform float uHeight;

varying vec3 vPosition;


void main(){
  float gradMix = (vPosition.y + uHeight * 0.5) / uHeight;
  // vec3 gradColor = mix(gl_FragColor.xyz, uColor, gradMix);
  // gl_FragColor = vec4(gradColor,1.0);
  gl_FragColor = vec4(1.0,1.0,0.0,1.0-gradMix);
}