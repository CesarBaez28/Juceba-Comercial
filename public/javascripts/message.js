const message = document.getElementById('message');
const buttonClose = document.getElementById('close-message');

buttonClose.addEventListener('click', closeMessage);

function closeMessage(){
  message.classList.add('close-message');
}

resize();

window.onresize = function () {
  resize();
}

function resize() {
  // Get the browser window and message width for calculate the center
  let windowWidth = document.documentElement.scrollWidth;
  let widthMessage = 300;
  let left = (windowWidth - widthMessage) / 2;
  message.setAttribute('style', 'position: absolute;' + 'top:' + '15' + '%;' + 'left:' + left + 'px;');
}