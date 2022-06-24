import {ColorPicker} from "./color-picker";

export type Point = {
  x: number,
  y: number,
  color?: string
}

export type Size = {
  width: number,
  height: number
}

export enum Direction {
  horizontal,
  vertical
}

export class Element {
  tick() {}
  getPoints(): Point[] { return [] };
}

//TODO: support color picker and orientation
export class BlinkerElement extends Element {
  size: Size;
  origin: Point;
  ticks: number = 0;
  ticksOn: number = 0;
  ticksOff: number = 0;
  onFrames: number;
  offFrames: number;
  color: string;
 
  constructor(size: Size, origin: Point, color: string, onFrames: number, offFrames: number) {
    super();
    this.size = size;
    this.origin = origin;
    this.color = color;
    this.onFrames = onFrames;
    this.offFrames = offFrames;
  }

  tick() {
    this.ticks += 1;

    // start with on state
    if (this.ticksOn == 0 && this.ticksOff == 0) {
      this.ticksOn += 1;
      return;
    }

    if (this.isOn()) {
      this.ticksOn += 1;
    } else if (this.isOff()) {
      this.ticksOff += 1;
    }

    // switch off
    if (this.ticksOn > this.onFrames) {
      this.ticksOn = 0;
      this.ticksOff = 1;
      return;
    }

    // switch on
    if (this.ticksOff > this.offFrames) {
      this.ticksOff = 0;
      this.ticksOn = 1;
      return;
    }
  }

  isOn(): Boolean {
    return this.ticksOn > 0; 
  }

  isOff(): Boolean {
    return this.ticksOff > 0;
  }

  getPoints(): Point[] {
    if (this.isOff()) { return []; }
   
    let points: Point[] = []; 
    for (var x = this.origin.x; x < this.origin.x + this.size.width; x++) {
      for (var y = this.origin.y; y < this.origin.y + this.size.height; y++) {
        let point: Point = {x: x, y: y, color: this.color}; 
        points.push(point);
      }
    }
    return points;
  }
}

// TODO: support orientation and direction
export class LoaderElement extends Element {
  origin: Point;
  colorPicker: ColorPicker;
  dots: number;
  onFrames: number;
  offFrames: number;
  persistDots: Boolean = false;
  spacing: number = 0;
  height: number = 1;
  direction: Direction;
  maxIterations: number = 420;

  // state
  ticks: number = 0;
  ticksOn: number = 0;
  ticksOff: number = 0;
  currentDot: number = 0;
  iterations: number = 0;

  constructor(origin: Point, colorPicker: ColorPicker, onFrames: number, offFrames: number, dots: number, persistDots?: Boolean, spacing?: number, height?: number, direction?: Direction, maxIterations?: number) {
    super(); 
    this.origin = origin;
    this.colorPicker = colorPicker;
    this.onFrames = onFrames;
    this.offFrames = offFrames;
    this.dots = dots;
    this.persistDots = persistDots == true;
    this.spacing = spacing != 0 ? spacing : 0;
    this.height = height != this.height ? height : this.height;
    this.direction = direction ? direction : Direction.horizontal;
    this.maxIterations = maxIterations ? maxIterations : this.maxIterations;
  }

  tick() {
    this.ticks += 1;
   
    if (this.isOn()) {
      this.ticksOn += 1;
    } else if (this.isOff()) {
      this.ticksOff += 1;
    }

    if (this.ticksOn > this.onFrames) { 
      this.currentDot += 1;
      this.ticksOn = 1;
    }

    if (this.isOn() && this.currentDot >= this.dots) {
      this.currentDot = 0; // reset
      this.ticksOn = 0;
      this.ticksOff = 1;
      this.iterations += 1;
    }

    if (this.isOff() && this.ticksOff > this.offFrames) {
      this.currentDot = 0;
      this.ticksOn = 1;
      this.ticksOff = 0;
    }
  }

  isOn(): Boolean {
    return this.ticks <= 1 || this.ticksOn > 0;
  }

  isOff(): Boolean {
    return this.ticksOff > 0;
  }

  expired(): Boolean {
    return this.iterations >= this.maxIterations;
  }

  skipToEndBeforeTick() {
    this.currentDot = this.dots - 1;
  }

  getPoints(): Point[] {
    if (this.expired() || this.isOff()) { return []; }

    let points: Point[] = [];
    let x = this.origin.x;
    if (!this.persistDots) {
      x += this.currentDot;
    }
    let i = 0;
    while (x < this.origin.x + this.currentDot + 1) {
      for (var y = 0; y < this.height; y++) {
        let point: Point = {
          x: x + this.spacing * i, 
          y: this.origin.y + y, 
          color: this.colorPicker.nextColor()
        };

        if (this.direction == Direction.vertical) {
          let vPoint: Point = { 
            x: point.y, 
            y: point.x,
            color: point.color 
          };
          points.push(vPoint);
        } else {
          points.push(point);
        }
      }
      x += 1;
      i += 1;
    }
    return points;
  }
}

