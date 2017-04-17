/* global THREE */

// ograniciti kameru
// staviti pod

const bojaPozadine = 0xECF8FF

/* KLASE */

class Frejm extends THREE.CSS3DObject {
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

function GlRenderer() {
  const glRenderer = new THREE.WebGLRenderer({alpha:true})
  glRenderer.setClearColor(bojaPozadine)
  glRenderer.setPixelRatio(window.devicePixelRatio)
  glRenderer.setSize(window.innerWidth, window.innerHeight)
  glRenderer.domElement.style.position = 'absolute'
  glRenderer.domElement.style.zIndex = 1
  glRenderer.domElement.style.top = 0
  return glRenderer
}

function CssRenderer() {
  const cssRenderer = new THREE.CSS3DRenderer()
  cssRenderer.setSize(window.innerWidth, window.innerHeight)
  cssRenderer.domElement.style.position = 'absolute'
  cssRenderer.domElement.style.zIndex = 0
  cssRenderer.domElement.style.top = 0
  return cssRenderer
}

function Plane(w, h, position, rotation) {
  const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    opacity: 0.0,
    side: THREE.DoubleSide
  })
  const geometry = new THREE.PlaneGeometry(w, h)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = position.x
  mesh.position.y = position.y
  mesh.position.z = position.z
  mesh.rotation.x = rotation.x
  mesh.rotation.y = rotation.y
  mesh.rotation.z = rotation.z
  return mesh
}

function ColoredMaterial() {
  const material = new THREE.MeshBasicMaterial({
    color: Math.floor(Math.random() * 16777215),
    shading: THREE.FlatShading,
    side: THREE.DoubleSide
  })
  return material
}

/* INIT */

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000)
camera.position.set(708, 2, 2503)

const controls = new THREE.OrbitControls(camera)
controls.maxPolarAngle = Math.PI / 2
controls.minPolarAngle = Math.PI / 2 - 0.3

const glRenderer = new GlRenderer()
const cssRenderer = new CssRenderer()

document.querySelector('#renderer').appendChild(cssRenderer.domElement)
cssRenderer.domElement.appendChild(glRenderer.domElement)

const glScene = new THREE.Scene()
const cssScene = new THREE.Scene()

const ambientLight = new THREE.AmbientLight(0x555555)
glScene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff)
directionalLight.position.set(-.5, .5, -1.5).normalize()
glScene.add(directionalLight)

// PRAVI FREJMOVE

function create3dPage(w, h, position, rotation, url) {
  const plane = new Plane(w, h, position, rotation)
  const cssObject = new Frejm(w, h, position, rotation, url)
  glScene.add(plane)
  cssScene.add(cssObject)
}

create3dPage(
  1000, 1000,
  new THREE.Vector3(-1050, 0, 400),
  new THREE.Vector3(0, 45 * Math.PI / 180, 0),
  'http://skolakoda.org/')

create3dPage(
  900, 1000,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 0),
  'http://skolakoda.org/')

create3dPage(
  1000, 1000,
  new THREE.Vector3(1050, 0, 400),
  new THREE.Vector3(0, -45 * Math.PI / 180, 0),
  'http://skolakoda.org/')

// KUPA

const mesh1 = new THREE.Mesh(
  new THREE.CylinderGeometry(0, 200, 300, 20, 4),
  new ColoredMaterial()
)

mesh1.position.x = 0
mesh1.position.y = -300
mesh1.position.z = 400
glScene.add(mesh1)

// KOCKA

const mesh2 = new THREE.Mesh(
  new THREE.BoxGeometry(200, 200, 200),
  new ColoredMaterial()
)
mesh2.position.x = -300
mesh2.position.y = -300
mesh2.position.z = 400
glScene.add(mesh2)

// LOPTA

const mesh3 = new THREE.Mesh(
    new THREE.SphereGeometry(100, 128, 128),
    new ColoredMaterial()
  )
mesh3.position.x = 500
mesh3.position.y = -300
mesh3.position.z = 400
glScene.add(mesh3)

/* FUNCTIONS */

function update() {
  controls.update()
  glRenderer.render(glScene, camera)
  cssRenderer.render(cssScene, camera)
  requestAnimationFrame(update)
}

update()
