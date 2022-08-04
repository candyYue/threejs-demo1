uniform float uTime;
attribute vec3 newPosition;
void main(){
  vec4 currentPosition = modelMatrix * vec4(position, 1.0);
  vec3 direction = newPosition - currentPosition.xyz;
  vec3 targetPosition = currentPosition.xyz + direction * 0.1* uTime;

  vec4 viewPosition = viewMatrix * vec4(targetPosition, 1.0);
  gl_Position = projectionMatrix * viewPosition;

  gl_PointSize = -1.0 / viewPosition.z; //点材质要设置大小
}