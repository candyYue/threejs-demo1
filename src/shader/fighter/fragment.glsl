uniform sampler2D uTexture;
uniform vec3 uColor;

varying vec3 vPosition;

void main(){
  vec4 textureColor = texture2D(uTexture, gl_PointCoord);//纹理采样 gl_PointCoord:点坐标
  gl_FragColor = vec4 (uColor,textureColor.x);
  // gl_FragColor = uTextureColor;
}