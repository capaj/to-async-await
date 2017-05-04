let a,e
module.exports = () => {
  return a.then((b) => {
    return e.then((d) => {
      return b + d + 1
    })
  }).then((c) => {
    return c + 1
  })
}