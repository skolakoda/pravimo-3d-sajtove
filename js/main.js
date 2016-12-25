const THREE = window.THREE
import {
  Scene,
  HemisphereLight
} from 'three'

import {Kamera} from './klase/Kamera'
import {Kontrole} from './klase/Kontrole'
import {Geometrija} from './klase/Geometrija'
import {Renderer} from './klase/Renderer'

/** * KLASE ***/

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

const kamera = new Kamera()
const controls = new Kontrole(kamera)
const scena = new Scene()
const geometrija = new Geometrija()
const svetlo = new HemisphereLight(0xffbf67, 0x15c6ff)
const renderer = new Renderer()
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
