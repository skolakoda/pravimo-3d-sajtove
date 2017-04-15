# Učimo 3D sajtove

Učimo 3D sajtove, 3D transformišemo DOM.

`Three.js` i njegov `CSS3DRenderer` su neviđeno olakšali 3D transformacije HTML elemenata.

## Dokumentacija

### Kontrole kamere

```js
const kontrole = new THREE.OrbitControls(kamera)
```

Ograničava horizontalno (mora u intervalu od `-Math.PI` od `Math.PI`):

```js
kontrole.minAzimuthAngle = - Math.PI / 2
kontrole.maxAzimuthAngle = Math.PI / 2
```

Ograničava vertikalno:

```js
kontrole.minPolarAngle = 0
kontrole.maxPolarAngle = Math.PI
```

Napomena: Kontrole ubijaju HTML (ne radi selekcija, input i slično)!

## Linkovi

* http://jsfiddle.net/MdPrb/7/ (geometrija sa CSS3DRenderer)
* http://learningthreejs.com/blog/2013/04/30/closing-the-gap-between-html-and-webgl/
* http://adndevblog.typepad.com/cloud_and_mobile/2015/07/embedding-webpages-in-a-3d-threejs-scene.html
* https://www.packtpub.com/mapt/book/web-development/9781783980864/6
