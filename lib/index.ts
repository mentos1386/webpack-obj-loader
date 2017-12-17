import * as fs from 'fs';

import { MaterialLibrary } from 'webgl-obj-loader';

const getFile = file => new Promise((resolve, reject) => fs.readFile(
  file,
  (err, data) => err ? reject(err) : resolve(data.toString())));

const existsFile = file => new Promise(resolve => fs.exists(file, resolve));

async function getTextures(path, textures) {

}

async function getMaterial(path: string): Promise<string> {
  const mtlFile = await getFile(path);

  // TODO: Maybe load textures here?

  return `
    const materialSource = ${JSON.stringify(mtlFile)};
    const materialLibrary = new MaterialLibrary(materialSource);
    mesh.addMaterialLibrary(materialLibrary);
    `;
}

export default function (source: string): void {
  this.cacheable();
  this.async();

  const run = async () => {
    let additional = '';

    const mtlPath = this.resourcePath.replace(/\.obj$/, '.mtl');
    console.log(mtlPath);

    if (await existsFile(mtlPath)) additional += await getMaterial(mtlPath);

    this.callback(null, `
  import { Mesh, MaterialLibrary } from 'webgl-obj-loader';
  const source = ${JSON.stringify(source)};
  const mesh = new Mesh(source);
  ${additional}
  export default mesh;`);
  };

  run().catch((err) => {
    throw err;
  });
}
