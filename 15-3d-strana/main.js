/* global THREE */

const scena = new THREE.Scene()

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const kamera = new THREE.PerspectiveCamera()
kamera.position.set(279, 136, 500)
kamera.lookAt(scena.position)

const kontrole = new THREE.OrbitControls(kamera)

const html3D = new THREE.CSS3DObject(document.querySelector('#page'))
scena.add(html3D)

/* FUNCTIONS */

function update() {
  requestAnimationFrame(update)
  kontrole.update()
  renderer.render(scena, kamera)
}

update()

/* EVENTS */

window.onresize = function() {
  kamera.aspect = window.innerWidth / window.innerHeight
  kamera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
