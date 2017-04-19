# Učimo 3D sajtove

Pravimo 3D sajtove, 3D transformišemo DOM. `Three.js` i `CSS3DRenderer` su neviđeno olakšali 3D transformacije stranica.

## Primeri

* [zakrivljen-html](http://skolakoda.org/ucimo-3d-sajtove/10-zakrivljen-html/)
* [3d-strana](http://skolakoda.org/ucimo-3d-sajtove/15-3d-strana/)
* [3d-strane](http://skolakoda.org/ucimo-3d-sajtove/18-3d-strane/)
* [3d-geometrija](http://skolakoda.org/ucimo-3d-sajtove/20-3d-geometrija/)
* [css-geometrija](http://skolakoda.org/ucimo-3d-sajtove/25-css-geometrija)
* [frejm](http://skolakoda.org/ucimo-3d-sajtove/30-frejm/)
* [frejmovi](http://skolakoda.org/ucimo-3d-sajtove/35-frejmovi/)
* [frejmovi-pod](http://skolakoda.org/ucimo-3d-sajtove/38-frejmovi-pod/)
* [animacija](http://skolakoda.org/ucimo-3d-sajtove/40-animacija/)
* [video](http://skolakoda.org/ucimo-3d-sajtove/50-video/)

## Dokumentacija

### Kontrole kamere

Kontrole ubijaju HTML funkcionalnost (ne radi selekcija, input i slično)!

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

## Izvor

Neki [primeri](https://github.com/josdirksen/essential-threejs) su preuzeti iz knjige *Three.js Essentials*, Josa Dirksena.
