import { EVENT_TYPE, isMobile } from './Helper'

export class Oekaki {
  constructor({
      stage,
      strokeStyle,
      color = '#000',
      drawingFunction
    }) {
    this.stage = stage

    this.strokeStyle = strokeStyle
    this.color = color
    this.fillStyle = color
    this.startX = 0
    this.startY = 0
    this.x = 0
    this.y = 0
    this.pointX = 0
    this.pointY = 0
    this.isDrawing = false
    this.history = []
    this.repeatSpeed = 10
    this.drawingFunction = drawingFunction;
  }

  changeColor({color}) {
    this.color = color

  }

  changeFillStyle({fillStyle}) {
    this.fillStyle = fillStyle
  }

  changeDrawing(isDrawing) {
    this.isDrawing = isDrawing
  }

  changeStartPoint({x, y}) {
    this.startX = x
    this.startY = y
  }

  changePoint({x, y}) {
    this.x = x
    this.y = y
  }

  changeHistory(history) {
    this.history = history
  }

  changeDrawPoint() {
    const { pointX, pointY } = this.getDrawPoint({})
    this.pointX = pointX
    this.pointY = pointY
  }

  getDrawPoint({
    x = this.x,
    y = this.y
  }) {
    return {
      pointX: Math.floor(x / this.stage.pxWidth),
      pointY: Math.floor(y / this.stage.pxHeight)
    }
  }

  addHistory() {
    const lastHistory = this.history[this.history.length - 1];
    if(
      this.history.length === 0 ||
      lastHistory[0] !== this.pointX ||
      lastHistory[1] !== this.pointY ||
      lastHistory[2] !== this.fillStyle
    ) {
      this.history.push([
        this.stage.layerNum,
        this.pointX,
        this.pointY,
        this.fillStyle
      ])
    }
  }

  draw({
    pointX = this.pointX,
    pointY = this.pointY,
    fillStyle = this.fillStyle
  }) {
    const action = fillStyle ? 'fillRect' : 'clearRect'

    this.stage.ctx.fillStyle = fillStyle

    this.stage.ctx[action](
      pointX * this.stage.pxWidth,
      pointY * this.stage.pxHeight,
      this.stage.pxWidth,
      this.stage.pxHeight
    )
  };

  save() {
    const deflateLayers = deflate(JSON.stringify(this.stage.layers));
    const history = JSON.stringify(this.history);

    // window.location.search = JSON.stringify(this.history);
    window.location.search = deflateLayers
    localStorage['draw'] = history
  }

  load(layers = this.stage.layers) {
    layers.forEach((layer, layerNum) => {
      this.stage.setLayer({layerNum})

      layer.forEach((rows, pointY) => {
        rows.forEach((color, pointX) => {
          this.draw({
            pointX,
            pointY,
            fillStyle: color
          })
        })
      })
    })
  }

  repeat({
    speed = this.repeatSpeed,
    history = this.history
  }) {
    this.clear()

    let count = 0;
    for(let i = 0;i < history.length; i++) {
      setTimeout(() => {
        const [layerNum, pointX, pointY, fillStyle] = history[count];
        this.stage.setLayer({layerNum})

        this.draw({pointX, pointY, fillStyle});
        count++;

        this.stage.changeStagePxColor({
          pointX,
          pointY,
          color: fillStyle
        })
        if(this.drawingFunction) this.drawingFunction()
      }, speed * i);
    }
  }

  clear() {
    this.stage.clearAllLayer()
    this.load()
  }

  setDrawEvent() {
    this.stage.$el
    .on(EVENT_TYPE.touchStart, (e) => {
      const touchEvent = isMobile ? e.originalEvent.touches[0] : e

      this.changeDrawing(true)
      this.drawStart({
        x: touchEvent.pageX,
        y: touchEvent.pageY
      })
    })
    .on(EVENT_TYPE.touchMove, (e) => {
      if(!this.isDrawing) return
      if(isMobile) {event.preventDefault()}

      const touchEvent = isMobile ? e.originalEvent.touches[0] : e

      this.drawStart({
        x: touchEvent.pageX,
        y: touchEvent.pageY
      })
    })
    .on(EVENT_TYPE.touchEnd, (e) => {
      this.changeDrawing(false)
    })
    .mouseleave((e) => {
      this.changeDrawing(false)
    });
  }

  drawStart({x, y}) {
    this.changePoint({x, y})
    this.changeStartPoint({x, y})
    this.changeDrawPoint()
    this.draw({})

    const { pointX, pointY } = this.getDrawPoint({})
    this.stage.changeStagePxColor({
      pointX,
      pointY,
      color: this.fillStyle
    })

    this.addHistory()

    if(this.drawingFunction) this.drawingFunction()
  }
}