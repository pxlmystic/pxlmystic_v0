import {Experiment} from "../experiment";
import {Canvas, Frame} from "../svg";
import {Pico8Pallete} from "../colors";
import {Chance} from "chance";
import {ColorPicker} from "../color-picker";
import {Direction, Size, Point, Element} from "../element";
import {BlinkerElement} from "../elements/blinker";
import {LoaderElement} from "../elements/loader";

export class LoaderExperiment extends Experiment {

  readonly colors = [
    Pico8Pallete.black,
    Pico8Pallete.red,
    Pico8Pallete.orange,
    Pico8Pallete.yellow,
    Pico8Pallete.green,
    Pico8Pallete.blue,
    Pico8Pallete.pink,
    Pico8Pallete.lightGray,
    Pico8Pallete.pink,
    Pico8Pallete.blue,
    Pico8Pallete.green,
    Pico8Pallete.yellow,
    Pico8Pallete.orange,
    Pico8Pallete.red,
    Pico8Pallete.darkGray,
    Pico8Pallete.black
  ];

  readonly screenColors = [
    Pico8Pallete.black,
    Pico8Pallete.darkGray,
    Pico8Pallete.lightGray,
  ];

  readonly screenWeights = [
    50,
    1,
    .05
  ];

  chance = new Chance();
  screenColorPicker: ColorPicker;
  elements: Element[] = [];

  constructor(canvas: Canvas) {
    super("loader", canvas, 150); 
    this.screenColorPicker = new ColorPicker(
      this.screenColors,
      this.screenWeights
    );
  }

  addBlinkers(frame: Frame) {
    let blinkerSpeeds = [
      [2, 3],
      [3, 5],
      [1, 4],
      [3, 3]
    ];

    let blinkerSizes = [
      {height: 2, width: 1},
    ]
    for (var i = 0; i < 25; i++) {
      let blinkerSize: Size = blinkerSizes[
        this.chance.integer(
          {min: 0, max: blinkerSizes.length - 1}
        )
      ];
      let blinkerOrigin: Point = frame.randomPoint(); 

      let blinkerSpeed = blinkerSpeeds[
        this.chance.integer(
          {min: 0, max: blinkerSpeeds.length - 1}  
        )
      ];
      let blinker = new BlinkerElement(
        blinkerSize, 
        blinkerOrigin, 
        Pico8Pallete.green, 
        blinkerSpeed[0], 
        blinkerSpeed[1]
      ); 
      blinker.ticksOn = this.chance.integer({min: 0, max: 2});
      this.elements.push(blinker);
    }

  }

  addElements(frame: Frame) {
    let firstRun = this.elements.length == 0;
    if (this.elements.length == 0) { 
      this.addBlinkers(frame); 
    }

    let maxLoaders = 3;
    let totalLoaders = firstRun ? maxLoaders * 2 : this.chance.integer({ min: 1, max: maxLoaders });
    for (var i = 0; i < totalLoaders; i++) {
      let dots = this.chance.integer({ min: 1, max: 24 });
      let off = this.chance.integer({ min: 0, max: 3 });
      let on = this.chance.integer({ min: 1, max: 4 });
      let persist = this.chance.bool( { likelihood: 50 } );
      let colorPicker: ColorPicker = new ColorPicker(Object.values(this.colors), [], 2);
      let height = this.chance.weighted([1, 2, 6, 24], [20, 20, 1, 1]);
      let spacing = this.chance.integer({ min: 0, max: 2 });
      if (height > 1) { persist = true; } // no 1px bars
      let direction = this.chance.weighted([Direction.horizontal, Direction.vertical], [80, 20]);
      let skipToEnd = this.chance.bool({ likelihood: 20 });
      let maxIterations = this.chance.weighted([1, 2, 3], [90, 5, 5]);
      let loader = new LoaderElement(
        frame.randomPoint(),
        colorPicker,
        on, 
        off, 
        dots, 
        persist, 
        spacing,
        height,
        direction,
        maxIterations
      );
      
      if (skipToEnd) {
        loader.skipToEndBeforeTick();
        loader.onFrames = this.chance.integer({ min: 1, max: 12 });
      } 

      this.elements.push(loader);
    }
  }

  generateFrame(): Frame {
    let frame = new Frame(this.canvas);
    this.addElements(frame);

    for (let x = 0; x < this.canvas.pixelGrid.x; x++) {
      for (let y = 0; y < this.canvas.pixelGrid.y; y++) {
        let color = this.screenColorPicker.randomColor();
        frame.appendPixel(x, y, color); 
      }
    } 

    for (var element of this.elements) {
      element.tick();
      let points = element.getPoints();
      for (var point of points) {
        frame.appendPixel(point.x, point.y, point.color);
      } 
    }
    return frame;
  }
}
 
