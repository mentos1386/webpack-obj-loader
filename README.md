# Webpack loader for OBJ

Loading OBJ files by using frenchtoast747's [webgl-obj-loader](https://github.com/frenchtoast747/webgl-obj-loader).
It's actually just a wrapper, it resolves `new Mesh(source)`.

## Install

```shell
npm install --save-dev webpack-obj-loader
```

## Usage

```javascript
{
    module: {
        loaders: [
            {
                test: /\.obj$/,
                loader: 'webpack-obj-loader'
            }
        ]
    }
}
```

and then

```javascript
import myLovelyObject from './myLovelyShader.obj');
```

