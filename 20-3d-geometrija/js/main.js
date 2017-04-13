/* global THREE */

const width = window.innerWidth
const height = window.innerHeight

/** INIT **/

const kamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
kamera.position.set(0, 0, 800)

const kontrole = new THREE.OrbitControls(kamera)

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
})
renderer.setSize(width, height)
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = 0

const scena = new THREE.Scene()

const geometrija = new THREE.Mesh(new THREE.TorusGeometry(120, 60, 40, 40), new THREE.MeshNormalMaterial())
geometrija.position.set(0, 0, 0)

const svetlo = new THREE.HemisphereLight(0xffbf67, 0x15c6ff)

/** FUNKCIJE **/

function init() {
  scena.add(geometrija)
  scena.add(svetlo)
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
