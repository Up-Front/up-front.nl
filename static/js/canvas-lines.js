// Shared values
var DEFAULT_SPREAD = 2.5;
var ORIENTATION = {
  BOTTOM: 'bottom',
  LEFT: 'left'
};

var spread = DEFAULT_SPREAD;
var tick = 0;
var full = 360;
var amplitude = 100;
var speed = 0.0075;
var lineColorTick = 0;
var maxLineColorTick = 128 * 3;

function normalize(point, pixels) {
  return (pixels / 100) * point;
}

function normalizeX(point, width) {
  return normalize(point, width);
}

function normalizeY(point, height) {
  return normalize(point, height);
}

function offsetX(tuples, offset) {
  return tuples.map(function(item) {
    return [item[0] + offset, item[1]];
  });
}

function offsetY(tuples, offset) {
  return tuples.map(function(item) {
    return [item[0], item[1] + offset];
  });
}

function hexify(num) {
  var result = Number(num).toString(16);
  return result.length >= 2 ? result : "0" + result;
}

function color(index, base) {
  var offset = index * 128;

  if (base > offset && base <= (offset + 128)) {
    return Math.min(255, 128 + Math.round((base - offset)));
  } else {
    var overlap = 0;

    if (index === 2 && base < 128) {
      overlap = base;
    } else if (index === 1 && base > 256 && base <= 384) {
      overlap = base - 256;
    } else if (index === 0 && base > 128 && base <= 256) {
      overlap = base - 128;
    }

    if (overlap) {
      return Math.max(128, Math.round(128 + ((128 - overlap)) - 1));
    }
  }

  return 128;
}

function calcLineColor(tick) {
  var red = color(0, tick);
  var green = color(1, tick);
  var blue = color(2, tick);

  return '#' + [hexify(red), hexify(green), hexify(blue)].join('');
}

function StripeAnimation(canvas, options) {
  options = options || {};

  this.orientation = options.orientation || ORIENTATION.BOTTOM;
  this.canvas = canvas;
  this.setDimensions();

  var self = this;
  ['render', 'lineTo'].forEach(function(func) {
    self[func] = self[func].bind(self);
  })

  this.animationFrameId = requestAnimationFrame( this.render );
  window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
}

StripeAnimation.prototype = {
  onWindowResize: function onWindowResizeFn() {
    if (this.reapplyDimensionsTimeoutId) {
      clearTimeout(this.reapplyDimensionsTimeoutId);
    }

    this.reapplyDimensionsTimeoutId = setTimeout(this.setDimensions.bind(this), 250);
  },

  setDimensions: function setDimensionsFn() {
    var dims = this.canvas.getBoundingClientRect();
    this.width = dims.width;
    this.height = dims.height;

    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';

    this.context = this.canvas.getContext("2d");
    this.context.canvas.height = this.height;
    this.context.canvas.width = this.width;
    // this.context.fillStyle = "#fff";

    this.numberOfLinesX = Math.floor(this.width / 8);
    this.numberOfLinesY = Math.floor(this.height / 6);
    this.lineWidth = (100 / this.numberOfLinesX) * 0.2;
  },

  getLinesForOrientLeft() {
    var lines = [];
    var stepSize = 50 / this.numberOfLinesY;
    var lineWidth = this.lineWidth;
    var thickness = 0.45;

    for (var i = -50; i < 20; i += stepSize) {
      var topY = (i * spread);
      var leftX = i + (Math.sin(i * 0.075));
      var extraWidthX = 1 + Math.sin(i * 0.5);
      lines.push(offsetY([
        [0, leftX],
        [0, leftX + lineWidth],
        [100, topY + lineWidth + thickness],
        [100, topY],
      ], 58));
    }

    return lines;
  },

  getLinesForOrientBottom() {
    var lines = [];
    var stepSize = 50 / this.numberOfLinesX;
    var lineWidth = this.lineWidth;
    var thickness = 0.15;

    for (var i = -25; i < 75; i += stepSize) {
      var topX = (i * spread);
      var bottomX = i;

      lines.push(offsetX([
        [bottomX, 100],
        [bottomX + lineWidth, 100],
        [topX + lineWidth + thickness, 0],
        [topX, 0],
      ], 26.75));
    }

    return lines;
  },

  render: function renderFn() {
    var lines = this.orientation === ORIENTATION.BOTTOM ?
                this.getLinesForOrientBottom() : this.getLinesForOrientLeft();

    // start rendering
    this.context.clearRect(0, 0, this.width, this.height);
    lines.forEach(function(line, i) {
      this.fillArea(line, i);
    }.bind(this));

    requestAnimationFrame( this.render );
  },

  fillArea: function fillAreaFn(_tuples, i) {
    var width = this.width;
    var height = this.height;

    var tuples = _tuples.map(function(tuple) {
      return [
        normalizeX(tuple[0], width),
        normalizeY(tuple[1], height)
      ];
    });

    this.context.save();
    this.context.beginPath();

    this.context.fillStyle = calcLineColor((i + lineColorTick) % maxLineColorTick);

    // move to the first
    this.moveTo(tuples[0]);

    tuples
      .slice(1)
      .forEach(this.lineTo);

    this.lineTo(tuples[0]);

    this.context.closePath();
    this.context.fill();
    this.context.restore();
  },

  moveTo: function moveToFn(tuple) {
    this.context.moveTo(tuple[0], tuple[1]);
  },

  lineTo: function lineToFn(tuple) {
    this.context.lineTo(tuple[0], tuple[1]);
  }
};

new StripeAnimation(document.getElementById("canvas_up"), { orientation: ORIENTATION.BOTTOM });
new StripeAnimation(document.getElementById("canvas_front"), { orientation: ORIENTATION.LEFT });

// 1 Animation calculation
setInterval(function() {
  spread = DEFAULT_SPREAD + (180 - Math.sin(tick) * amplitude) * 0.002;
  tick += speed;
  lineColorTick += 0.25;

  if (tick === full) {
    tick = 0;
  }

  if (lineColorTick === maxLineColorTick) {
    lineColorTick = 0;
  }
}, 1000/60);
