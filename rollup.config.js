// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import path from 'path';

export default [{
  input: 'src/scripts/main.js',
  output: {
    file: 'src/scripts/bundle.js',
    format: 'iife'
  },
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs({
      namedExports: {
        'node_modules/focus-trap/': 'default'
      }
    })
  ]
}, {
  input: 'src/styles/index.scss',
  output: {
    file: 'src/styles/bundle.css',
    format: 'es'
  },
  plugins: [
    postcss({
      use: [
        ['sass', {
          includePaths: [
            path.resolve('node_modules')
          ]
        }]
      ],
      // minimize: true,
      extensions: ['.css', 'scss'],
      extract: true
    })
  ]
}];