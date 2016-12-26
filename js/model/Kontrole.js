import * as THREE from 'three'
const OrbitControls = require('three-orbit-controls')(THREE)

export class Kontrole extends OrbitControls {
  constructor (kamera) {
    super(kamera)
    this.rotateSpeed = 1.0
    this.zoomSpeed = 1.2
    this.panSpeed = 0.8
  }
}
