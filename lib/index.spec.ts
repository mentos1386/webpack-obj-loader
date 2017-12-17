import compiler from '../test/compiler';
import * as fs from 'fs';
import * as path from 'path';

const file = name => path.resolve(__dirname, `../test/${name}.obj`);
const fileContents = name => fs.readFileSync(file(name));

import { Mesh } from 'webgl-obj-loader';

describe('Test loading', () => {
  test('example.obj', async () => {
    const data = (await compiler(file('example'))).toJson();

    if (data.errors && data.errors.length > 0) throw Error(data.errors[0]);

    const output = data.modules[0].source;

    expect(output).toBe(`
  import { Mesh } from 'webgl-obj-loader';
  const source = \`${fileContents('example')}\`;
  export default new Mesh(source);`);
  });

});
