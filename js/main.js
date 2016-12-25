const THREE = window.THREE
import {
  Scene,
  HemisphereLight
} from 'three'

import {Kamera} from './model/Kamera'
import {Kontrole} from './model/Kontrole'
import {Geometrija} from './model/Geometrija'
import {Renderer} from './model/Renderer'
import {RendererDOM} from './model/RendererDOM'

/** KLASE **/

class DivElement extends THREE.CSS3DObject {
  constructor (paragraf) {
    super(paragraf)
    this.position.x = 0
    this.position.y = 0
    this.position.z = 0 // -180
    this.rotation.y = Math.PI // vraca ga u normalu, default je rotirano
  }
}

/** INSTANCE **/

const kamera = new Kamera()
const kontrole = new Kontrole(kamera)

const scena3D = new Scene()
const geometrija = new Geometrija()
const svetlo = new HemisphereLight(0xffbf67, 0x15c6ff)
const renderer3D = new Renderer()

const scenaDOM = new Scene()
const paragraf = document.querySelector('#intro')
const div = new DivElement(paragraf)
const rendererDOM = new RendererDOM()

/** FUNKCIJE **/

function init () {
  scena3D.add(geometrija)
  scena3D.add(svetlo)
  scenaDOM.add(div)
}

function update () {
  window.requestAnimationFrame(update)
  kontrole.update()
  renderer3D.render(scena3D, kamera)
  rendererDOM.render(scenaDOM, kamera)
}

/** TOK **/

init()
update()
