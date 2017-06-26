import getAverageColor from 'get-average-color'

document.addEventListener('DOMContentLoaded', () => {
  const coloredSet = document.querySelectorAll('.js-colored')

  coloredSet.forEach(colored => {
    const image = colored.querySelector('img')

    getAverageColor(image.getAttribute('src'))
  })
})
