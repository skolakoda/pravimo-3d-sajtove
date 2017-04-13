/* global THREE, TWEEN, dat */

const offscreen = new THREE.Vector3(1000, 0, 1000)
const currentElements = []
let newlyAddedElements = []
let toBeRemovedElements = []
let positionAndRotation = []

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 1200
camera.position.y = 1200
camera.position.z = 1200
camera.lookAt(scene.position)

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = 0
document.body.appendChild(renderer.domElement)

const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.autoRotate = true

/** FUNCTIONS **/

function createCSS3DObject(i) {
  const img = document.createElement('img')
  img.src = `http://lorempixel.com/140/140?${i}`
  return new THREE.CSS3DObject(img)
}

/**
* The first thing we need when we want to map the divs to a new model, is the position and the rotation
* matrix that needs to be applied to move the object to its new position. To calculate this we analyze
* the provided geometry, and use the faces to calculate the rotation and the position. This return an
* array with the following elements:
* {
*  pos: THREE.Vector3(),
*  rot: THREE.Matrix4()
* }
* @param geometry
*/
function getPositionAndRotation(geometry, offset) {
  const result = []
  for (let iFace = 0; iFace < geometry.faces.length; iFace += 2) {
    let newPosition = new THREE.Vector3(0, 0, 0)
    // get this face and the next which both make the cube
    const face = geometry.faces[iFace]
    const faceNext = geometry.faces[iFace + 1]
    // calculate the position of where the elements need to go to.
    const centroid = new THREE.Vector3()
    centroid.copy(geometry.vertices[face.a])
            .add(geometry.vertices[face.b])
            .add(geometry.vertices[face.c])
            .add(geometry.vertices[faceNext.a])
            .add(geometry.vertices[faceNext.b])
            .add(geometry.vertices[faceNext.c])
            .divideScalar(6).multiplyScalar(offset)
    newPosition = centroid.clone()
    // Now we need to rotate the div to the correct position
    const up = new THREE.Vector3(0, 0, 1)
    // we get the vector from both of the triangle, and use the average
    const normal = new THREE.Vector3()
    normal.addVectors(face.normal, faceNext.normal)
    normal.divideScalar(2)
    // We calculate the axis on which to rotate by
    // selecting the cross of the vectors
    const axis = new THREE.Vector3()
    axis.crossVectors(up, normal)
    // based on the axis, in relation to our normal vector
    // we can calculate the angle.
    const angle = Math.atan2(axis.length(), up.dot(normal))
    axis.normalize()
    // now we can use matrix function to rotate the object so
    // it is aligned with the normal from the face
    const rotationToApply = new THREE.Matrix4()
    rotationToApply.makeRotationAxis(axis, angle)
    result.push({pos: newPosition, rot: rotationToApply})
  }
  return result
}

function updateStructure(geometry, offset) {
  positionAndRotation = getPositionAndRotation(geometry, offset)
  const tweenIn = new TWEEN.Tween({opacity: 0})
  .to({pos: 1.0}, 3000)
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .onUpdate(function() {
    const toSet = this.pos
    newlyAddedElements.forEach(cssObject => cssObject.element.style.opacity = toSet)

    currentElements.forEach((cssObject, i) => {
      const currentPos = positionAndRotation[i].currentPos
      const targetPos = positionAndRotation[i].pos
      const currentRotation = positionAndRotation[i].currentRotation
      const targetRotation = new THREE.Euler()
      targetRotation.setFromRotationMatrix(positionAndRotation[i].rot)
      if (currentPos) {
        cssObject.position.x = currentPos.x + (targetPos.x - currentPos.x) * toSet
        cssObject.position.y = currentPos.y + (targetPos.y - currentPos.y) * toSet
        cssObject.position.z = currentPos.z + (targetPos.z - currentPos.z) * toSet
        cssObject.rotation.x = currentRotation.x + (targetRotation.x - currentRotation.x) * toSet
        cssObject.rotation.y = currentRotation.y + (targetRotation.y - currentRotation.y) * toSet
        cssObject.rotation.z = currentRotation.z + (targetRotation.z - currentRotation.z) * toSet
      }
    })
  })
  tweenIn.start()

  // some cleanup
  newlyAddedElements = []
  toBeRemovedElements = []

  // either move or create the elements
  for (let i = 0; i < positionAndRotation.length; i++) {
    if (currentElements.length > i) {
      //  move one of the existing
      const element = currentElements[i]
      positionAndRotation[i].currentPos = element.position.clone()
      positionAndRotation[i].currentRotation = element.rotation.clone()
    } else {
      // create a new one
      const element = createCSS3DObject(i)
      element.position = offscreen.clone()
      positionAndRotation[i].currentPos = element.position.clone()
      positionAndRotation[i].currentRotation = element.rotation.clone()
      // set initial opacity to 0
      element.element.style.opacity = 0
      // add to the array to keep track of
      currentElements.push(element)
      newlyAddedElements.push(element)
      scene.add(element)
    }
  }
  // finally remove the elements that aren't needed anymore
  for (let i = positionAndRotation.length; i < currentElements.length; i++) {
    toBeRemovedElements.push(currentElements[i])
  }
  // and remove them from the scene
  for (let i = 0; i < toBeRemovedElements.length; i++) {
    scene.remove(currentElements.pop())
  }
}

function addControlGui(controlObject) {
  const gui = new dat.GUI()
  gui.add(controlObject, 'toCube')
  gui.add(controlObject, 'toSphere')
  gui.add(controlObject, 'toCylinder')
  gui.add(controlObject, 'toPlane')
}

function render() {
  requestAnimationFrame(render)
  TWEEN.update()
  controls.update()
  renderer.render(scene, camera)
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

/** CALLS **/

const gui = {
  toCube() {
    updateStructure(new THREE.BoxGeometry(20, 14, 20, 5, 3, 5), 40)
  },
  toCylinder() {
    updateStructure(new THREE.CylinderGeometry(12, 12, 27, 15, 7, true), 40)
  },
  toSphere() {
    updateStructure(new THREE.SphereGeometry(17, 10, 10), 40)
  },
  toPlane() {
    updateStructure(new THREE.TorusGeometry(20, 10, 8, 10), 25)
  }
}

addControlGui(gui)
updateStructure(new THREE.PlaneGeometry(30, 30, 8, 8), 40)
render()

window.addEventListener('resize', handleResize, false)
