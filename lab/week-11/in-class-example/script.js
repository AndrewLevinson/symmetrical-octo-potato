var breakPoint = 768;

var boxes = document.querySelectorAll('.box');

if (window.innerWidth < breakPoint) {
  window.addEventListener('scroll', () => {
    boxes.forEach(box => {
      var showItemAt = window.innerHeight + window.scrollY - box.offsetHeight / 2;
      if (showItemAt > box.offsetTop) {
        box.classList.add('appear');
      } else {
        box.classList.remove('appear');
      }
    });
  });
} else {
  console.log('big screen');
  boxes.forEach(box => {
    box.classList.add('fade-in');
  });
}
