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

