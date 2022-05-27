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
let shapeNum;
let SVGpaths;
let font;
let font1;
let font2;
let shapes = [];
let gen1;
let vindu;

let x = 0;
let y = 0;

let flower, flower1, flower2
/*     flowerpath, flowerpath1, flowerpath2; */

let rr, gg, bb;

/* let petswitch = document.getElementById('pet-switch'); */


function preload(){
  data = loadTable("data.csv", "csv", "header");
  frameImage = loadImage("frame.png");
  frameImage.resize(width, height);
  frameImageData = frameImage;
  font = loadFont("AirbrushNova-Regular.ttf")
  font1 = loadFont("AirbrushNova-Regular.ttf");

  gen1 = loadImage ("photoshop2.png");
  vindu = loadImage ("vindu.png");
//The symbols

  for ( let i=1; i<= 5 ; i++ ) {
    let svgshape = loadSVG( "Deco" + i + ".svg" );

    shapes.push( svgshape );
  }
  
  // flower = loadSVG( "Deco1.svg" );
  // flower1 = loadSVG( "Deco2.svg" );
/*   flower2 = loadSVG( "Deco3.svg"); */
}


function setup()
{
  var canvasDiv = document.getElementById('p5canvas');
  var widthParent = canvasDiv.offsetWidth;
  var heightParent = canvasDiv.offsetHeight;
  // console.log(widthParent);
  // console.log(heightParent);

  var sketchCanvas = createCanvas(widthParent, heightParent, SVG);
  //console.log(sketchCanvas);

  sketchCanvas.parent("p5canvas");

  // image( flower, 0, 0, 200, 200);
  // console.log( flower );

  gen1.CENTER

  let switchButton = createDiv("NEXT");
  switchButton.parent("buttons");
  switchButton.mouseClicked(randomImageShow);
  boldSpan = createSpan();
  boldSpan.parent("petname");
  boldSpan.class("bold");
  regularSpan = createSpan();
  regularSpan.parent("petname");
  regularSpan.class("regular");
  textFont(font1)
  textSize(100)
/*   textAlign(CENTER, CENTER) */
  

  rows = data.getRows();
  for (let r = 0; r < rows.length; r++)
  {
    let filename = rows[r].getString("Filename");
    let imageLPS = loadImage("lps_images/" + filename);
    imagesArray.push(imageLPS);
  }



/*   frameRate(10); */
}



function mousePressed()
{
  noLoop();
/* Loop(); */


}

function mouseReleased()
{

}



function randomImageShow()
{

  background(255)
  frameImage = frameImageData;
  randomNumber = int(random(0, 434));
  imageMode(CENTER);
  image(imagesArray[randomNumber], width / 2, 300, 330, 330);
  let petnumber = rows[randomNumber].getString ("Number");
  let petname = rows[randomNumber].getString ("Name");
  console.log(randomNumber);
  console.log(petname);
/*   boldSpan.html(petname); */
/*   regularSpan.html("#" + petnumber); */
  colorPalette();
  shapeNum = 0;

/*   image(vindu, 250, 350); */
  image(gen1, 250, 350);

  fill(0);

  stroke (255);
  strokeWeight(0);

  textSize(40);
  text(petname, width - 460, 70);
  textAlign(RIGHT);

  fill(0);
  textSize(25);
  text("#" + petnumber, width - 40, 60);
  textAlign(LEFT);
 

/*   displayFrame(); */

// where the symbols appear//

}
function displayRandomShape( ) {
    let randomshape = shapes[ floor( random( shapes.length ) ) ];
  /*   image(randomshape, random(500 ) , random(0,1),40,40); */
/*     image(randomshape, random(500 ) , random(699,700),40,40); */
    image(randomshape, random(1) , random(1000),40,40);
    image(randomshape, random(499,500) , random(1000),40,40);
  /*   image(randomshape, random(300) , random(300),40,40); */

  



  
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
 

    // palette.push(colors[(j + 1) * WHAT COLORS].color);

  }
  colors = colors.sort((a, b) => b.amount - a.amount);
  // console.log(colors);
  palette = [];
  for (let j = 0; j < 10; j += 1) {
/*     fill(colors[(j + 1) * 500].color); */
    let widness = int((width / 5));
    let xPos = widness * j;
    rect(xPos, 0, widness, 0);
    palette.push(colors[(j + 1) * 50].color);
  }

  rr = red(palette[0])
  gg = green(palette[0])
  bb = blue(palette[0])

  // how many symbols

  for( let i=0; i<10 + floor( random( 100000 ) ); i++ )
    displayRandomShape( );
  
SVGpaths = querySVG( '.flower' );
SVGpaths.forEach( path => {
  let randomcolor = palette[ floor( random( palette.length ) ) ];
  path.attribute('fill', "rgb(" + red(randomcolor) + ", "
                                + green(randomcolor) + ", "
                                + blue(randomcolor) + ")" );
} );

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


function keyPressed() {

  // If you hit the s key, save an image
  if (key == 's') {
    save("LPS_" + frameCount + ".png");
 /*  petname.save ; */
  }
}

function draw()
{
  background(255);

     x = random(width)
    y = random(height)
  

}






// function displayFrame()
// {

//   frameImage.loadPixels();
//   console.log(palette);
//   for (let x = 0; x < width; x++)
//   {
//     for (let y = 0; y < height; y++)
//     {
//       let index = (x + y * width) * 4;
//       let redPixel = frameImage.pixels[index];
//       let greenPixel = frameImage.pixels[index + 1];
//       let bluePixel = frameImage.pixels[index + 2];
//       // const imgColor = frameImage.get(x, y);
//       const paletteColor = getPaletteColor(redPixel, greenPixel, bluePixel);
//       frameImage.pixels[index] = red(paletteColor);
//       frameImage.pixels[index + 1] = green(paletteColor);
//       frameImage.pixels[index + 2] = blue(paletteColor);
//     }
//   }
//   frameImage.updatePixels();
//   imageMode(CORNER);
//   image(frameImage, 0, 0, width, height);
// }