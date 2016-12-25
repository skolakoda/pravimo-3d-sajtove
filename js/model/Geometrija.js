import {
  Mesh,
  TorusGeometry,
  MeshNormalMaterial
} from 'three'

export class Geometrija extends Mesh {
  constructor () {
    super(new TorusGeometry(120, 60, 40, 40), new MeshNormalMaterial())
    this.position.set(0, 0, 0)
  }
}
