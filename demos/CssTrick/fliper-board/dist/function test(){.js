function test1() {
  console.log('[test1.this]: ', this)
}

function test2() {
  console.log('[test2.this]: ', this)
  test1.call(this)
}

function test() {
  let obj = { name: 'ss' }
  console.log('[test.this]: ', this)
  test2.call(obj)
}
