window.onload = function () {
  const CONTAINER =
    document.querySelector('.container')
  loadImages()
  function loadImages() {
    const imgs = [
      'https://picsum.photos/id/237/600/300',
      'https://picsum.photos/id/238/600/300',
      'https://picsum.photos/id/239/600/300',
      'https://picsum.photos/id/240/600/300',
      'https://picsum.photos/id/241/600/300',
    ]

    imgs.map((url) => newImg(url))
    function newImg(url) {
      const imgWrapper =
        document.createElement('div')
      imgWrapper.style = `
        flex-shrink: 0;
        width:100%;
        height:100%;
        background-color: #ededed;
        background-image: url(${url});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius:20px;
        cursor:pointer;
        transition:all 0.3s cubic-bezier(0.46, 0.28, 0.07, 1.13);
      `
      CONTAINER.appendChild(imgWrapper)
      return imgWrapper
    }
    initState()
    bindClickEvent()
    function bindClickEvent() {
      // 将点击的项展开，所有非点击的项折叠
      CONTAINER.childNodes.forEach(
        (it, index) => {
          it.addEventListener('click', (it) => {
            const { style } = it.target
            style.width = '100%'
            CONTAINER.childNodes.forEach(
              (_it, _index) => {
                if (_index != index) {
                  _it.style.width = '15%'
                }
              }
            )
          })
        }
      )
    }
    function initState() {
      CONTAINER.childNodes.forEach(
        (it, index) => {
          if (index != 0) {
            it.style.width = '15%'
          }
        }
      )
    }
  }
}
