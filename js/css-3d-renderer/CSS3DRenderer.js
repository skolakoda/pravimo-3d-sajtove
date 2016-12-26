import {Math as Math3D} from 'three'
import {cameraElement} from './elements/camera-element'
import {domElement} from './elements/dom-element'
import {getCameraCSSMatrix} from './renderer-helpers'
import {
  cache,
  renderObject
} from './render-object'

let _width, _height
let _widthHalf, _heightHalf

export function CSS3DRenderer () {
  this.domElement = domElement
  domElement.appendChild(cameraElement)

  this.setClearColor = function () {}

  this.getSize = function () {
    return {
      width: _width,
      height: _height
    }
  }

  this.setSize = function (width, height) {
    _width = width
    _height = height

    _widthHalf = _width / 2
    _heightHalf = _height / 2

    domElement.style.width = width + 'px'
    domElement.style.height = height + 'px'

    cameraElement.style.width = width + 'px'
    cameraElement.style.height = height + 'px'
  }

  this.render = function (scene, camera) {
    const fov = 0.5 / Math.tan(Math3D.degToRad(camera.getEffectiveFOV() * 0.5)) * _height

    if (cache.camera.fov !== fov) {
      domElement.style.WebkitPerspective = fov + 'px'
      domElement.style.MozPerspective = fov + 'px'
      domElement.style.oPerspective = fov + 'px'
      domElement.style.perspective = fov + 'px'

      cache.camera.fov = fov
    }

    scene.updateMatrixWorld()

    if (camera.parent === null) camera.updateMatrixWorld()

    camera.matrixWorldInverse.getInverse(camera.matrixWorld)

    const style = 'translate3d(0,0,' + fov + 'px)' + getCameraCSSMatrix(camera.matrixWorldInverse) +
      ' translate3d(' + _widthHalf + 'px,' + _heightHalf + 'px, 0)'

    if (cache.camera.style !== style) {
      cameraElement.style.WebkitTransform = style
      cameraElement.style.MozTransform = style
      cameraElement.style.oTransform = style
      cameraElement.style.transform = style

      cache.camera.style = style
    }

    renderObject(scene, camera)
  }
}
