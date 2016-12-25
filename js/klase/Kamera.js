import {PerspectiveCamera} from 'three'

export class Kamera extends PerspectiveCamera {
  constructor () {
    super(45, window.innerWidth / window.innerHeight, 1, 10000)
    this.position.set(0, 0, -1000)
  }
}
