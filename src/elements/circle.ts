import {Element, Point, Size} from "../element"
import {Chance} from "chance"
import {ColorPicker} from "../color-picker"

export class CircleElement extends Element {
  chance = new Chance();
  radius: number;
  center: Point;
  colorPicker: ColorPicker;

  constructor(radius, center: Point, colorPicker: ColorPicker) {
    super();
    this.radius = radius;
    this.center = center;
    this.colorPicker = colorPicker;
  }

  randomPoint(): Point {
    let ang = Math.random() * 2 * Math.PI,
        hyp = Math.sqrt(Math.random()) * this.radius,
        adj = Math.cos(ang) * hyp,
        opp = Math.sin(ang) * hyp
    let point: Point = {x: Math.floor(this.center.x + adj), y: Math.floor(this.center.y + opp)}
    return point;
  } 

  getPoints(): Point[] {
    let points:Point[] = [];
    let n = this.radius * 20;
    for (var i = 0; i < n; i++) {
      let point = this.randomPoint();
      point.color = this.colorPicker.nextColor();
      points.push(point);
    }
    return points;
  }
}

