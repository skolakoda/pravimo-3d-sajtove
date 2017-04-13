/* global THREE */

const cssRenderer = new THREE.CSS3DRenderer()
cssRenderer.setSize(window.innerWidth, window.innerHeight)
cssRenderer.domElement.style.position = 'absolute'
cssRenderer.domElement.style.top = 0

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000)
camera.position.set(0, 100, 3000)

// const controls = new THREE.TrackballControls(camera)

document.body.appendChild(cssRenderer.domElement)

const glScene = new THREE.Scene()
const cssScene = new THREE.Scene()

const ambientLight = new THREE.AmbientLight(0x555555)
glScene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff)
directionalLight.position.set(-.5, .5, -1.5).normalize()
glScene.add(directionalLight)

/** FUNCTIONS **/

function createPlane(w, h, position, rotation) {
  const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    opacity: 0.0,
    side: THREE.DoubleSide
  })
  const geometry = new THREE.PlaneGeometry(w, h)
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = position.x
  mesh.position.y = position.y
  mesh.position.z = position.z
  mesh.rotation.x = rotation.x
  mesh.rotation.y = rotation.y
  mesh.rotation.z = rotation.z

  return mesh
}

function createCssObject(w, h, position, rotation, url) {
  const html = [
    '<div style="width:' + w + 'px; height:' + h + 'px;">',
    '<iframe src="' + url + '" width="' + w + '" height="' + h + '">',
    '</iframe>',
    '</div>'
  ].join('\n')

  const div = document.createElement('div')
  div.innerHTML = html

  const cssObject = new THREE.CSS3DObject(div)
  cssObject.position.x = position.x
  cssObject.position.y = position.y
  cssObject.position.z = position.z
  cssObject.rotation.x = rotation.x
  cssObject.rotation.y = rotation.y
  cssObject.rotation.z = rotation.z

  return cssObject
}

function create3dPage(w, h, position, rotation, url) {
  const plane = createPlane(
      w, h,
      position,
      rotation)
  glScene.add(plane)

  const cssObject = createCssObject(
      w, h,
      position,
      rotation,
      url)
  cssScene.add(cssObject)
}

function update() {
  // controls.update()
  cssRenderer.render(cssScene, camera)
  requestAnimationFrame(update)
}

/** INIT **/

create3dPage(
  1000, 1000,
  new THREE.Vector3(-1050, 0, 400),
  new THREE.Vector3(0, 45 * Math.PI / 180, 0),
  'http://www.skolakoda.org/')

create3dPage(
  900, 1000,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 0),
  'http://www.skolakoda.org/')

create3dPage(
  1000, 1000,
  new THREE.Vector3(1050, 0, 400),
  new THREE.Vector3(0, -45 * Math.PI / 180, 0),
  'http://www.skolakoda.org/')

update()
