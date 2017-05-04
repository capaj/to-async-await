let a

module.exports = () => {
  return a.then((b) => {
    return b + 1
  }).then((c) => {
    return c + 1
  })
}


