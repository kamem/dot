/*!
 * jquery.oekaki (2016-12-5)
 * canvasでお絵かき
 * https://github.com/kamem/jquery.oekaki.git
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
var Status = {}, Oekaki = {}, Helper = {}, jqueryoekakijs;
Status = function (exports) {
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
  var Stage = function () {
    function Stage() {
      _classCallCheck(this, Stage);
      this.width = 300;
      this.height = 300;
      this.layerNum = 1;
    }
    _createClass(Stage, [
      {
        key: 'createNewLayer',
        value: function createNewLayer(canvas) {
        }
      },
      {
        key: 'setLayers',
        value: function setLayers(canvas) {
          this.canvas = canvas;
        }
      },
      {
        key: 'setLayer',
        value: function setLayer(_ref) {
          var _ref$layerNum = _ref.layerNum;
          var layerNum = _ref$layerNum === undefined ? 1 : _ref$layerNum;
          this.layerNum = layerNum;
          var arylayerNum = this.canvas.length - layerNum;
          this.canvas[arylayerNum].width = this.width;
          this.canvas[arylayerNum].height = this.height;
          this.ctx = this.canvas[arylayerNum].getContext('2d');
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
  var stage = exports.stage = new Stage();
  return exports;
}(Status);
Oekaki = function (exports, _Status) {
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
      var strokeStyle = _ref.strokeStyle;
      var lineWidth = _ref.lineWidth;
      _classCallCheck(this, Oekaki);
      this.strokeStyle = strokeStyle;
      this.lineWidth = lineWidth;
      this.startX = 0;
      this.startY = 0;
      this.x = 0;
      this.y = 0;
      this.isDrawing = false;
      this.lines = [];
      this.repeatSpeed = 10;
    }
    _createClass(Oekaki, [
      {
        key: 'changeStrokeStyle',
        value: function changeStrokeStyle(strokeStyle) {
          this.strokeStyle = strokeStyle;
        }
      },
      {
        key: 'changeStrokeStyle',
        value: function changeStrokeStyle(lineWidth) {
          this.strokeStyle = lineWidth;
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
        value: function changeStartPoint(_ref2) {
          var x = _ref2.x;
          var y = _ref2.y;
          this.startX = x;
          this.startY = y;
        }
      },
      {
        key: 'changePoint',
        value: function changePoint(_ref3) {
          var x = _ref3.x;
          var y = _ref3.y;
          this.x = x;
          this.y = y;
        }
      },
      {
        key: 'changeLine',
        value: function changeLine(lines) {
          this.lines = lines;
        }
      },
      {
        key: 'addLine',
        value: function addLine() {
          this.lines.push([
            this.startX,
            this.startY,
            this.x,
            this.y,
            this.strokeStyle,
            this.lineWidth
          ]);
        }
      },
      {
        key: 'draw',
        value: function draw(startX, startY, x, y, strokeStyle, lineWidth) {
          _Status.stage.ctx.strokeStyle = strokeStyle || this.strokeStyle;
          _Status.stage.ctx.lineWidth = lineWidth || this.lineWidth;
          _Status.stage.ctx.lineJoin = 'round';
          _Status.stage.ctx.lineCap = 'round';
          _Status.stage.ctx.beginPath();
          _Status.stage.ctx.moveTo(startX || this.startX, startY || this.startY);
          _Status.stage.ctx.lineTo(x || this.x, y || this.y);
          _Status.stage.ctx.stroke();
        }
      },
      {
        key: 'save',
        value: function save() {
          //window.location.search = JSON.stringify(oekaki.lines);
          localStorage['draw'] = JSON.stringify(this.lines);
        }
      },
      {
        key: 'repeat',
        value: function repeat(_ref4) {
          var _this = this;
          var _ref4$speed = _ref4.speed;
          var speed = _ref4$speed === undefined ? this.repeatSpeed : _ref4$speed;
          var _ref4$lines = _ref4.lines;
          var lines = _ref4$lines === undefined ? this.lines : _ref4$lines;
          _Status.stage.ctx.beginPath();
          _Status.stage.ctx.clearRect(0, 0, _Status.stage.width, _Status.stage.height);
          var count = 0;
          for (var i = 0; i < lines.length; i++) {
            setTimeout(function () {
              var _lines$count = _slicedToArray(_this.lines[count], 6);
              var startX = _lines$count[0];
              var startY = _lines$count[1];
              var x = _lines$count[2];
              var y = _lines$count[3];
              var strokeStyle = _lines$count[4];
              var lineWidth = _lines$count[5];
              _this.draw(startX, startY, x, y, strokeStyle, lineWidth);
              count++;
            }, speed * i);
          }
        }
      }
    ]);
    return Oekaki;
  }();
  return exports;
}(Oekaki, Status);
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
jqueryoekakijs = function (_Status, _Oekaki, _Helper) {
  $.fn.oekaki = function (options) {
    var $el = $(this);
    $el.prepend('<canvas class="layer"></canvas>');
    _Status.stage.setLayers($el.find('.layer'));
    _Status.stage.setLayer({});
    var oekaki = new _Oekaki.Oekaki({
      strokeStyle: '#333',
      lineWidth: 1
    });
    if (window.location.search) {
      oekaki.changeLine(JSON.parse(localStorage['draw']));
      oekaki.repeat({});
    }
    $(this).on(_Helper.EVENT_TYPE.touchStart, function (e) {
      var touchEvent = _Helper.isMobile ? e.originalEvent.touches[0] : e;
      oekaki.changeDrawing(true);
      oekaki.changeStartPoint({
        x: touchEvent.pageX,
        y: touchEvent.pageY
      });
    }).on(_Helper.EVENT_TYPE.touchMove, function (e) {
      if (!oekaki.isDrawing)
        return;
      if (_Helper.isMobile) {
        event.preventDefault();
      }
      var touchEvent = _Helper.isMobile ? e.originalEvent.touches[0] : e;
      oekaki.changePoint({
        x: touchEvent.pageX,
        y: touchEvent.pageY
      });
      oekaki.addLine();
      oekaki.draw();
      oekaki.changeStartPoint({
        x: e.pageX,
        y: e.pageY
      });
    }).on(_Helper.EVENT_TYPE.touchEnd, function (e) {
      oekaki.changeDrawing(false);
    }).mouseleave(function (e) {
      oekaki.changeDrawing(false);
    });
    $('.save').on('click', function (e) {
      oekaki.save();
    });
    $('.repeat').on('click', function (e) {
      oekaki.changeLine(JSON.parse(localStorage['draw']));
      oekaki.repeat({});
    });
    $('.num').on('keyup', function (e) {
      _Status.stage.setLayer({ layerNum: parseInt(e.target.value) });
    });
    $('.addLayer').on('click', function (e) {
      $el.prepend('<canvas class="layer"></canvas>');
      _Status.stage.setLayers($el.find('.layer'));
      _Status.stage.setLayer({ layerNum: _Status.stage.layerNum + 1 });
      $('.num').val(_Status.stage.layerNum);
    });
  };
}(Status, Oekaki, Helper);
}());
}));