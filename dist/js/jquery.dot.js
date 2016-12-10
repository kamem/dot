/*!
 * jquery.dot (2016-12-8)
 * canvasでドットお絵かき
 * https://github.com/kamem/jquery.dot.git
 * (c) 2016 kamem (@kamem)
 *
 * @version 0.1.1
 * @license Released under the MIT license
 * @author kamem
 */
(function (global, factory) {
	if (typeof exports !== 'undefined') {
		module.exports = factory(require('jquery'), global);
	}	else if (typeof define === 'function' && define.amd) {
			define(['jquery'], function() {factory($, global)});
	}  else {
		factory($, global);
	}
} (typeof window !== "undefined" ? window : this, function ($, global) {
;(function() {
var Stage = {}, Helper = {}, Oekaki = {}, jquerydotjs;
Stage = function (exports) {
  Object.defineProperty(exports, '__esModule', { value: true });
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var Stage = exports.Stage = function () {
    function Stage($el) {
      _classCallCheck(this, Stage);
      this.$el = $el;
      this.pxWidth = 10;
      this.pxHeight = 10;
      this.width = 32;
      this.height = 32;
      this.canvasWidth = this.width * this.pxWidth;
      this.canvasHeight = this.height * this.pxHeight;
      this.layers = [];
      this.layerNum = -1;
      this.createNewLayer('#fff');
      this.createNewLayer('');
    }
    _createClass(Stage, [
      {
        key: 'createNewLayer',
        value: function createNewLayer() {
          var color = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
          this.canvas = this.$el.append('<canvas class="layer"></canvas>').find('.layer');
          this.changeLayers({ color: color });
          this.setLayer({ layerNum: this.layerNum });
        }
      },
      {
        key: 'changeStagePxColor',
        value: function changeStagePxColor(_ref) {
          var pointX = _ref.pointX;
          var pointY = _ref.pointY;
          var color = _ref.color;
          this.layers[this.layerNum][pointY][pointX] = color;
        }
      },
      {
        key: 'getStagePxColor',
        value: function getStagePxColor(_ref2) {
          var _ref2$layerNum = _ref2.layerNum;
          var layerNum = _ref2$layerNum === undefined ? this.layerNum : _ref2$layerNum;
          var pointX = _ref2.pointX;
          var pointY = _ref2.pointY;
          return this.layers[layerNum][pointY][pointX];
        }
      },
      {
        key: 'changeLayers',
        value: function changeLayers() {
          var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
          var layers = _ref3.layers;
          var color = _ref3.color;
          if (layers)
            return this.layers = layers;
          this.layerNum += 1;
          this.layers[this.layerNum] = this.createStageAry(color);
        }
      },
      {
        key: 'clearLayer',
        value: function clearLayer(color) {
          this.layers[this.layerNum] = this.createStageAry(color);
        }
      },
      {
        key: 'clearAllLayer',
        value: function clearAllLayer() {
          var _this = this;
          this.layers.forEach(function (layer, layerNum) {
            var color = layerNum === 0 ? '#fff' : '';
            _this.layers[layerNum] = _this.createStageAry(color);
          });
        }
      },
      {
        key: 'createStageAry',
        value: function createStageAry() {
          var color = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
          var stage = [];
          for (var i = 0; i < this.height; i++) {
            stage[i] = [];
            for (var j = 0; j < this.width; j++) {
              stage[i][j] = color;
            }
          }
          return stage;
        }
      },
      {
        key: 'changePxSize',
        value: function changePxSize(_ref4) {
          var _ref4$pxWidth = _ref4.pxWidth;
          var pxWidth = _ref4$pxWidth === undefined ? this.pxWidth : _ref4$pxWidth;
          var _ref4$pxHeight = _ref4.pxHeight;
          var pxHeight = _ref4$pxHeight === undefined ? this.pxHeight : _ref4$pxHeight;
          this.pxWidth = pxWidth;
          this.pxHeight = pxHeight;
        }
      },
      {
        key: 'changeSize',
        value: function changeSize(_ref5) {
          var _ref5$width = _ref5.width;
          var width = _ref5$width === undefined ? this.width : _ref5$width;
          var _ref5$height = _ref5.height;
          var height = _ref5$height === undefined ? this.height : _ref5$height;
          this.canvasWidth = width * this.pxWidth;
          this.canvasHeight = height * this.pxHeight;
        }
      },
      {
        key: 'setLayer',
        value: function setLayer(_ref6) {
          var layerNum = _ref6.layerNum;
          this.layerNum = layerNum;
          if (this.canvas[layerNum].width !== this.canvasWidth)
            this.canvas[layerNum].width = this.canvasWidth;
          if (this.canvas[layerNum].height !== this.canvasHeight)
            this.canvas[layerNum].height = this.canvasHeight;
          this.ctx = this.canvas[layerNum].getContext('2d');
        }
      },
      {
        key: 'setG',
        value: function setG(ctx) {
          this.ctx = ctx;
        }
      }
    ]);
    return Stage;
  }();
  return exports;
}(Stage);
Helper = function (exports) {
  Object.defineProperty(exports, '__esModule', { value: true });
  //ユーザーエージェントにより判別
  var userAgent = navigator.userAgent;
  userAgent.match(/iPhone OS (\w+){1,3}/g);
  userAgent.match(/CPU OS (\w+){1,3}/g);
  //iPhone iPad のiOSを判別
  var osVar = (RegExp.$1.replace(/_/g, '') + '00').slice(0, 3);
  //ユーザーエージェント判別 配列
  var UA = exports.UA = {
    iPhone: userAgent.search(/iPhone/) !== -1,
    iPad: userAgent.search(/iPad/) !== -1,
    Android: userAgent.search(/Android/) !== -1 && userAgent.search(/Mobile/) !== -1 && userAgent.search(/SC-01C/) == -1,
    AndroidTab: userAgent.search(/Android/) !== -1 && (userAgent.search(/Mobile/) == -1 || userAgent.search(/SC-01C/) !== -1),
    Android3_2: userAgent.search(/Android 3.2/) !== -1,
    iOS5_less: (userAgent.search(/iPhone/) !== -1 || userAgent.search(/iPad/) !== -1) && osVar < 500,
    other: !(userAgent.search(/iPhone/) !== -1 || userAgent.search(/iPad/) !== -1 || userAgent.search(/Android/) !== -1 && userAgent.search(/Mobile/) !== -1 && userAgent.search(/SC-01C/) == -1 || userAgent.search(/Android/) !== -1 && (userAgent.search(/Mobile/) == -1 || userAgent.search(/SC-01C/) !== -1))
  };
  //モバイル判別
  var isMobile = exports.isMobile = UA.iPhone || UA.iPad || UA.Android || UA.AndroidTab;
  //イベント判別
  var EVENT_TYPE = exports.EVENT_TYPE = {
    touchStart: isMobile ? 'touchstart' : 'mousedown',
    touchEnd: isMobile ? 'touchend' : 'mouseup',
    touchMove: isMobile ? 'touchmove' : 'mousemove'
  };
  return exports;
}(Helper);
Oekaki = function (exports, _Helper) {
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.Oekaki = undefined;
  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i['return'])
            _i['return']();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  }();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var Oekaki = exports.Oekaki = function () {
    function Oekaki(_ref) {
      var stage = _ref.stage;
      var strokeStyle = _ref.strokeStyle;
      var _ref$color = _ref.color;
      var color = _ref$color === undefined ? '#000' : _ref$color;
      var drawingFunction = _ref.drawingFunction;
      _classCallCheck(this, Oekaki);
      this.stage = stage;
      this.strokeStyle = strokeStyle;
      this.color = color;
      this.fillStyle = color;
      this.startX = 0;
      this.startY = 0;
      this.x = 0;
      this.y = 0;
      this.pointX = 0;
      this.pointY = 0;
      this.isDrawing = false;
      this.history = [];
      this.repeatSpeed = 10;
      this.drawingFunction = drawingFunction;
    }
    _createClass(Oekaki, [
      {
        key: 'changeColor',
        value: function changeColor(_ref2) {
          var color = _ref2.color;
          this.color = color;
        }
      },
      {
        key: 'changeFillStyle',
        value: function changeFillStyle(_ref3) {
          var fillStyle = _ref3.fillStyle;
          this.fillStyle = fillStyle;
        }
      },
      {
        key: 'changeDrawing',
        value: function changeDrawing(isDrawing) {
          this.isDrawing = isDrawing;
        }
      },
      {
        key: 'changeStartPoint',
        value: function changeStartPoint(_ref4) {
          var x = _ref4.x;
          var y = _ref4.y;
          this.startX = x;
          this.startY = y;
        }
      },
      {
        key: 'changePoint',
        value: function changePoint(_ref5) {
          var x = _ref5.x;
          var y = _ref5.y;
          this.x = x;
          this.y = y;
        }
      },
      {
        key: 'changeHistory',
        value: function changeHistory(history) {
          this.history = history;
        }
      },
      {
        key: 'changeDrawPoint',
        value: function changeDrawPoint() {
          var _getDrawPoint = this.getDrawPoint({});
          var pointX = _getDrawPoint.pointX;
          var pointY = _getDrawPoint.pointY;
          this.pointX = pointX;
          this.pointY = pointY;
        }
      },
      {
        key: 'getDrawPoint',
        value: function getDrawPoint(_ref6) {
          var _ref6$x = _ref6.x;
          var x = _ref6$x === undefined ? this.x : _ref6$x;
          var _ref6$y = _ref6.y;
          var y = _ref6$y === undefined ? this.y : _ref6$y;
          return {
            pointX: Math.floor(x / this.stage.pxWidth),
            pointY: Math.floor(y / this.stage.pxHeight)
          };
        }
      },
      {
        key: 'addHistory',
        value: function addHistory() {
          var lastHistory = this.history[this.history.length - 1];
          if (this.history.length === 0 || lastHistory[0] !== this.pointX || lastHistory[1] !== this.pointY || lastHistory[2] !== this.fillStyle) {
            this.history.push([
              this.stage.layerNum,
              this.pointX,
              this.pointY,
              this.fillStyle
            ]);
          }
        }
      },
      {
        key: 'draw',
        value: function draw(_ref7) {
          var _ref7$pointX = _ref7.pointX;
          var pointX = _ref7$pointX === undefined ? this.pointX : _ref7$pointX;
          var _ref7$pointY = _ref7.pointY;
          var pointY = _ref7$pointY === undefined ? this.pointY : _ref7$pointY;
          var _ref7$fillStyle = _ref7.fillStyle;
          var fillStyle = _ref7$fillStyle === undefined ? this.fillStyle : _ref7$fillStyle;
          var action = fillStyle ? 'fillRect' : 'clearRect';
          this.stage.ctx.fillStyle = fillStyle;
          this.stage.ctx[action](pointX * this.stage.pxWidth, pointY * this.stage.pxHeight, this.stage.pxWidth, this.stage.pxHeight);
        }
      },
      {
        key: 'save',
        value: function save() {
          var deflateLayers = deflate(JSON.stringify(this.stage.layers));
          var history = JSON.stringify(this.history);
          // window.location.search = JSON.stringify(this.history);
          window.location.search = deflateLayers;
          localStorage['draw'] = history;
        }
      },
      {
        key: 'load',
        value: function load() {
          var _this = this;
          var layers = arguments.length <= 0 || arguments[0] === undefined ? this.stage.layers : arguments[0];
          layers.forEach(function (layer, layerNum) {
            _this.stage.setLayer({ layerNum: layerNum });
            layer.forEach(function (rows, pointY) {
              rows.forEach(function (color, pointX) {
                _this.draw({
                  pointX: pointX,
                  pointY: pointY,
                  fillStyle: color
                });
              });
            });
          });
        }
      },
      {
        key: 'repeat',
        value: function repeat(_ref8) {
          var _this2 = this;
          var _ref8$speed = _ref8.speed;
          var speed = _ref8$speed === undefined ? this.repeatSpeed : _ref8$speed;
          var _ref8$history = _ref8.history;
          var history = _ref8$history === undefined ? this.history : _ref8$history;
          this.clear();
          var count = 0;
          for (var i = 0; i < history.length; i++) {
            setTimeout(function () {
              var _history$count = _slicedToArray(history[count], 4);
              var layerNum = _history$count[0];
              var pointX = _history$count[1];
              var pointY = _history$count[2];
              var fillStyle = _history$count[3];
              _this2.stage.setLayer({ layerNum: layerNum });
              _this2.draw({
                pointX: pointX,
                pointY: pointY,
                fillStyle: fillStyle
              });
              count++;
              _this2.stage.changeStagePxColor({
                pointX: pointX,
                pointY: pointY,
                color: fillStyle
              });
              if (_this2.drawingFunction)
                _this2.drawingFunction();
            }, speed * i);
          }
        }
      },
      {
        key: 'clear',
        value: function clear() {
          this.stage.clearAllLayer();
          this.load();
        }
      },
      {
        key: 'setDrawEvent',
        value: function setDrawEvent() {
          var _this3 = this;
          this.stage.$el.on(_Helper.EVENT_TYPE.touchStart, function (e) {
            var touchEvent = _Helper.isMobile ? e.originalEvent.touches[0] : e;
            _this3.changeDrawing(true);
            _this3.drawStart({
              x: touchEvent.pageX,
              y: touchEvent.pageY
            });
          }).on(_Helper.EVENT_TYPE.touchMove, function (e) {
            if (!_this3.isDrawing)
              return;
            if (_Helper.isMobile) {
              event.preventDefault();
            }
            var touchEvent = _Helper.isMobile ? e.originalEvent.touches[0] : e;
            _this3.drawStart({
              x: touchEvent.pageX,
              y: touchEvent.pageY
            });
          }).on(_Helper.EVENT_TYPE.touchEnd, function (e) {
            _this3.changeDrawing(false);
          }).mouseleave(function (e) {
            _this3.changeDrawing(false);
          });
        }
      },
      {
        key: 'drawStart',
        value: function drawStart(_ref9) {
          var x = _ref9.x;
          var y = _ref9.y;
          this.changePoint({
            x: x,
            y: y
          });
          this.changeStartPoint({
            x: x,
            y: y
          });
          this.changeDrawPoint();
          this.draw({});
          var _getDrawPoint2 = this.getDrawPoint({});
          var pointX = _getDrawPoint2.pointX;
          var pointY = _getDrawPoint2.pointY;
          this.stage.changeStagePxColor({
            pointX: pointX,
            pointY: pointY,
            color: this.fillStyle
          });
          this.addHistory();
          if (this.drawingFunction)
            this.drawingFunction();
        }
      }
    ]);
    return Oekaki;
  }();
  return exports;
}(Oekaki, Helper);
jquerydotjs = function (_Stage, _Oekaki) {
  $.fn.dot = function (options) {
    var $el = $(this);
    var $mini = $('.mini');
    var stage = new _Stage.Stage($el);
    var mini = new _Stage.Stage($mini);
    mini.changePxSize({
      pxWidth: 2,
      pxHeight: 2
    });
    mini.changeSize({
      width: 32,
      height: 32
    });
    var search = window.location.search.substring(1, window.location.search.length);
    var inflateSearch = inflate(search);
    if (window.location.search) {
      stage.changeLayers({ layers: JSON.parse(decodeURI(inflateSearch.replace(/%23/g, '#'))) });
      mini.changeLayers({ layers: JSON.parse(decodeURI(inflateSearch.replace(/%23/g, '#'))) });
    }
    var miniOekaki = new _Oekaki.Oekaki({ stage: mini });
    var oekaki = new _Oekaki.Oekaki({
      stage: stage,
      drawingFunction: function drawingFunction() {
        mini.changeLayers({ layers: stage.layers });
        miniOekaki.load();  //console.log(new RGBColor(oekaki.color));
                            //console.log('test');
      }
    });
    oekaki.load();
    miniOekaki.load();
    oekaki.setDrawEvent();
    if (window.location.search) {
      oekaki.changeHistory(JSON.parse(localStorage['draw']));  //oekaki.repeat({});
    }
    $('.save').on('click', function (e) {
      oekaki.save();
    });
    $('.repeat').on('click', function (e) {
      oekaki.changeHistory(JSON.parse(localStorage['draw']));
      oekaki.repeat({});
    });
    $('.num').on('keyup', function (e) {
      stage.setLayer({ layerNum: parseInt(e.target.value) });
      stage.setLayer({ layerNum: parseInt(e.target.value) });
    });
    $('.addLayer').on('click', function (e) {
      stage.createNewLayer();
      $('.num').val(stage.layerNum);
    });
    $('.eraser').on('click', function (e) {
      oekaki.changeFillStyle({ fillStyle: oekaki.fillStyle ? '' : oekaki.color });
    });
    $('.color').on('keyup', function (e) {
      console.log($('.color').val());
      var color = $('.color').val();
      oekaki.changeColor({ color: color });
      oekaki.changeFillStyle({ fillStyle: color });
    });
  };
}(Stage, Oekaki);
}());
}));