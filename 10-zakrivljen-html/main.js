/* global THREE */

const scena = new THREE.Scene()

const kamera = new THREE.PerspectiveCamera()
kamera.position.set(117, 35, 790)
kamera.lookAt(scena.position)
scena.add(kamera)

const html3D = new THREE.CSS3DObject(document.querySelector('#main'))
scena.add(html3D)

const renderer = new THREE.CSS3DRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scena, kamera)
document.querySelector('#renderer').appendChild(renderer.domElement)
