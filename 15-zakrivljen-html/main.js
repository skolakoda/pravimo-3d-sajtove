
const string = '<div>' +
        '<h1>This is an H1 Element.</h1>' +
        '<span class="large">Hello Essential Three.js</span>' +
        '<textarea> And this is a textarea</textarea>' +
        '</div>'

const scene = new THREE.Scene()

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = 0
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 500
camera.position.y = 500
camera.position.z = 500
camera.lookAt(scene.position)

const clone = createCSS3DObject(string)
clone.position.set(100, 100, 100)
scene.add(clone)

function createCSS3DObject(s) {
  const div = document.createElement('div')
  div.innerHTML = s
  div.style.width = '370px'
  div.style.height = '370px'
  div.style.opacity = 0.7
  div.style.background = new THREE.Color(Math.random() * 0xffffff).getStyle()
  const object = new THREE.CSS3DObject(div)
  return object
}

function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

render()
window.addEventListener('resize', handleResize, false)
