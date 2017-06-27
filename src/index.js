const getColor = imageData => {
  const rgb = { r: 0, g: 0, b: 0 }
  const yuv = { y: 0, u: 0, v: 0 }
  const sigma = x => x / (Math.abs(x) + 0.4)
  // const step = Math.ceil(imageData.data.length / 10000)
  const step = 4
  let count = 0

  for (var i = 0; i < imageData.data.length; i += step) {
    if (imageData.data[i] !== 255 || imageData.data[i + 1] !== 255 || imageData.data[i + 2] !== 255) {
      rgb.r = imageData.data[i] / 255
      rgb.g = imageData.data[i + 1] / 255
      rgb.b = imageData.data[i + 2] / 255

      yuv.y += 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b
      yuv.u += -0.147 * rgb.r - 0.289 * rgb.g + 0.436 * rgb.b
      yuv.v += 0.615 * rgb.r - 0.515 * rgb.g - 0.100 * rgb.b

      count += 1
    }
  }

  yuv.y = sigma(yuv.y / count)
  yuv.u = sigma(yuv.u / count)
  yuv.v = sigma(yuv.v / count)

  rgb.r = yuv.y + 1.3983 * yuv.v
  rgb.g = yuv.y - 0.3946 * yuv.u - 0.58060 * yuv.v
  rgb.b = yuv.y + 2.0321 * yuv.u

  rgb.r = Math.round(rgb.r * 255)
  rgb.g = Math.round(rgb.g * 255)
  rgb.b = Math.round(rgb.b * 255)

  return rgb
}

const getImageData = image => {
  const { width, height } = image
  if (width > 0 && height > 0) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.fillStyle = 'rgb(255, 255, 255)'
    context.fillRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height)
    removeImage(image)

    try {
      return context.getImageData(0, 0, width, height)
    } catch (e) {
      return false
    }
  } else {
    removeImage(image)
  }
}

const removeImage = image => image.parentNode.removeChild(image)

const onLoad = (image, resolve, reject) => {
  const imageData = getImageData(image)
  if (imageData !== false) {
    resolve(getColor(imageData))
  } else {
    reject(`Can't get ImageData from image ${image.getAttribute('src')}`)
  }
}

const onError = (image, reject) => {
  removeImage(image)
  reject(`Can't load image ${image.getAttribute('src')}`)
}

const getAverageColor = url => {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img')
    const body = document.querySelector('body')

    image.addEventListener('load', onLoad.bind(null, image, resolve, reject))
    image.addEventListener('cached', onLoad.bind(null, image, resolve, reject))

    image.addEventListener('abort', onError.bind(null, image, reject))
    image.addEventListener('error', onError.bind(null, image, reject))

    image.crossOrigin = ''
    image.style.display = 'none'
    image.setAttribute('src', url)
    body.appendChild(image)
  })
}

export default getAverageColor
