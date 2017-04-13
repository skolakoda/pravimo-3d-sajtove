/* global THREE */

const width = window.innerWidth
const height = window.innerHeight

/** INIT **/

const div3D = new THREE.CSS3DObject(document.querySelector('#intro'))
div3D.position.z = -200 // priblizava

const kamera = new THREE.PerspectiveCamera()
kamera.aspect = width / height
kamera.position.set(0, 0, 500)

const scena = new THREE.Scene()
const renderer = new THREE.CSS3DRenderer()
renderer.setSize(width, height)
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = 0

const kontrole = new THREE.OrbitControls(kamera)
// ogranicava horizontalno
// must be within interval [ - Math.PI, Math.PI ]
kontrole.minAzimuthAngle = - Math.PI / 2
kontrole.maxAzimuthAngle = Math.PI / 2
// ogranicava vertikalno
// kontrole.minPolarAngle = 0 // radians
// kontrole.maxPolarAngle = Math.PI // radians

/** FUNKCIJE **/

function init() {
  scena.add(div3D)
  document.body.appendChild(renderer.domElement)
}

function update() {
  window.requestAnimationFrame(update)
  kontrole.update()
  renderer.render(scena, kamera)
}

/** TOK **/

init()
update()
