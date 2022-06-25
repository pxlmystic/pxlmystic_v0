import {Experiment} from "../experiment";
import {Canvas, Frame} from "../svg";
import {Pico8Pallete} from "../colors";
import {Chance} from "chance";
import {Direction, Size, Point, Element} from "../element";
import {CircleElement} from "../elements/circle";
import {SingleColorPicker} from "../color-picker";

export class CircleExperiment extends Experiment {

  chance = new Chance();

  constructor(canvas: Canvas) {
    super("circle", canvas); 
  }

  generateFrame(): Frame {
    let frame = new Frame(this.canvas);
    frame.appendBG(Pico8Pallete.white);
    let centerPoint = frame.centerPoint();
    let colorPicker = new SingleColorPicker(Pico8Pallete.darkGray);
    let circle = new CircleElement(20, centerPoint, colorPicker); 
    let points: Point[] = circle.getPoints();
    for (var point of points) {
      frame.appendPixel(point.x, point.y, Pico8Pallete.darkGray);
    }
    return frame;
  }
}
 
