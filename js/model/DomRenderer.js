import {CSS3DRenderer} from '../css-3d-renderer/CSS3DRenderer'

/**
 * DOM Renderer, pravi prazan div velicine ekrana u kome se renderuju elementi
 */
export class DomRenderer extends CSS3DRenderer {
  constructor () {
    super()
    this.setSize(window.innerWidth, window.innerHeight)
    this.domElement.style.position = 'absolute'
    this.domElement.style.top = 0
    document.body.appendChild(this.domElement)
  }
}
