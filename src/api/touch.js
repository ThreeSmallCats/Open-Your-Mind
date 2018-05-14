export function touch(ele, left, right) {
  left = left || function () {
    return
  }
  right = right || function () {
    return
  }
  let isMove = false
  let startX, startY, endX, endY, distanceX, distanceY
  function fnStart(event) {
    event = event || window.event
    startX = event.touches[0].clientX
    startY = event.touches[0].clientY
    // event.stopPropagation()
    // console.log(2222222222)
    // console.log(event.touches[0].clientX)

  }
  function fnEnd(event) {
    event = event || window.event
    // event.stopPropagation()
    // console.log(event.changedTouches[0].clientX)
    endX = event.changedTouches[0].clientX
    endY = event.changedTouches[0].clientY
    distanceX = startX - endX
    distanceY = startY - endY
    if (Math.abs(distanceX) >= Math.abs(distanceY)) {
      if (distanceX > 20) {
        console.log('letf move')
        left()
      } else if (distanceX < -20) {
        console.log('right move')
        right()
      }
    }

  }
  // ele.addEventListener('touchmove', function (event) {
  //   event = event || window.event
  //   isMove = true
  //   // event.stopPropagation()
  // })
  ele.addEventListener('touchstart',fnStart)
  ele.addEventListener('touchend', fnEnd)
}
