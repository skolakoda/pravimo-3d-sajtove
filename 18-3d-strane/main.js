/* global THREE */

const scena = new THREE.Scene()

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const kamera = new THREE.PerspectiveCamera()
kamera.position.set(186, 83, 551)
kamera.lookAt(scena.position)

const kontrole = new THREE.OrbitControls(kamera)

const page1 = new THREE.CSS3DObject(document.querySelector('#page'))
page1.position.set(-200, 0, -100)

const page2 = new THREE.CSS3DObject(document.querySelector('#page2'))

scena.add(page1)
scena.add(page2)

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
