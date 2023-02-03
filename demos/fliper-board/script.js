var flip = document.querySelector('.flip')
var backNode = document.querySelector('.back')
var frontNode = document.querySelector('.front')
var btn = document.getElementById('btn')
btn1.addEventListener('click', function () {
  flipDown()
})
btn2.addEventListener('click', function () {
  flipUp()
})

// 当前数字
var count = 0
// 是否正在翻转（防止翻转未结束就进行下一次翻转）
var isFlipping = false

// 向下翻转+1
function flipDown() {
  // 如果处于翻转中，则不执行
  if (isFlipping) {
    return false
  }
  // 设置前牌的文字
  frontNode.setAttribute(
    'class',
    'digital front number' + count
  )
  // 计算后牌文字（越界判断）
  var nextCount = count >= 9 ? 0 : count + 1
  // 设置后牌的文字
  backNode.setAttribute(
    'class',
    'digital back number' + nextCount
  )
  // 添加go，执行翻转动画
  flip.setAttribute('class', 'flip down go')
  // 将翻转态设置为true
  isFlipping = true
  // 翻转结束后，恢复状态
  setTimeout(function () {
    // 去掉go
    flip.setAttribute('class', 'flip down')
    // 将翻转态设置为false
    isFlipping = false
    // 设置前牌文字为+1后的数字
    frontNode.setAttribute(
      'class',
      'digital front number' + nextCount
    )
    // 更新当前文字
    count = nextCount
  }, 1000)
}
// 向上翻转-1（同理，注释略）
function flipUp() {
  if (isFlipping) {
    return false
  }
  frontNode.setAttribute(
    'class',
    'digital front number' + count
  )
  var nextCount = count <= 0 ? 9 : count - 1
  backNode.setAttribute(
    'class',
    'digital back number' + nextCount
  )
  flip.setAttribute('class', 'flip up go')
  isFlipping = true
  setTimeout(function () {
    flip.setAttribute('class', 'flip up')
    isFlipping = false
    frontNode.setAttribute(
      'class',
      'digital front number' + nextCount
    )
    count = nextCount
  }, 1000)
}
