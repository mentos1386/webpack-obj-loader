const name = 'webpack-obj-loader';

export default function (source) {
  this.cacheable();

  return `
  import { Mesh } from 'webgl-obj-loader';
  const source = \`${source}\`;
  export default new Mesh(source);`;
}
