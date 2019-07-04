import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  external: [
    'apollo-client',
    'apollo-cache-inmemory',
    'apollo-link-ethereum',
    'apollo-link-ethereum-resolver-ethersjs',
    'apollo-link-ethereum-mutations-ethersjs',
    'react',
    'react-apollo',
    'ethers',
    'date-fns',
    'lodash'
  ],
  plugins: [
    resolve(),
    babel({
      runtimeHelpers: true
    }),
    commonjs()
  ]
};