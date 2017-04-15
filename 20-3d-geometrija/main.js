/* global THREE */

const kamera = new THREE.PerspectiveCamera()
kamera.position.set(0, 25, 42)
const kontrole = new THREE.OrbitControls(kamera)

const renderer = new THREE.WebGLRenderer({alpha: true})
renderer.setSize(600, 300)

const scena = new THREE.Scene()

/** FUNCTIONS **/

function init() {
  const kupa = new THREE.Mesh(
    new THREE.ConeGeometry(5, 8, 30),
    new THREE.MeshNormalMaterial()
  )
  scena.add(kupa)

  const valjak = new THREE.Mesh(
    new THREE.CylinderGeometry(5, 5, 15, 30),
    new THREE.MeshNormalMaterial()
  )
  valjak.position.set(-15, 0, 0)
  scena.add(valjak)

  const kocka = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshNormalMaterial()
  )
  kocka.position.set(15, 0, 0)
  scena.add(kocka)

  document.querySelector('#renderer').appendChild(renderer.domElement)
}

function update() {
  window.requestAnimationFrame(update)
  kontrole.update()
  renderer.render(scena, kamera)
}

/** EXEC **/

init()
update()
