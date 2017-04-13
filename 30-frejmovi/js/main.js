/* global THREE */

class Frejm extends THREE.CSS3DObject {
  constructor(width, height, position, rotation, url) {
    const iframe = document.createElement('iframe')
    iframe.src = url
    iframe.width = width
    iframe.height = height
    super(iframe)
    this.position.x = position.x
    this.position.y = position.y
    this.position.z = position.z
    this.rotation.x = rotation.x
    this.rotation.y = rotation.y
    this.rotation.z = rotation.z
  }
}

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(width, height)
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = 0
document.body.appendChild(renderer.domElement)

const kamera = new THREE.PerspectiveCamera()
kamera.aspect = width / height
kamera.position.set(0, 0, 2500)

const strana01 = new Frejm(
  1000, 1000,
  new THREE.Vector3(-1050, 0, 400),
  new THREE.Vector3(0, 45 * Math.PI / 180, 0),
  'http://www.skolakoda.org/kursevi'
)

const strana02 = new Frejm(
  1400, 1000,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 0),
  'http://www.skolakoda.org/'
)

const strana03 = new Frejm(
  1000, 1000,
  new THREE.Vector3(1050, 0, 400),
  new THREE.Vector3(0, -45 * Math.PI / 180, 0),
  'http://www.skolakoda.org/o-nama'
)

const scena = new THREE.Scene()
scena.add(strana01, strana02, strana03)

/** FUNCTIONS **/

function update() {
  renderer.render(scena, kamera)
  requestAnimationFrame(update)
}

update()
