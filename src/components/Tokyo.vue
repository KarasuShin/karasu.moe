<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const container = $ref<HTMLDivElement>()
let renderer = $ref<THREE.WebGLRenderer>()
const loader = new GLTFLoader()
let req: number
const pointlight = new THREE.PointLight(0xFFFFFF, 0, 50)
const midLight = new THREE.AmbientLight(0xFFFFFF, 0.5)

onMounted(() => {
  if (container && !renderer) {
    const scene = new THREE.Scene()
    const cw = container.clientWidth
    const ch = cw
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(cw, ch)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.outputEncoding = THREE.sRGBEncoding
    container.appendChild(renderer.domElement)
    const scale = cw * 0.005 + 12
    const camera = new THREE.OrthographicCamera(
      -scale,
      scale,
      scale,
      -scale,
      0.01,
      50000,
    )
    const initialCameraPosition = new THREE.Vector3(
      20 * Math.sin(0.2 * Math.PI),
      10,
      20 * Math.cos(0.2 * Math.PI),
    )
    camera.position.copy(initialCameraPosition)
    pointlight.position.set(initialCameraPosition.x, initialCameraPosition.y, initialCameraPosition.z)
    pointlight.intensity = isDark.value ? 0.000005 : 0.8
    scene.add(pointlight)
    scene.add(midLight)
    const target = new THREE.Vector3(-0.5, 1.2, 0)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.autoRotate = true
    controls.target = target
    let frame = 0
    const animate = () => {
      req = requestAnimationFrame(animate)

      frame = frame <= 100 ? frame + 1 : frame

      if (frame <= 100) {
        const p = initialCameraPosition
        const rotSpeed = -Math.sqrt(1 - ((frame / 120) - 1) ** 4) * Math.PI * 20

        camera.position.y = 10
        camera.position.x
            = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
        camera.position.z
            = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
        camera.lookAt(target)
      }
      else {
        controls.update()
      }

      renderer.render(scene, camera)
    }
    loader.load('/tokyo/model.gltf', (gltf) => {
      const obj = gltf.scene
      obj.name = 'tokyo'
      obj.position.set(0, 0, 0)
      obj.receiveShadow = true
      obj.castShadow = true
      scene.add(obj)
      renderer.render(scene, camera)
      animate()
    })
  }
})

onUnmounted(() => {
  renderer.dispose()
  cancelAnimationFrame(req)
})

watch(() => isDark.value, (val) => {
  pointlight.intensity = !val ? 2 : 0.000005
})
</script>

<template>
  <div ref="container" w="md:2xl lg:2xl" mx-auto />
</template>
