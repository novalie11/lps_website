let imagesArray = [];
let frameImage;
// let images2 = []
let data;
let maxWidth = 1100;
let rows;
let boldSpan;
let regularSpan;
let randomNumber;
let palette = [];



/* let petswitch = document.getElementById('pet-switch'); */


function preload()
{
  data = loadTable("data.csv", "csv", "header");
  frameImage = loadImage("frame.png");
  frameImage.resize(width, height);
  frameImageData = frameImage;
}


function setup()
{
  var canvasDiv = document.getElementById('p5canvas');
  var widthParent = canvasDiv.offsetWidth;
  var heightParent = canvasDiv.offsetHeight;
  console.log(widthParent);
  console.log(heightParent);
  var sketchCanvas = createCanvas(widthParent, heightParent);
  console.log(sketchCanvas);
  sketchCanvas.parent("p5canvas");
  let switchButton = createDiv("NEXT");
  switchButton.parent("buttons");
  switchButton.mouseClicked(randomImageShow);
  boldSpan = createSpan();
  boldSpan.parent("petname");
  boldSpan.class("bold");
  regularSpan = createSpan();
  regularSpan.parent("petname");
  regularSpan.class("regular");

  rows = data.getRows();
  for (let r = 0; r < rows.length; r++)
  {
    let filename = rows[r].getString("Filename");
    let imageLPS = loadImage("lps_images/" + filename);
    imagesArray.push(imageLPS);
  }

  frameRate(1);
}


function draw()
{
  background(255);
}

function mousePressed()
{

}

function keyPressed() {
  if (keyCode === 83) {
  saveCanvas("LPS SKETCH" + frameCount + ".png");
  pixel
  }
}


function mouseReleased()
{
  noLoop();
}



function randomImageShow()
{
  frameImage = frameImageData;
  randomNumber = int(random(0, 434));
  imageMode(CENTER);
  image(imagesArray[randomNumber], width / 2, height / 2, 350, 350);
  let petname = rows[randomNumber].getString("Name");
  console.log(randomNumber);
  console.log(petname);
  boldSpan.html(petname);
  regularSpan.html(" #" + (randomNumber + 1));
  colorPalette();
/*   displayFrame(); */
}

function colorPalette()
{
  imagesArray[randomNumber].loadPixels();
  let colors = [];
  for (let j = 0; j < imagesArray[randomNumber].pixels.length; j += 4)
  {

    let r = imagesArray[randomNumber].pixels[j];
    let g = imagesArray[randomNumber].pixels[j + 1];
    let b = imagesArray[randomNumber].pixels[j + 2];

    let temp = colors.find((element) =>
    {
      return element.color[0] == r &&
        element.color[1] == g &&
        element.color[2] == b;
    });


    if (!temp)
    {
      colors.push(
      {
        color: [r, g, b],
        amount: 1
      });
    }
    else
    {
      temp.amount += 1;
    }

  }
  colors = colors.sort((a, b) => b.amount - a.amount);
  // console.log(colors);
  palette = [];
  for (let j = 0; j < 5; j += 1)
  {
    fill(colors[(j + 1) * randomNumber + 700].color);
    let widness = int((width / 5));
    let xPos = widness * j;
    rect(xPos, 0, widness, 50);
    palette.push(colors[(j + 1) * 500].color);
  }
}

function displayFrame()
{

  frameImage.loadPixels();
  console.log(palette);
  for (let x = 0; x < width; x++)
  {
    for (let y = 0; y < height; y++)
    {
      let index = (x + y * width) * 4;
      let redPixel = frameImage.pixels[index];
      let greenPixel = frameImage.pixels[index + 1];
      let bluePixel = frameImage.pixels[index + 2];
      // const imgColor = frameImage.get(x, y);
      const paletteColor = getPaletteColor(redPixel, greenPixel, bluePixel);
      frameImage.pixels[index] = red(paletteColor);
      frameImage.pixels[index + 1] = green(paletteColor);
      frameImage.pixels[index + 2] = blue(paletteColor);
    }
  }
  frameImage.updatePixels();
  imageMode(CORNER);
  image(frameImage, 0, 0, width, height);
}

function getPaletteColor(redImgColor, greenImgColor, blueImgColor)
{
  const imgR = redImgColor;
  const imgG = greenImgColor;
  const imgB = blueImgColor;

  let minDistance = 999999;
  let targetColor;

  for (const c of palette)
  {
    const paletteR = red(c);
    const paletteG = green(c);
    const paletteB = blue(c);

    const colorDistance =
      dist(imgR, imgG, imgB,
        paletteR, paletteG, paletteB);

    if (colorDistance < minDistance)
    {
      targetColor = c;
      minDistance = colorDistance;
    }
  }

  return targetColor;
}