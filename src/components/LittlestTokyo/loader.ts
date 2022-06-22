import type { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Loader(src: string): Promise<Group> {
  const loader = new GLTFLoader()
  return new Promise((resolve) => {
    try {
      loader.load(src, (gltf) => {
        const obj = gltf.scene
        obj.name = 'tokyo'
        obj.position.set(0, 0, 0)
        obj.receiveShadow = true
        obj.castShadow = true
        resolve(obj)
      })
    } catch (error) {
      throw new Error('模型导入失败')
    }
  })
}
