/* global THREE */

const d = 50
const r = Math.PI / 2
const sides = [
  {
    pos: [ d, 0, 0 ],
    rot: [ 0, r, 0 ]
  },
  {
    pos: [ -d, 0, 0 ],
    rot: [ 0, -r, 0 ]
  },
  {
    pos: [ 0, d, 0 ],
    rot: [ -r, 0, 0 ]
  },
  {
    pos: [ 0, -d, 0 ],
    rot: [ r, 0, 0 ]
  },
  {
    pos: [ 0, 0, d ],
    rot: [ 0, 0, 0 ]
  },
  {
    pos: [ 0, 0, -d ],
    rot: [ 0, 0, 0 ]
  }
]
const size = d * 2

/* KLASE */

class CssPlane extends THREE.CSS3DObject {
  constructor(pos, rot, d) {
    const element = document.createElement('div')
    element.style.width = element.style.height = `${d}px`
    element.style.background = '#' + parseInt(Math.random() * 0xffffff).toString(16)
    element.style.opacity = '0.50'
    super(element)
    this.position.fromArray(pos)
    this.rotation.fromArray(rot)
  }
}

/* INIT */

const scene = new THREE.Scene()

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = 0
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera()
camera.aspect = window.innerWidth / window.innerHeight
camera.position.set(200, 100, 250)

const controls = new THREE.TrackballControls(camera)

const cube = new THREE.Group()
sides.map(side => cube.add(new CssPlane(side.pos, side.rot, size)))
scene.add(cube)

function update() {
  requestAnimationFrame(update)
  controls.update()
  renderer.render(scene, camera)
}

update()
