import {Object3D} from 'three'

export class CSS3DObject extends Object3D {
  constructor (element) {
    super(element)
    this.element = element
    element.style.position = 'absolute'
    this.addEventListener('removed', () => {
      if (element.parentNode !== null) {
        element.parentNode.removeChild(element)
      }
    })
  }
}
