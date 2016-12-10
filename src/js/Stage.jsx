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

    this.createNewLayer('#fff')
    this.createNewLayer('')
  }

  createNewLayer(color = '') {
    this.canvas = this.$el.append('<canvas class="layer"></canvas>').find('.layer')

    this.changeLayers({color})

    this.setLayer({layerNum: this.layerNum})
  }

  changeStagePxColor({pointX, pointY, color}) {
    this.layers[this.layerNum][pointY][pointX] = color;
  }

  getStagePxColor({
    layerNum = this.layerNum,
    pointX,
    pointY
  }) {
    return this.layers[layerNum][pointY][pointX]
  }

  changeLayers({layers, color} = {}) {
    if(layers) return this.layers = layers

    this.layerNum += 1
    this.layers[this.layerNum] = this.createStageAry(color)
  }

  clearLayer(color) {
    this.layers[this.layerNum] = this.createStageAry(color)
  }

  clearAllLayer() {
    this.layers.forEach((layer, layerNum) => {
      const color = layerNum === 0 ? '#fff' : '';

      this.layers[layerNum] = this.createStageAry(color)
    })
  }

  createStageAry(color = '') {
    const stage = [];
    for(let i = 0; i < this.height; i++) {
      stage[i] = [];
      for(let j = 0; j < this.width; j++) {
        stage[i][j] = color;
      }
    }

    return stage;
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
    if(this.canvas[layerNum].width !== this.canvasWidth) this.canvas[layerNum].width = this.canvasWidth
    if(this.canvas[layerNum].height !== this.canvasHeight) this.canvas[layerNum].height = this.canvasHeight
    this.ctx = this.canvas[layerNum].getContext('2d')
  }

  setG(ctx) {
    this.ctx = ctx;
  }
}
