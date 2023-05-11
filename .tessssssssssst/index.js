const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const image = new Image()
image.src = `https://fastly.picsum.photos/id/162/200/300.jpg?hmac=j8KV0LSPmue8af4dmytyFqhoPlvcsudNYFaB_i5DINs`
image.crossOrigin="anonymous"

image.addEventListener('load', () => {
  ctx.drawImage(image, 0, 0)

  console.log(ctx.getImageData(0, 0, canvas.width, canvas.height))
})