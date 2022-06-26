const button = document.getElementById('start-button');
const main = document.getElementById('main');

const animation = {
  autoFullscreen: false,
  started: false,

  start() {
    if (!animation.started) {
      animation.started = true;
      main.classList.add('animated');
      main.requestFullscreen({navigationUI: 'hide'}).then(() => {
        animation.autoFullscreen = true
      });
    }
  },

  stop() {
    if (animation.started) {
      animation.started = false;
      main.classList.remove('animated');
      button.classList.add('initialized');

      if (animation.autoFullscreen && document.fullscreenElement === main) {
        document.exitFullscreen();
      }
    }
  }
}

button.addEventListener('click', () => animation.start());
main.addEventListener('click', (event) => {
  if (event.target === main) {
    animation.stop();
  }
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    animation.stop();
  }
});
