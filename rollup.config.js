import path from 'path';
import scss from 'rollup-plugin-scss';

export default [{
  input: 'src/scripts/index.js',
  output: {
    file: '_site/scripts/bundle.js',
    format: 'esm'
  },
}]
