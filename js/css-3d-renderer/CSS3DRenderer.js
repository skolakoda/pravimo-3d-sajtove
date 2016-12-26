import {
  Matrix4,
  Math as Math3D
} from 'three'

import {CSS3DObject} from './CSS3DObject'
import {CSS3DSprite} from './CSS3DSprite'

import {
  getCameraCSSMatrix,
  getObjectCSSMatrix
} from './renderer-helpers'

var cache = {
  camera: { fov: 0, style: '' },
  objects: {}
}
var cameraElement = document.createElement('div')

var renderObject = function (object, camera) {
  if (object instanceof CSS3DObject) {
    var style

    if (object instanceof CSS3DSprite) {
      // http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/
      var matrix = new Matrix4()
      matrix.copy(camera.matrixWorldInverse)
      matrix.transpose()
      matrix.copyPosition(object.matrixWorld)
      matrix.scale(object.scale)

      matrix.elements[ 3 ] = 0
      matrix.elements[ 7 ] = 0
      matrix.elements[ 11 ] = 0
      matrix.elements[ 15 ] = 1

      style = getObjectCSSMatrix(matrix)
    } else {
      style = getObjectCSSMatrix(object.matrixWorld)
    }

    var element = object.element
    var cachedStyle = cache.objects[ object.id ]

    if (cachedStyle === undefined || cachedStyle !== style) {
      element.style.WebkitTransform = style
      element.style.MozTransform = style
      element.style.oTransform = style
      element.style.transform = style

      cache.objects[ object.id ] = style
    }

    if (element.parentNode !== cameraElement) {
      cameraElement.appendChild(element)
    }
  }

  for (var i = 0, l = object.children.length; i < l; i++) {
    renderObject(object.children[ i ], camera)
  }
}

export function CSS3DRenderer () {
  var _width, _height
  var _widthHalf, _heightHalf

  var domElement = document.createElement('div')
  domElement.style.overflow = 'hidden'

  domElement.style.WebkitTransformStyle = 'preserve-3d'
  domElement.style.MozTransformStyle = 'preserve-3d'
  domElement.style.oTransformStyle = 'preserve-3d'
  domElement.style.transformStyle = 'preserve-3d'

  this.domElement = domElement

  cameraElement.style.WebkitTransformStyle = 'preserve-3d'
  cameraElement.style.MozTransformStyle = 'preserve-3d'
  cameraElement.style.oTransformStyle = 'preserve-3d'
  cameraElement.style.transformStyle = 'preserve-3d'

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
    var fov = 0.5 / Math.tan(Math3D.degToRad(camera.getEffectiveFOV() * 0.5)) * _height

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

    var style = 'translate3d(0,0,' + fov + 'px)' + getCameraCSSMatrix(camera.matrixWorldInverse) +
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
