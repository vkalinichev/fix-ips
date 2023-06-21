const lookupTable = Array.from({length: 1e7}).map(() => Math.random() < 0.5 ? 0 : -1);
let i =0;

function lookup() {
  ++i;
  if (i>=lookupTable.length) {
    i=0;
  }
  return lookupTable[i];
}

const canvas = document.getElementById('canvas');
const rect = canvas.getBoundingClientRect();
const DPR = window.devicePixelRatio || 1;
const width = rect.width * DPR;
const height = rect.height * DPR;

function initCanvas(canvas) {
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d', {alpha: false});
  context.scale(DPR, DPR);
  return context;
}

function render(source) {
  context.drawImage(source, 0, 0);
}

const context = initCanvas(canvas);

const IMAGE_COUNT = 16;
let imageI = 0;
let images = [];

function noise() {
  const i = imageI % IMAGE_COUNT;

  if (!images[i]) {
    const img = new Image();
    const imageData = context.createImageData(width, height);
    let buffer = new Uint32Array(imageData.data.buffer);
    for (let i=0; i<buffer.length; i++) {
      buffer[i] = lookup();
    }
    context.putImageData(imageData, 0, 0);
    img.src = canvas.toDataURL();
    images[i] = img;
  } else {
    context.clearRect(0, 0, width, height);
    context.drawImage(images[i], 0, 0, width / 2, height / 2);
  }

  imageI++
}

function loop() {
  noise();
  // requestAnimationFrame(loop)
  setTimeout(loop, 32);
}

loop();
