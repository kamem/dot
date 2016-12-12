export class Stage {
  constructor($el) {
    this.$el = $el;
    this.pxWidth = 10
    this.pxHeight = 10
    this.width = 32
    this.height = 32
    this.canvasWidth = this.width * this.pxWidth
    this.canvasHeight = this.height * this.pxHeight
    this.layers = []
    this.layerNum = -1
    this.canvas = this.$el.append('<canvas class="layer"></canvas>').find('.layer')[0]

    this.createNewLayer('#fff')
    this.createNewLayer('')
  }

  createNewLayer(color = '') {
    this.changeLayers({color})

    this.setLayer({layerNum: this.layerNum})
  }

  changeBlendMode({blendMode = 0}) {
    this.layers[this.layerNum].blendMode = blendMode;
  }

  changeOpacity({opacity = 1}) {
    this.layers[this.layerNum].opacity = opacity;
  }

  changeStagePxColor({pointX, pointY, color}) {
    this.layers[this.layerNum].ary[pointY][pointX] = color;
  }

  getLayerPxColors({
    pointX,
    pointY
  }) {
    const layerPxColors = [];

    this.layers.forEach((layer, layerNum) => {
      layerPxColors.push([
        layer.opacity,
        layer.blendMode,
        this.getStagePxColor({
          layerNum,
          pointX,
          pointY
        })
      ])
    })

    return layerPxColors;
  }

  getStagePxColor({
    layerNum = this.layerNum,
    pointX,
    pointY
  }) {
    return this.layers[layerNum].ary[pointY][pointX]
  }

  changeLayers({layers, color} = {}) {
    if(layers) return this.layers = layers

    this.layerNum += 1
    this.layers[this.layerNum] = {}
    this.changeBlendMode({})
    this.changeOpacity({})
    this.layers[this.layerNum].ary = this.createStageAry(color)
  }

  clearLayer(color) {
    this.layers[this.layerNum].ary = this.createStageAry(color)
  }

  clearAllLayer() {
    this.layers.forEach((layer, layerNum) => {
      const color = layerNum === 0 ? '#fff' : '';

      this.layers[layerNum].ary = this.createStageAry(color)
    })
  }

  createStageAry(color = '') {
    const layer = [];
    for(let i = 0; i < this.height; i++) {
      layer[i] = [];
      for(let j = 0; j < this.width; j++) {
        layer[i][j] = color;
      }
    }

    return layer;
  }

  changePxSize({
    pxWidth = this.pxWidth,
    pxHeight = this.pxHeight
  }) {
    this.pxWidth = pxWidth
    this.pxHeight = pxHeight
  }

  changeSize({
    width = this.width,
    height = this.height
  }) {
    this.canvasWidth = width * this.pxWidth
    this.canvasHeight = height * this.pxHeight
  }

  setLayer({layerNum}) {
    this.layerNum = layerNum;
    if(this.canvas.width !== this.canvasWidth) this.canvas.width = this.canvasWidth
    if(this.canvas.height !== this.canvasHeight) this.canvas.height = this.canvasHeight
    this.ctx = this.canvas.getContext('2d')
  }

  setG(ctx) {
    this.ctx = ctx;
  }
}
