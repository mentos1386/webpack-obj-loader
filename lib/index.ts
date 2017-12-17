export default function (source) {
  this.cacheable();

  return `
  import { Mesh } from 'webgl-obj-loader';
  const source = ${JSON.stringify(source)};
  const mesh = new Mesh(source);
  export default mesh;`;
}
