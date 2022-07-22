import * as THREE from 'three';
import gsap from 'gsap';

export default function modifyCityMaterial(mesh){
  mesh.material.onBeforeCompile = (shader)=>{
    shader.fragmentShader = shader.fragmentShader.replace(
      `#include <dithering_fragment>`,
      `#include <dithering_fragment>
        //#end#
      `
    )
    addGradColor(shader,mesh)
    addSpread(shader)
    addLightLine(shader)
    addToTopLine(shader)
  }
}

function addGradColor(shader,mesh){
  //计算当前几何体的的边界矩形: 高度差
  mesh.geometry.computeBoundingBox();
  //获取高度差
  let {min, max} = mesh.geometry.boundingBox
  let uHeight = max.y - min.y
  shader.uniforms.uTopColor = {
    value: new THREE.Color('#ffeeff')
  }
  shader.uniforms.uHeight = {
    value: uHeight
  }

  shader.vertexShader = shader.vertexShader.replace(
    `#include <common>`,
    `#include <common>
     varying vec3 vPosition;
    `
  )

  shader.vertexShader = shader.vertexShader.replace(
    `#include <begin_vertex>`,
    `#include <begin_vertex>
     vPosition = position;
    `
  )
  
  shader.fragmentShader = shader.fragmentShader.replace(
    `#include <common>`,
    `#include <common>
      varying vec3 vPosition;
      uniform vec3 uTopColor;
      uniform float uHeight;
    `
  )
  shader.fragmentShader = shader.fragmentShader.replace(
    `//#end#`,
    `
      vec4 distGradColor = gl_FragColor;
      //设置混合百分比
      float gradMix = (vPosition.y + uHeight / 2.0) / uHeight; // 0~1
      //计算混合颜色
      vec3 gradMixColor = mix(distGradColor.xyz, uTopColor, gradMix);
      gl_FragColor = vec4(gradMixColor, 1.0);
      //#end#
    `
  )
}

function addSpread(shader){
  //设置扩散的中心点
  shader.uniforms.uSpreadCenter = {
    value: new THREE.Vector2(0,0)
  }
  shader.uniforms.uSpreadTime = {
    value: 0
  }
  shader.uniforms.uSpreadWidth = {
    value: 20
  }
  shader.fragmentShader = shader.fragmentShader.replace(
    `#include <common>`,
    `#include <common>
      uniform vec2 uSpreadCenter;
      uniform float uSpreadWidth;
      uniform float uSpreadTime;
    `
  )
  shader.fragmentShader = shader.fragmentShader.replace(
    `//#end#`,
    `
      float spreadRadius = distance(vPosition.xz, uSpreadCenter);
      //扩散范围的函数
      float spreadIndex = -(spreadRadius - uSpreadTime) * (spreadRadius - uSpreadTime) + uSpreadWidth;
      if(spreadIndex>0.0){
        gl_FragColor = mix(gl_FragColor, vec4(1.0,1.0,1.0,1.0), spreadIndex/uSpreadWidth );
      }
      //#end#
    `
  )

  gsap.to(shader.uniforms.uSpreadTime,{
    value:800,duration:1,ease:'none',repeat:-1
  })
}


function addLightLine(shader){
  shader.uniforms.uLightLineTime = {
    value: -800
  }
  shader.uniforms.uLightLineWidth = {
    value: 40
  }
  shader.fragmentShader = shader.fragmentShader.replace(
    `#include <common>`,
    `#include <common>
      uniform float uLightLineTime;
      uniform float uLightLineWidth;
    `
  )
  shader.fragmentShader = shader.fragmentShader.replace(
    `//#end#`,
    `
      //扩散范围的函数
      float LightLineMix = -(vPosition.x + vPosition.z - uLightLineTime) * (vPosition.x + vPosition.z - uLightLineTime) + uLightLineWidth;
      if(LightLineMix>0.0){
        gl_FragColor = mix(gl_FragColor, vec4(1,0.8,0.8,1.0), LightLineMix/uLightLineWidth );
      }
      //#end#
    `
  )

  gsap.to(shader.uniforms.uLightLineTime,{
    value:800,duration:4,ease:'none',repeat:-1
  })
}

function addToTopLine(shader){
  shader.uniforms.uToTopTime = {
    value: 0
  }
  shader.uniforms.uToTopWidth = {
    value: 40
  }
  shader.fragmentShader = shader.fragmentShader.replace(
    `#include <common>`,
    `#include <common>
      uniform float uToTopTime;
      uniform float uToTopWidth;
    `
  )
  shader.fragmentShader = shader.fragmentShader.replace(
    `//#end#`,
    `
      //扩散范围的函数
      float ToTopMix = -(vPosition.y - uToTopTime) * (vPosition.y - uToTopTime) + uToTopWidth;
      if(ToTopMix>0.0){
        gl_FragColor = mix(gl_FragColor, vec4(1,1,1,1), ToTopMix/uToTopWidth );
      }
      //#end#
    `
  )

  gsap.to(shader.uniforms.uToTopTime,{
    value:400,duration:5,ease:'none',repeat:-1
  })
}