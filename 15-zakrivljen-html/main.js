/* global THREE */

const scene = new THREE.Scene()

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera()
camera.position.set(279, 136, 500)
camera.lookAt(scene.position)
const kontrole = new THREE.OrbitControls(camera)

const div = document.querySelector('#page')

const object = new THREE.CSS3DObject(div)
scene.add(object)

function render() {
  requestAnimationFrame(render)
  kontrole.update()
  renderer.render(scene, camera)
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

render()
window.addEventListener('resize', handleResize, false)
