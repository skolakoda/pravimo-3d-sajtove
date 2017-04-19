/* global THREE */

const width = window.innerWidth
const height = window.innerHeight

class ImgObject extends THREE.CSS3DObject {
  constructor(pos) {
    const img = document.createElement('img')
    img.src = `http://lorempixel.com/140/140?${Math.random()}`
    super(img)
    this.position = pos
  }
}

/** INIT **/

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
camera.position.set(1200, 1200, 1200)

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.autoRotate = true

/** FUNCTIONS **/

function getVertices(geometry, offset) {
  const result = []
  for (let i = 0; i < geometry.faces.length; i += 2) {
    const face = geometry.faces[i]
    const faceNext = geometry.faces[i + 1]
    const pos = new THREE.Vector3()
      .copy(geometry.vertices[face.a])
      .add(geometry.vertices[face.b])
      .add(geometry.vertices[face.c])
      .add(geometry.vertices[faceNext.a])
      .add(geometry.vertices[faceNext.b])
      .add(geometry.vertices[faceNext.c])
      .divideScalar(6).multiplyScalar(offset)
    result.push({pos})
  }
  return result
}

function update() {
  requestAnimationFrame(update)
  controls.update()
  renderer.render(scene, camera)
}

/** EXEC **/

const vertices = getVertices(new THREE.PlaneGeometry(30, 30, 8, 8), 40)
vertices.map(v => scene.add(new ImgObject(v.pos)))

update()
