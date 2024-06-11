const textInput = document.getElementById('textInput');
const numInput = document.getElementById('friedLevel');
const textOverlay = document.getElementById('textOverlay');
// textOverlay.innerText = textInput.value;
const memeImage = document.getElementById('memeImage');

textInput.addEventListener('input', function () {
  const fryLevel = document.getElementById('friedLevel').value;
  const text = this.value;
  textOverlay.innerText = text;
  textOverlay.style.textAlign = 'justify';
  textOverlay.style.textAlignLast = 'justify';
  textFit(textOverlay, { maxFontSize: 170 });
  // memeImage.style.display = 'none';
  downloadImg(1 - fryLevel / 100);
});

numInput.addEventListener('input', function () {
  const num = this.value;
  const text = document.getElementById('textInput').value;
  textOverlay.innerText = text;
  if (text.length < 20) {
    textOverlay.style.textAlign = 'center';
    textOverlay.style.textAlignLast = 'auto';
    textOverlay.style.display = 'flex';
    textOverlay.style.justifyContent = 'center';
    textOverlay.style.alignItems = 'center';
  } else {
    textOverlay.style.textAlign = 'justify';
    textOverlay.style.textAlignLast = 'justify';
    textOverlay.style.display = 'block';
    textFit(textOverlay, { maxFontSize: 170 });
  }
  // memeImage.style.display = 'none';
  downloadImg(1 - num / 100);
});

const hiddenClone = (element) => {
  // Create clone of element
  var clone = element.cloneNode(true);

  // Position element relatively within the
  // body but still out of the viewport
  var style = clone.style;
  style.position = 'relative';
  style.top = window.innerHeight + 'px';
  style.left = 0;

  // Append clone to body and return the clone
  document.body.appendChild(clone);
  return clone;
};

const downloadImg = (fryLevel) => {
  var clone = hiddenClone(document.getElementById('textOverlay'));
  // Use clone with htm2canvas and delete clone
  html2canvas(clone, { scrollY: -window.scrollY }).then((canvas) => {
    var dataURL = canvas.toDataURL('image/jpeg', fryLevel);
    document.body.removeChild(clone);
    var link = document.createElement('a');
    link.href = dataURL;
    memeImage.src = dataURL;
    memeImage.style.display = 'block';

    link.download = `brat.jpeg`;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  });
};

function toggleColor() {
  var body = document.getElementsByTagName('body')[0];

  if (body.classList.contains('white')) {
    setupTheme('green');
  } else {
    setupTheme('white');
  }
}

function queryState() {
  var body = document.getElementsByTagName('body')[0];
  return body.classList.contains('white') ? 'white' : 'green';
}

function setupTheme(color) {
  var body = document.getElementsByTagName('body')[0];
  var button = document.getElementById('toggleButton');
  const memeImage = document.getElementById('memeImage');
  //
  if (color === 'white') {
    body.classList.remove('green');
    body.classList.add('white');
    button.style.backgroundColor = '#8ACF00';
    memeImage.src = '/brat-deluxe.png';
  } else {
    body.classList.remove('white');
    body.classList.add('green');
    button.style.backgroundColor = 'white';
    memeImage.src = '/brat.png';
  }
}

// Set the initial state programmatically
document.getElementsByTagName('body')[0].classList.add('white');
setupTheme('green');

const generateBrat = () => {
  const type = getType();
  const period = getPeriod();

  const fileName = `top_${type}_${period}`;
  window.scrollTo(0, 0);
  var clone = hiddenClone(offScreen());
  // Use clone with htm2canvas and delete clone
  html2canvas(clone, { scrollY: -window.scrollY }).then((canvas) => {
    var dataURL = canvas.toDataURL(
      getMode() === 'brat' ? 'image/jpeg' : 'image/png',
      getMode() === 'brat' ? 0.25 : 1.0
    );
    document.body.removeChild(clone);
    const newWindow = window.open('about:blank');
    let img = newWindow.document.createElement('img');

    // Set the src attribute to the data URL
    img.src = dataURL;

    // Append the img element to the body of the new window
    newWindow.document.body.appendChild(img);
  });
};
