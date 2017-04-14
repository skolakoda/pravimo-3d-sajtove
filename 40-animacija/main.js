/* global THREE, TWEEN */

const width = window.innerWidth
const height = window.innerHeight
const currentElements = []
let positionAndRotation = []

/** INIT **/

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
camera.position.x = 1200
camera.position.y = 1200
camera.position.z = 1200
camera.lookAt(scene.position)

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(width, height)
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
  .onUpdate(function() {
    const percent = this.pos
    currentElements.forEach((cssObject, i) => {
      const currentPos = positionAndRotation[i].currentPos
      const targetPos = positionAndRotation[i].pos
      const currentRotation = positionAndRotation[i].currentRotation
      const targetRotation = new THREE.Euler()
      targetRotation.setFromRotationMatrix(positionAndRotation[i].rot)
      if (currentPos) {
        cssObject.position.x = currentPos.x + (targetPos.x - currentPos.x) * percent
        cssObject.position.y = currentPos.y + (targetPos.y - currentPos.y) * percent
        cssObject.position.z = currentPos.z + (targetPos.z - currentPos.z) * percent
        cssObject.rotation.x = currentRotation.x + (targetRotation.x - currentRotation.x) * percent
        cssObject.rotation.y = currentRotation.y + (targetRotation.y - currentRotation.y) * percent
        cssObject.rotation.z = currentRotation.z + (targetRotation.z - currentRotation.z) * percent
      }
    })
  })
  tweenIn.start()

  for (let i = 0; i < positionAndRotation.length; i++) {
    const element = createCSS3DObject(i)
    positionAndRotation[i].currentPos = element.position.clone()
    positionAndRotation[i].currentRotation = element.rotation.clone()
    currentElements.push(element)
    scene.add(element)
  }
}

function render() {
  requestAnimationFrame(render)
  TWEEN.update()
  controls.update()
  renderer.render(scene, camera)
}

function handleResize() {
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

/** CALLS **/

updateStructure(new THREE.PlaneGeometry(30, 30, 8, 8), 40)
// updateStructure(new THREE.CylinderGeometry(12, 12, 27, 15, 7, true), 40)
render()

window.addEventListener('resize', handleResize, false)
