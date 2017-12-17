import compiler from '../test/compiler';
import * as fs from 'fs';
import * as path from 'path';

const file = name => path.resolve(__dirname, `../test/${name}`);
const fileContents = name => fs.readFileSync(file(name)).toString();

import { Mesh } from 'webgl-obj-loader';

describe('Test loading With Material', () => {
  test('example-w-material.obj', async () => {
    const data = (await compiler(file('example-w-material.obj'))).toJson();

    if (data.errors && data.errors.length > 0) throw Error(data.errors[0]);

    const output = data.modules[0].source;

    expect(output.replace(/\s/g, '')).toBe(`
  import { Mesh, Material } from 'webgl-obj-loader';
  const source = ${JSON.stringify(fileContents('example-w-material.obj'))};
  const mesh = new Mesh(source);
  const materialSource = ${JSON.stringify(fileContents('example-w-material.mtl'))};
  const materialLibrary = new MaterialLibrary(materialSource);
  mesh.addMaterialLibrary(materialLibrary);
  export default mesh;`.replace(/\s/g, ''));
  });
});

describe('Test loading Without Material', () => {
  test('example.obj', async () => {
    const data = (await compiler(file('example.obj'))).toJson();

    if (data.errors && data.errors.length > 0) throw Error(data.errors[0]);

    const output = data.modules[0].source;

    expect(output.replace(/\s/g, '')).toBe(`
  import { Mesh, Material } from 'webgl-obj-loader';
  const source = ${JSON.stringify(fileContents('example.obj'))};
  const mesh = new Mesh(source);
  export default mesh;`.replace(/\s/g, ''));
  });
});

describe('Test loading Missing Material', () => {
  test('example-m-material.obj', async () => {
    const data = (await compiler(file('example-m-material.obj'))).toJson();

    if (data.errors && data.errors.length > 0) throw Error(data.errors[0]);

    const output = data.modules[0].source;

    expect(output.replace(/\s/g, '')).toBe(`
  import { Mesh, Material } from 'webgl-obj-loader';
  const source = ${JSON.stringify(fileContents('example-m-material.obj'))};
  const mesh = new Mesh(source);
  export default mesh;`.replace(/\s/g, ''));
  });
});
