const THREE = window.THREE
import {
  PerspectiveCamera,
  Mesh,
  TorusGeometry,
  MeshNormalMaterial,
  WebGLRenderer,
  Scene,
  HemisphereLight
} from 'three'

/** * KLASE ***/

function Kamera () {
  const temp = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
  temp.position.set(0, 0, -1000)
  return temp
}

function Kontrole () {
  const temp = new THREE.OrbitControls(kamera)
  temp.rotateSpeed = 1.0
  temp.zoomSpeed = 1.2
  temp.panSpeed = 0.8
  return temp
}

function Geometrija () {
  const temp = new Mesh(
    new TorusGeometry(120, 60, 40, 40),
    new MeshNormalMaterial()
  )
  temp.position.set(0, 0, 0)
  return temp
}

function Renderer () {
  const temp = new WebGLRenderer({
    antialias: true
  })
  temp.setClearColor(0xffffff, 1)
  temp.setSize(window.innerWidth, window.innerHeight)
  temp.domElement.style.zIndex = 5
  return temp
}

function DivElement (paragraf) {
  const temp = new THREE.CSS3DObject(paragraf)
  temp.position.x = 0
  temp.position.y = 0
  temp.position.z = -185
  temp.rotation.y = Math.PI
  return temp
}

function Renderer2 () {
  const temp = new THREE.CSS3DRenderer()
  temp.setSize(window.innerWidth, window.innerHeight)
  temp.domElement.style.position = 'absolute'
  temp.domElement.style.top = 0
  return temp
}

/** * INSTANCE ***/

const kamera = Kamera()
const controls = Kontrole()
const scena = new Scene()
const geometrija = Geometrija()
const svetlo = new HemisphereLight(0xffbf67, 0x15c6ff)
const renderer = Renderer()
const scena2 = new Scene()
const paragraf = document.querySelector('#intro')
const div = DivElement(paragraf)
const renderer2 = Renderer2()

/** * FUNKCIJE ***/

function init () {
  scena.add(geometrija)
  scena.add(svetlo)
  document.body.appendChild(renderer.domElement)
  scena2.add(div)
  document.body.appendChild(renderer2.domElement)
}

function animiraj () {
  window.requestAnimationFrame(animiraj)
  renderer2.render(scena2, kamera)
  renderer.render(scena, kamera)
  controls.update()
}

/** * TOK ***/

init()
animiraj()