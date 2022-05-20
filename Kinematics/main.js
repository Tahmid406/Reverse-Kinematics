class Tentacle {
  constructor(pos, length) {
    this.startPoint = pos;
    this.endPoint = pos;
    this.length = length;
    this.angle = 0;
  }

  calcNewPoints(target) {
    this.endpoint = target;
    let dir = p5.Vector.sub(this.startPoint, target).setMag(this.length);
    this.startPoint = p5.Vector.add(target, dir);
  }

  render() {
    line(
      this.endpoint.x,
      this.endpoint.y,
      this.startPoint.x,
      this.startPoint.y
    );
  }
}

let tentacles = [];
let totalTentacles = 200;
let tentacleLength = 15;

function setup() {
  createCanvas(innerWidth, innerHeight);
  follower = new Tentacle(createVector(width / 2, height / 2), tentacleLength);
  tentacles.push(follower);
  for (let i = 0; i < totalTentacles; i++) {
    tentacles.push(
      new Tentacle(createVector(width / 2, height / 2), tentacleLength)
    );
  }

  stroke(255);
  strokeWeight(5);
}

function draw() {
  background(0);
  console.log(frameRate());

  tentacles[0].calcNewPoints(createVector(mouseX, mouseY));
  tentacles[0].render();
  for (let i = 1; i <= totalTentacles; i++) {
    tentacles[i].calcNewPoints(tentacles[i - 1].startPoint);
    tentacles[i].render();
  }
}
