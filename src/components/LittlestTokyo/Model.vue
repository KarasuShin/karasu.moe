<script setup lang="ts">
import { AmbientLight, AnimationMixer, Clock, OrthographicCamera, PointLight, Scene, Vector3, WebGLRenderer, sRGBEncoding } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import loader from './loader'

const container = $ref<HTMLDivElement>()
let renderer = $ref<WebGLRenderer>()
let req: number
const pointlight = new PointLight(0xFFFFFF, 0, 50)
const midLight = new AmbientLight(0xFFFFFF, 0.5)
let cw = $ref(0)
let ch = $ref(0)
let loading = $ref(false)
let mixer: AnimationMixer
const clock = new Clock()

const { width } = useWindowSize()
watch(width, () => {
  if (container && renderer)
    renderer.setSize(container.clientWidth, container.clientWidth)
})

onMounted(async () => {
  if (container && !renderer) {
    const scene = new Scene()
    ch = cw = container.clientWidth
    renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(cw, ch)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.outputEncoding = sRGBEncoding
    container.appendChild(renderer.domElement)
    const scale = cw * 0.005 + 12

    const initialCameraPosition = new Vector3(
      20 * Math.sin(0.2 * Math.PI),
      10,
      20 * Math.cos(0.2 * Math.PI),
    )
    const camera = new OrthographicCamera(
      -scale,
      scale,
      scale,
      -scale,
      0.01,
      50000,
    )
    camera.position.copy(initialCameraPosition)

    pointlight.position.set(initialCameraPosition.x, initialCameraPosition.y, initialCameraPosition.z)
    pointlight.intensity = isDark.value ? 0.000005 : 0.8
    scene.add(pointlight)
    scene.add(midLight)

    const target = new Vector3(-0.5, 1.2, 0)
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
      } else {
        controls.update()
      }
      const delta = clock.getDelta()

      mixer.update(delta)
      renderer.render(scene, camera)
    }
    loading = true
    const obj = await loader('https://karasu.oss-cn-chengdu.aliyuncs.com/karasu.moe/model.glb')
    scene.add(obj.scene)
    mixer = new AnimationMixer(obj.scene)
    mixer.clipAction(obj.animations[0]).play()
    renderer.render(scene, camera)
    loading = false
    animate()
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
  <div ref="container" w="md:md xl:2xl" mx-auto flex items-center justify-center relative>
    <div v-if="loading" :w="cw" :h="ch" absolute>
      <Spin :size="48" />
    </div>
  </div>
</template>
