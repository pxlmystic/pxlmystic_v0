import {Chance} from "chance";

export type Dimensions = {
  width: number;
  height: number;
}

export type PixelGrid = {
  x: number;
  y: number;
}

export type Point = {
  x: number;
  y: number;
}

export type Canvas = {
  dimensions: Dimensions;
  pixelGrid: PixelGrid;
}

export class Frame {
  canvas: Canvas;
  body: string;
  chance;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.body = "";
    this.chance = new Chance();
  }

  centerPoint(): Point {
    return { 
      x: Math.floor(this.canvas.pixelGrid.x / 2),
      y: Math.floor(this.canvas.pixelGrid.y / 2),
    };
  }

  randomPoint(): Point {
    let randomX = this.chance.integer({ min: 0, max: this.canvas.pixelGrid.x });
    let randomY = this.chance.integer({ min: 0, max: this.canvas.pixelGrid.y }); 
   return { x: randomX, y: randomY };
  }

  appendRect(x: number, y: number, height: number, width: number, fill: string): string {
    let s = `<rect x="${x}" y="${y}" height="${height}" width="${width}" fill="${fill}" />`;
    this.body += s;
    return s;
  }

  appendPixel(x: number, y: number, fill: string): string {
    return this.appendRect(x, y, 1, 1, fill);
  }

  appendBG(fill: string): string {
    return this.appendRect(0, 0, this.canvas.pixelGrid.x, this.canvas.pixelGrid.y, fill);
  }

  appendDebug(str: string) {
    this.body += `<!-- ${str} -->`; 
  }

  wrap(body: string): string {
    return `<svg width="${this.canvas.dimensions.width}" height="${this.canvas.dimensions.height}" viewBox="0 0 ${this.canvas.pixelGrid.x} ${this.canvas.pixelGrid.y}" version="1.1" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">${body}</svg>`;
  }

  toString(): string {
    return this.wrap(this.body);
  }
}

