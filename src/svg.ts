export type Dimensions = {
  width: number;
  height: number;
}

export type PixelGrid = {
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

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.body = "";
  }

  appendRect(x: number, y: number, height: number, width: number, fill: string): string {
    let s = `<rect x="${x}" y="${y}" height="${height}" width="${width}" fill="${fill}" />`;
    this.body += s;
    return s;
  }

  appendBG(fill: string): string {
    return this.appendRect(0, 0, this.canvas.pixelGrid.x, this.canvas.pixelGrid.y, fill);
  }

  wrap(body: string): string {
    return `<svg width="${this.canvas.dimensions.width}" height="${this.canvas.dimensions.height}" viewBox="0 0 ${this.canvas.pixelGrid.x} ${this.canvas.pixelGrid.y}" version="1.1" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">${body}</svg>`;
  }

  toString(): string {
    return this.wrap(this.body);
  }
}

