import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import scss from 'rollup-plugin-scss';

const src = path.join('src');
const dst = path.join('_site');

export default [{
  input: path.join(src, 'scripts', 'index.js'),
  plugins: [
    commonjs({ extensions: ['.js', '.ts'] }),
    nodeResolve({
      browser: true,
      preferBuiltins: false
    }),
    builtins(),
    globals(),
  ],
  output: {
    file: path.join(dst, 'scripts', 'index.js'),
    format: 'es'
  }
},{
  input: path.join(src, 'styles', 'index.js'),
  plugins: [
    scss({
      verbose: true,
      include: [
        path.join(src, 'styles', '*.css'),
        path.join(src, 'styles', '*.scss'),
      ],
      output: path.join(dst, 'styles', 'style.css'),
    })
  ]
}]
