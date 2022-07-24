import {Chance} from "chance"

export class ColorPicker {
  colors: string[] = [];
  weights: number[];
  maxColors: number;
  chance = new Chance();
 
  constructor(colors: string[], weights?: number[], maxColors?: number) {
    this.weights = !weights ? [] : weights;
    this.maxColors = maxColors > 0 ? maxColors : colors.length;

    // remove random colors to meet max
    let colorsCopy = [...colors];
    if (maxColors < colors.length) {
      for (var i = 0; i < maxColors; i++) {
        let randomIndex = this.chance.integer({ min: 0, max: colorsCopy.length - 1});
        let randomItem = colorsCopy[randomIndex];
        this.colors.push(randomItem);
        colorsCopy.splice(randomIndex, 1); 
      }
    } else {
      this.colors = colors; 
    }
  }

  randomColor(): string {
    if (this.weights.length > 0) {
      return this.chance.weighted(this.colors, this.weights);
    }

    let randomIndex = this.chance.integer({ min: 0, max: this.colors.length - 1 }); 
    return this.colors[randomIndex];
  }

  nextColor(): string {
    return this.randomColor();
  }
}

export class SingleColorPicker extends ColorPicker {
  color: string;

  constructor(color: string) {
    super([color]);
    this.color = color;
  }

  nextColor(): string {
    return this.color;
  }
}

export class SequentialColorPicker extends ColorPicker {
  colorCursor: number = 0;
 
  constructor(colors: string[]) {
    super(colors);
  }

  nextColor(): string {
    if (this.colorCursor >= this.colors.length) {
      this.colorCursor = 0;
    }

    let color = this.colors[this.colorCursor];
    this.colorCursor += 1; 
    return color;
  }
}

