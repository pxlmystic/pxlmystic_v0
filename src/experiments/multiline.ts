import {Experiment} from "../experiment";
import {Canvas, Frame} from "../svg";
import {Pico8Pallete} from "../colors";
import {Chance} from "chance";
import {Multiline} from "../elements/multiline";
import {Direction} from "../element";
import {SingleColorPicker, SequentialColorPicker, ColorPicker} from "../color-picker"
import {StripedSquare} from "../elements/striped-square";

export class MultilineExperiment extends Experiment {

  chance = new Chance();

  readonly lineColors = [
    //Pico8Pallete.black,
    Pico8Pallete.red,
    Pico8Pallete.orange,
    Pico8Pallete.yellow,
    Pico8Pallete.green,
    Pico8Pallete.blue,
    Pico8Pallete.indigo,
    Pico8Pallete.white
  ];

  // state
  numLines: number = 1;
  spacing: number = 2;
  excludeSq: boolean = false;
  persistFrames: number = 0;
  persistedFrames: number = 0;
  baseOnly: boolean = false;
  colorPicker = new ColorPicker(this.lineColors);

  constructor(canvas: Canvas) {
    super("multiline", canvas, 69, "1x8");
  }

  shuffleArray(items: any[]) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = items[i];
      items[i] = items[j];
      items[j] = temp;
    }
  }

  addBaseLayerMultiline(frame: Frame) {
    let colorPicker = new ColorPicker([Pico8Pallete.red, Pico8Pallete.orange, Pico8Pallete.yellow, Pico8Pallete.green, Pico8Pallete.blue, Pico8Pallete.indigo]);
    let bg = new Multiline(
      { width: this.canvas.pixelGrid.x, 
        height: this.canvas.pixelGrid.y
      }, 
      { x: 0, y: 0 },
      colorPicker,
      3,
      Direction.vertical
    );
    for (var point of bg.getPoints()) {
      frame.appendPixel(point.x, point.y, point.color);
    }
  }

  addBaseLayerPixels(frame: Frame) {
    for (var x = 0; x < this.canvas.pixelGrid.x; x++) {
      for (var y = 0; y < this.canvas.pixelGrid.y; y++) {
        let on = this.chance.bool({ likelihood: 5 });
        if (on) {
          let colorPicker = new ColorPicker(this.lineColors);
          let color = colorPicker.nextColor();
          color = Pico8Pallete.white;
          frame.appendPixel(x, y, color);
        }
      }
    }
  }

  logConfig(frame: Frame) {
    frame.appendDebug(`
      baseOnly: ${this.baseOnly}, 
      spacing: ${this.spacing},
      excludeSq: ${this.excludeSq},
      persistFrames: ${this.persistFrames},
      persistedFrames: ${this.persistedFrames},
   `); 
  }

  configureParams(frame: Frame) {
    if (this.persistFrames <= 0 || this.persistedFrames > this.persistFrames) {
      this.baseOnly = this.chance.bool({ likelihood: 10 });
      this.spacing = this.chance.weighted([0, 2, 4], [20, 80, 0]);
      this.excludeSq = this.chance.bool({ likelihood: 50 });
      this.numLines = 1; //this.chance.integer({ min: 1, max: 2});
      this.persistFrames = this.chance.integer({ min: 2, max: 6 });
      this.persistedFrames = 1;
      this.logConfig(frame);
      return;
    }
    this.persistedFrames += 1;
    this.logConfig(frame);
  }

  generateFrame(): Frame {
    let frame = new Frame(this.canvas);
    frame.appendBG(Pico8Pallete.black);

    this.configureParams(frame);

    //this.addBaseLayerMultiline(frame);
    this.addBaseLayerPixels(frame);

    if (this.baseOnly) {
      return frame;
    }

    let stripedSquare = new StripedSquare(
      { width: this.canvas.pixelGrid.x, 
       height: this.canvas.pixelGrid.y
      },
      { x: 0, y: 0 },
      new SingleColorPicker(Pico8Pallete.white)
    ); 

    let lineSize = {
      width: 1,
      height: this.canvas.pixelGrid.y
    };

    let multilines = [];
    let numEls = Math.floor(this.canvas.pixelGrid.x / this.numLines);
    //let colorPicker = new SequentialColorPicker(this.lineColors);
    for (var direction of [Direction.vertical, Direction.horizontal]){ 
      for (var i = 0; i < numEls; i++) {
        let origin = { 
          x: i * (this.numLines + this.spacing),
          y: 0
        };
        let multiline = new Multiline(lineSize, origin, this.colorPicker, this.numLines, direction); 
        multilines.push(multiline);
      }
    }
   
    let colorPickerSq = new ColorPicker([Pico8Pallete.black]);
    this.shuffleArray(multilines);
    let excludeSq = this.excludeSq;
    for (var multiline of multilines) { 
      for (var point of multiline.getPoints()) {
        if (!excludeSq || excludeSq && !stripedSquare.containsPoint(point)) {
          frame.appendPixel(point.x, point.y, point.color);
        } else {
          frame.appendPixel(point.x, point.y, colorPickerSq.nextColor());
        }
      }
    }
    return frame;
  }
}

