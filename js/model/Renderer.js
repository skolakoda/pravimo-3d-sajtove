import {WebGLRenderer} from 'three'

export class Renderer extends WebGLRenderer {
  constructor () {
    super({
      antialias: true
    })
    this.setSize(window.innerWidth, window.innerHeight)
    this.setClearColor(0xffffff, 1)
    document.body.appendChild(this.domElement)
  }
}
