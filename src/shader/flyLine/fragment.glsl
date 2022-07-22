varying float vSize;
uniform vec3 uColor;


void main(){
  // gl_PointCoord 点位置
  // 计算到圆心的距离
  float distanceToCenter = distance(gl_PointCoord , vec2(0.5));
  float strength = 1.0 - (distanceToCenter* 2.0);

  if(vSize<= 0.0){
    gl_FragColor = vec4(1.0,1.0,1.0,0.0);
  }else{
    gl_FragColor = vec4(uColor,strength);
  }
}