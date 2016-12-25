const THREE = window.THREE
import {
  Scene,
  HemisphereLight
} from 'three'

import {Kamera} from './model/Kamera'
import {Kontrole} from './model/Kontrole'
import {Geometrija} from './model/Geometrija'
import {Renderer} from './model/Renderer'

/** * KLASE ***/

class DivElement extends THREE.CSS3DObject {
  constructor (paragraf) {
    super(paragraf)
    this.position.x = 0
    this.position.y = 0
    this.position.z = -185
    this.rotation.y = Math.PI
  }
}

class CssRenderer extends THREE.CSS3DRenderer {
  constructor () {
    super()
    this.setSize(window.innerWidth, window.innerHeight)
    this.domElement.style.position = 'absolute'
    this.domElement.style.top = 0
  }
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
const div = new DivElement(paragraf)
const cssRenderer = new CssRenderer()

/** * FUNKCIJE ***/

function init () {
  scena.add(geometrija)
  scena.add(svetlo)
  document.body.appendChild(renderer.domElement)
  scena2.add(div)
  document.body.appendChild(cssRenderer.domElement)
}

function animiraj () {
  window.requestAnimationFrame(animiraj)
  controls.update()
  cssRenderer.render(scena2, kamera)
  renderer.render(scena, kamera)
}

/** * TOK ***/

init()
animiraj()
