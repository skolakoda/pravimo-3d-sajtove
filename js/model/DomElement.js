const THREE = window.THREE

export class DomElement extends THREE.CSS3DObject {
  constructor (innerElement) {
    super(innerElement)
    this.rotation.y = Math.PI // vraca u normalu, default je naopacke
    this.position.x = 0
    this.position.y = 0
    this.position.z = -200 // priblizava po z osi (zumira)
  }
}
