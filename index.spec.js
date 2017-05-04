import toAsyncAwait from './index'
import test from 'ava'
import fs from 'fs'

test('simplest', t => {
  const simplest = fs.readFileSync('./fixtures/simplest.js', 'utf8')
  t.snapshot(toAsyncAwait(simplest))
})

test.only('basic', t => {
  const basic = fs.readFileSync('./fixtures/basic.js', 'utf8')
  t.snapshot(toAsyncAwait(basic))
})
