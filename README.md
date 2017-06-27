# get-average-color

[![npm version](https://badge.fury.io/js/get-average-color.svg)](https://badge.fury.io/js/get-average-color)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Get average color from image in browser environment

This package provides a function called `getAverageColor`, which returns in promise
the YUV average color of the image, whose url (or base64) will be passed as a
parameter.

![Preview](https://raw.githubusercontent.com/bashkos/get-average-color/master/preview.png)

## Install

```bash
$ npm i -S get-average-color
```

## Usage

```JavaScript
import getAverageColor from 'get-average-color'
import image from './img/myCoolImage.jpg'

getAverageColor(image).then(rgb => console.log(rgb)) // { r: 66, g: 83, b: 25 }
```

## Demo
Clone this repo, install all dependencies and then start the demo
```bash
$ git clone git@github.com:bashkos/get-average-color.git
$ cd get-average-color
$ npm install
$ npm start
```

## License
MIT.
