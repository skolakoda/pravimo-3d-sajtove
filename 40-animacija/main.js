/* global THREE, TWEEN */

const width = window.innerWidth
const height = window.innerHeight
const currentElements = []

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
  img.src = `http://lorempixel.com/140/140?${i}`  // nasumicni query string zbog keširanja
  return new THREE.CSS3DObject(img)
}

/**
* return an array of objects:
* {
*  pos: THREE.Vector3(),
*  rot: THREE.Matrix4()
* }
*/
function getPositionAndRotation(geometry, offset) {
  const result = []
  for (let i = 0; i < geometry.faces.length; i += 2) {
    const face = geometry.faces[i]
    const faceNext = geometry.faces[i + 1]
    const position = new THREE.Vector3()
      .copy(geometry.vertices[face.a])
      .add(geometry.vertices[face.b])
      .add(geometry.vertices[face.c])
      .add(geometry.vertices[faceNext.a])
      .add(geometry.vertices[faceNext.b])
      .add(geometry.vertices[faceNext.c])
      .divideScalar(6).multiplyScalar(offset)
    const up = new THREE.Vector3(0, 0, 1)
    const normal = new THREE.Vector3()
      .addVectors(face.normal, faceNext.normal)
      .divideScalar(2)
    const axis = new THREE.Vector3()
      .crossVectors(up, normal)
    const angle = Math.atan2(axis.length(), up.dot(normal))
    axis.normalize()
    const rotationToApply = new THREE.Matrix4()
      .makeRotationAxis(axis, angle)
    result.push({pos: position, rot: rotationToApply})
  }
  return result
}

function updateStructure(geometry, offset) {
  const positionAndRotation = getPositionAndRotation(geometry, offset)
  const tweenIn = new TWEEN.Tween({opacity: 0})
  .to({pos: 1.0}, 3000)
  .onUpdate(function() {
    const percent = this.pos
    currentElements.forEach((cssObject, i) => {
      const currentPos = positionAndRotation[i].currentPos
      const targetPos = positionAndRotation[i].pos
      const currentRotation = positionAndRotation[i].currentRotation
      const targetRotation = new THREE.Euler()
        .setFromRotationMatrix(positionAndRotation[i].rot)
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
    positionAndRotation[i].currentPos = element.position
    positionAndRotation[i].currentRotation = element.rotation
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

/** EXEC **/

updateStructure(new THREE.PlaneGeometry(30, 30, 8, 8), 40)
// updateStructure(new THREE.CylinderGeometry(12, 12, 27, 15, 7, true), 40)
render()

window.addEventListener('resize', handleResize, false)
