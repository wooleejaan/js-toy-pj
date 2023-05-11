
// const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height) 
  // imageData에는 다음과 같은 데이터가 담겨 있고, 
  // {
  //   data: [133,38,51,255,133,38,255,120...],
  //   colorSpace: "srgb",
  //   height: 420,
  //   width: 320
  // }
  // data에서 4개 단위로 RGBA 를 의미함. red, green, blue, alpha ... 

// const rgbArray = buildRgb(imageData.data) 
// const quantColors = quantization(rgbArray, 0)
// buildPalette(quantColors)

const buildRgb = (imageData) => {
  const rgbValues = []
  for(let i=0; i<imageData.length; i += 4){ // Red, Green, Blue and Alpha 
    const rgb = {
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2]
    }
    rgbValues.push(rgb)
  }
  return rgbValues 
}

// 그 다음으로는 quantization 과정을 거쳐야 한다. 
  // Wikipedia describes color quantization as
  // A process that reduces the number of distinct colors used in an image, 
  // usually with the intention that the new image should be as visually similar as 
  // possible to the original image.
  // 색상 양자화. 
  // 새 이미지가 원래 이미지와 시각적으로 최대한 유사해야 한다는 의도로, 
  // 이미지에 사용되는 고유한 색상의 수를 줄이는 프로세스임. 


    // rgbValues의 요소 하나에는 객체가 담겨 있고, 객체는 r,g,b 형태로 되어 있음. 
const quantization = (rgbValues, depth) => {
  const MAX_DEPTH = 4;

  // Base case
  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev, curr) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    color.r = Math.round(color.r / rgbValues.length);
    color.g = Math.round(color.g / rgbValues.length);
    color.b = Math.round(color.b / rgbValues.length);

    return [color];
  }

  /**
   *  Recursively do the following:
   *  1. Find the pixel channel (red,green or blue) with biggest difference/range
   *  2. Order by this channel
   *  3. Divide in half the rgb colors list
   *  4. Repeat process again, until desired depth or base case
   */
  const componentToSortBy = findBiggestColorRange(rgbValues);
  rgbValues.sort((p1, p2) => {
    return p1[componentToSortBy] - p2[componentToSortBy];
  });
  // 범위 값이 가장큰 r 또는 g 또는 b 대로 순서를 정렬해서 반환

  const mid = rgbValues.length / 2;
  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid + 1), depth + 1),
  ];
};

const findBiggestColorRange = (rgbValues) => {
  /**
   * Min is initialized to the maximum value posible
   * from there we procced to find the minimum value for that color channel
   *
   * Max is initialized to the minimum value posible
   * from there we procced to fin the maximum value for that color channel
   */
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  rgbValues.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  // determine which color has the biggest difference
  const biggestRange = Math.max(rRange, gRange, bRange);
  if (biggestRange === rRange) {
    return "r";
  } else if (biggestRange === gRange) {
    return "g";
  } else {
    return "b";
  }
};

// =======
// 위 과정을 거치면 quantColors = quantization(rgbArray, 0) 을 얻게 되는데, 
// 얘를 가지고 buildPalette(quantColors) 를 진행한다. 

const buildPalette = (colorsList) => {
  const paletteContainer = document.getElementById("palette");
  const complementaryContainer = document.getElementById("complementary");
  // reset the HTML in case you load various images
  paletteContainer.innerHTML = "";
  complementaryContainer.innerHTML = "";

  const orderedByColor = orderByLuminance(colorsList);
  const hslColors = convertRGBtoHSL(orderedByColor);

  for (let i = 0; i < orderedByColor.length; i++) {
    const hexColor = rgbToHex(orderedByColor[i]);

    const hexColorComplementary = hslToHex(hslColors[i]);

    if (i > 0) {
      const difference = calculateColorDifference(
        orderedByColor[i],
        orderedByColor[i - 1]
      );

      // if the distance is less than 120 we ommit that color
      if (difference < 120) {
        continue;
      }
    }

    // create the div and text elements for both colors & append it to the document
    const colorElement = document.createElement("div");
    colorElement.style.backgroundColor = hexColor;
    colorElement.appendChild(document.createTextNode(hexColor));
    paletteContainer.appendChild(colorElement);
    // true when hsl color is not black/white/grey
    if (hslColors[i].h) {
      const complementaryElement = document.createElement("div");
      complementaryElement.style.backgroundColor = `hsl(${hslColors[i].h},${hslColors[i].s}%,${hslColors[i].l}%)`;

      complementaryElement.appendChild(
        document.createTextNode(hexColorComplementary)
      );
      complementaryContainer.appendChild(complementaryElement);
    }
  }
};