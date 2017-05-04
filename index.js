const babel = require('babel-core')
const transformerToAsyncAwait = require('./lib/to-async-await')

module.exports = (code) => {
  return babel.transform(code, {
    plugins: [transformerToAsyncAwait]
  }).code
}
