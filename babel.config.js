const presets = [
  [
    "@babel/preset-env"
  ],
  [
    "babel-preset-react-app",
      {
      modules: false,
    }
  ]
]

const plugins = [
  "@babel/plugin-proposal-class-properties",
]

module.exports = {
  presets,
  plugins,
  exclude: 'node_modules/**'
}