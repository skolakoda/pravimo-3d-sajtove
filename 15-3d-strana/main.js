/* global THREE */

const scena = new THREE.Scene()

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const kamera = new THREE.PerspectiveCamera()
kamera.position.set(279, 136, 500)

const kontrole = new THREE.OrbitControls(kamera)

const page3D = new THREE.CSS3DObject(document.querySelector('#page'))
scena.add(page3D)

/* FUNCTIONS */

function update() {
  requestAnimationFrame(update)
  kontrole.update()
  renderer.render(scena, kamera)
}

update()
