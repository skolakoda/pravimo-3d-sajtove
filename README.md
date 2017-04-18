# Učimo 3D sajtove

Pravimo 3D sajtove, 3D transformišemo DOM. `Three.js` i `CSS3DRenderer` su neviđeno olakšali 3D transformacije stranica.

Pogledaj primere na:
http://skolakoda.org/ucimo-3d-sajtove/

## Dokumentacija

### Kontrole kamere

```js
const kontrole = new THREE.OrbitControls(kamera)
```

Ograničava horizontalno (mora u intervalu od `-Math.PI` od `Math.PI`):

```js
kontrole.minAzimuthAngle = - Math.PI
kontrole.maxAzimuthAngle = Math.PI
```

Ograničava vertikalno:

```js
kontrole.minPolarAngle = 0
kontrole.maxPolarAngle = Math.PI
```

Napomena: Kontrole ubijaju HTML (ne radi selekcija, input i slično)!

## Linkovi

* http://jsfiddle.net/MdPrb/7/ (geometrija sa CSS3DRenderer)
* https://threejs.org/examples/#css3d_panorama
* http://adndevblog.typepad.com/cloud_and_mobile/2015/07/embedding-webpages-in-a-3d-threejs-scene.html
* https://www.packtpub.com/mapt/book/web-development/9781783980864/6
