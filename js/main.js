import {
  Scene,
  HemisphereLight
} from 'three'

import {Kamera} from './model/Kamera'
import {Kontrole} from './model/Kontrole'
import {Geometrija} from './model/Geometrija'
import {Renderer} from './model/Renderer'
import {DomRenderer} from './model/DomRenderer'
import {DomElement} from './model/DomElement'

/** INSTANCE **/

const kamera = new Kamera()
const kontrole = new Kontrole(kamera)

const scena3D = new Scene()
const geometrija = new Geometrija()
const svetlo = new HemisphereLight(0xffbf67, 0x15c6ff)
const renderer3D = new Renderer()

const scenaDOM = new Scene()
const div = new DomElement(document.querySelector('#intro'))
const rendererDOM = new DomRenderer()

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
