/* global THREE, TWEEN */

const width = window.innerWidth
const height = window.innerHeight

/** INIT **/

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
camera.position.set(1200, 1200, 1200)

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.autoRotate = true

/** FUNCTIONS **/

function createImgObject(i) {
  const img = document.createElement('img')
  img.src = `http://lorempixel.com/140/140?${i}`  // nasumicni query string zbog keširanja
  return new THREE.CSS3DObject(img)
}

function createDomObjects(vertices) {
	const domObjects = []
	vertices.map((v, i) => {
		const obj = createImgObject(i)
		domObjects.push(obj)
		scene.add(obj)
	})
	return domObjects
}

// return an array of objects with pos
function getVertices(geometry, offset) {
  const result = []
  for (let i = 0; i < geometry.faces.length; i += 2) {
    const face = geometry.faces[i]
    const faceNext = geometry.faces[i + 1]
	const pos = new THREE.Vector3()
      .copy(geometry.vertices[face.a])
      .add(geometry.vertices[face.b])
      .add(geometry.vertices[face.c])
      .add(geometry.vertices[faceNext.a])
      .add(geometry.vertices[faceNext.b])
      .add(geometry.vertices[faceNext.c])
      .divideScalar(6).multiplyScalar(offset)
    result.push({pos})
  }
  return result
}

function startTween(domObjects, vertices) {
  const tweenIn = new TWEEN.Tween({opacity: 0})
  .to({pos: 1.0}, 3000)
  .onUpdate(function() {
    const percent = this.pos
    domObjects.forEach((obj, i) => {
      const currentPos = vertices[i].currentPos
      const targetPos = vertices[i].pos
		;['x', 'y', 'z'].forEach(function (k) {
			obj.position[k] = currentPos[k] + (targetPos[k] - currentPos[k]) * percent
		})
    })
  })
  tweenIn.start()
}

function update() {
  requestAnimationFrame(update)
  controls.update()
  TWEEN.update()
  renderer.render(scene, camera)
}

/** EXEC **/

const vertices = getVertices(new THREE.PlaneGeometry(30, 30, 8, 8), 40)
const elements = createDomObjects(vertices)
vertices.map((v, i) => v.currentPos = elements[i].position)	// add currentPos

startTween(elements, vertices)
update()
