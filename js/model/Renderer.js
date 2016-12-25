import {WebGLRenderer} from 'three'

export class Renderer extends WebGLRenderer {
  constructor () {
    super({
      antialias: true
    })
    this.setClearColor(0xffffff, 1)
    this.setSize(window.innerWidth, window.innerHeight)
    this.domElement.style.zIndex = 5
  }
}
