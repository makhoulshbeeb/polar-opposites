var sketchDown = function(p) {
  var cols, rows;
  var scl = 10;
  var w = 2000;
  var h = 600;
  var flying = 0;
  var terrain = [];

  p.setup = function() {
    p.createCanvas(1280, 240, p.WEBGL);
    p.cols = w / scl;
    p.rows = h / scl;

    for (var x = 0; x < p.cols; x++) {
      terrain[x] = [];
      for (var y = 0; y < p.rows; y++) {
        terrain[x][y] = 0;
      }
    }
  };

  p.draw = function() {
    flying -= 0.1;
    var yoff = flying;
    for (var y = 0; y < p.rows; y++) {
      var xoff = 0;
      for (var x = 0; x < p.cols; x++) {
        terrain[x][y] = p.map(p.noise(xoff, yoff), 0, 1, -100, 100);
        xoff += 0.1;
      }
      yoff += 0.25;
    }

    p.background(44);
    p.translate(0, 50);
    p.rotateX(p.PI / 3);
    p.fill(165, 50, 47, 150);
    p.translate(-w / 2, -h / 2);
    for (var y = 0; y < p.rows - 1; y++) {
      p.beginShape(p.TRIANGLE_STRIP);
      for (var x = 0; x < p.cols; x++) {
        p.vertex(x * scl, y * scl, terrain[x][y]);
        p.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
      }
      p.endShape();
    }
  };
};

var sketchUp = function(p) {
  var cols, rows;
  var scl = 10;
  var w = 2000;
  var h = 600;
  var flying = 0;
  var terrain = [];

  p.setup = function() {
    p.createCanvas(1280, 240, p.WEBGL);
    p.cols = w / scl;
    p.rows = h / scl;

    for (var x = 0; x < p.cols; x++) {
      terrain[x] = [];
      for (var y = 0; y < p.rows; y++) {
        terrain[x][y] = 0;
      }
    }
  };

  p.draw = function() {
    flying -= 0.1;
    var yoff = flying;
    for (var y = 0; y < p.rows; y++) {
      var xoff = 0;
      for (var x = 0; x < p.cols; x++) {
        terrain[x][y] = p.map(p.noise(xoff, yoff), 0, 1, -100, 100);
        xoff += 0.1;
      }
      yoff += 0.25;
    }

    p.background(44);
    p.translate(0, -160);
    p.rotateX(-p.PI / 3);
    p.fill(34, 182, 185, 150);
    p.translate(-w / 2, -h / 2);
    for (var y = 0; y < p.rows - 1; y++) {
      p.beginShape(p.TRIANGLE_STRIP);
      for (var x = 0; x < p.cols; x++) {
        p.vertex(x * scl, y * scl, terrain[x][y]);
        p.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
      }
      p.endShape();
    }
  };
};

new p5(sketchDown, 'terrainDown');
new p5(sketchUp, 'terrainUp');

