function getWrappingFunction (path) {
  let { type } = path

  if (
    type === 'ArrowFunctionExpression' ||
    type === 'FunctionDeclaration' ||
    type === 'FunctionExpression'
  ) {
    return path
  }
}

function transformerToAsync (babel) {
  const { types: t } = babel

  return {
    visitor: {
      CallExpression (path, opts) {
        const {code} = opts.file

        const { node } = path
        if (node.callee.property && node.callee.property.name === 'then') {
          const {start, end} = node.callee.object

          const calleeObject = code.substring(start, end)
          const asyncValueName = node.arguments[0].params[0].name
          // const asyncValueAwait = t.VariableDeclaration('const', [t.VariableDeclarator(t.Identifier(asyncValueName), t.AwaitExpression(t.Identifier('a'))])
          const asyncValueAwait = t.VariableDeclaration('const', [
            t.VariableDeclarator(
              t.Identifier(asyncValueName),
              t.AwaitExpression(t.Identifier(calleeObject))
            )
          ])
          const {parentPath} = path
          const thenInnerBody = node.arguments[0].body.body
          console.log('thenInnerBody', thenInnerBody)
          parentPath.replaceWith(asyncValueAwait)
          parentPath.insertAfter(thenInnerBody)
        }
      }
    }
  }
}

module.exports = transformerToAsync
