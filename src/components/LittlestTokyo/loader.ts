import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Loader(src: string): Promise<GLTF> {
  const loader = new GLTFLoader()
  return new Promise((resolve) => {
    try {
      loader.load(src, (gltf) => {
        const obj = gltf.scene
        obj.name = 'tokyo'
        obj.position.set(0, 0, 0)
        obj.receiveShadow = true
        obj.castShadow = true
        resolve(gltf)
      })
    } catch (error) {
      throw new Error('模型导入失败')
    }
  })
}
