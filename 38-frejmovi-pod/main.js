/* global THREE */

const bojaPozadine = 0xECF8FF
const visinaStrane = 1000
const visinaPredmeta = 200

/* KLASE */

class Frame extends THREE.CSS3DObject {
  constructor(width, height, position, rotation, url) {
    const iframe = document.createElement('iframe')
    iframe.src = url
    iframe.width = width
    iframe.height = height
    super(iframe)
    Object.assign(this.position, position)
    Object.assign(this.rotation, rotation)
  }
}

class Wall extends THREE.Mesh {
  constructor(w, h, position, rotation) {
    super(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({
        opacity: 0,
        side: THREE.DoubleSide
      })
    )
    Object.assign(this.position, position)
    Object.assign(this.rotation, rotation)
  }
}

class CSS3DRenderer extends THREE.CSS3DRenderer {
  constructor() {
    super()
    this.setSize(window.innerWidth, window.innerHeight)
    this.domElement.style.position = 'absolute'
    this.domElement.style.top = 0
  }
}

class WebGLRenderer extends THREE.WebGLRenderer {
  constructor() {
    super({alpha:true})
    this.setClearColor(bojaPozadine)
    this.setSize(window.innerWidth, window.innerHeight)
    this.domElement.style.position = 'absolute'
    this.domElement.style.top = 0
  }
}

/* INIT */

const glScene = new THREE.Scene()
const cssScene = new THREE.Scene()

const glRenderer = new WebGLRenderer()
const cssRenderer = new CSS3DRenderer()

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000)
camera.aspect = window.innerWidth / window.innerHeight
camera.position.set(708, 2, 2503)

const controls = new THREE.OrbitControls(camera)
controls.maxPolarAngle = Math.PI / 2
controls.minPolarAngle = Math.PI / 2 - 0.3

// GEOMETRIJA

const kocka = new THREE.Mesh(
  new THREE.BoxGeometry(visinaPredmeta, visinaPredmeta, visinaPredmeta),
  new THREE.MeshNormalMaterial()
)
kocka.position.set(-400, -visinaStrane / 2 + visinaPredmeta / 2, 400)

const kupa = new THREE.Mesh(
  new THREE.CylinderGeometry(0, visinaPredmeta, 300, 20, 4),
  new THREE.MeshNormalMaterial()
)
kupa.position.set(0, -visinaStrane / 2 + visinaPredmeta / 2, 400)

const lopta = new THREE.Mesh(
  new THREE.SphereGeometry(visinaPredmeta / 2, 128, 128),
  new THREE.MeshNormalMaterial()
)
lopta.position.set(400, -visinaStrane / 2 + visinaPredmeta / 2, 400)

const texture = new THREE.ImageUtils.loadTexture('../assets/kamen.jpg')
texture.repeat.set(5, 5)
texture.wrapS = texture.wrapT = THREE.RepeatWrapping

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(3500, 3500),
  new THREE.MeshBasicMaterial({map: texture})
)
floor.rotation.x = -Math.PI / 2
floor.position.set(0, -visinaStrane / 2, 0)

/* FUNCTIONS */

function add3dPage(w, h, position, rotation, url) {
  const wall = new Wall(w, h, position, rotation)
  const cssObject = new Frame(w, h, position, rotation, url)
  glScene.add(wall)
  cssScene.add(cssObject)
}

function update() {
  controls.update()
  glRenderer.render(glScene, camera)
  cssRenderer.render(cssScene, camera)
  requestAnimationFrame(update)
}

/* ADD */

glScene.add(kupa)
glScene.add(kocka)
glScene.add(lopta)
glScene.add(floor)

document.querySelector('#renderer')
  .appendChild(cssRenderer.domElement)
  .appendChild(glRenderer.domElement)

add3dPage(
  visinaStrane, visinaStrane,
  new THREE.Vector3(-1050, 0, 400),
  new THREE.Vector3(0, 45 * Math.PI / 180, 0),
  'http://skolakoda.org/'
)

add3dPage(
  visinaStrane, visinaStrane,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 0),
  'http://skolakoda.org/'
)

add3dPage(
  visinaStrane, visinaStrane,
  new THREE.Vector3(1050, 0, 400),
  new THREE.Vector3(0, -45 * Math.PI / 180, 0),
  'http://skolakoda.org/'
)

/* EXEC */

update()
