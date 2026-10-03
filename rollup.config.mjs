import path from 'node:path';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';

const src = path.join('src');
const dst = path.join('_site');

export default {
  input: path.join(src, 'scripts', 'index.js'),
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs({ extensions: ['.js', '.ts'] }),
  ],
  output: {
    file: path.join(dst, 'scripts', 'index.js'),
    format: 'es'
  }
};
