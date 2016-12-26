import {Math as Math3D} from 'three'
import {cache, cameraElement} from './shared'
import {getCameraCSSMatrix} from './functions/renderer-helpers'
import {renderObject} from './functions/render-object'

let _width, _height
let _widthHalf, _heightHalf

export class CSS3DRenderer {

  constructor () {
    this.domElement = document.createElement('div')
    this.domElement.style.overflow = 'hidden'
    this.domElement.style.transformStyle = 'preserve-3d'
    this.domElement.appendChild(cameraElement)
  }

  getSize () {
    return {
      width: _width,
      height: _height
    }
  }

  setSize (width, height) {
    _width = width
    _height = height

    _widthHalf = _width / 2
    _heightHalf = _height / 2

    this.domElement.style.width = width + 'px'
    this.domElement.style.height = height + 'px'

    cameraElement.style.width = width + 'px'
    cameraElement.style.height = height + 'px'
  }

  render (scene, camera) {
    const fov = 0.5 / Math.tan(Math3D.degToRad(camera.getEffectiveFOV() * 0.5)) * _height

    if (cache.camera.fov !== fov) {
      this.domElement.style.perspective = fov + 'px'
      cache.camera.fov = fov
    }

    scene.updateMatrixWorld()

    if (camera.parent === null) camera.updateMatrixWorld()

    camera.matrixWorldInverse.getInverse(camera.matrixWorld)

    const style = 'translate3d(0,0,' + fov + 'px)' + getCameraCSSMatrix(camera.matrixWorldInverse) +
      ' translate3d(' + _widthHalf + 'px,' + _heightHalf + 'px, 0)'

    if (cache.camera.style !== style) {
      cameraElement.style.transform = style
      cache.camera.style = style
    }

    renderObject(scene, camera)
  }
}
