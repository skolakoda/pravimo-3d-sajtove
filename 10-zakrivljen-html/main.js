/* global THREE */

const width = window.innerWidth
const height = window.innerHeight

/** INIT **/

const scena = new THREE.Scene()

const kamera = new THREE.PerspectiveCamera()
kamera.position.set(117, 35, 790)

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(width, height)
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = 0

/** FUNKCIJE **/

function init() {
  const html3D = new THREE.CSS3DObject(document.querySelector('#root'))
  scena.add(html3D)
  scena.add(kamera)
  kamera.lookAt(scena.position)
  // new THREE.OrbitControls(kamera)
  document.body.appendChild(renderer.domElement)
}

function update() {
  window.requestAnimationFrame(update)
  renderer.render(scena, kamera)
}

/** TOK **/

init()
update()
