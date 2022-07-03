import {Point} from "./element";
import {Chance} from "chance";

export class PointProcessor {
  processPoints(points: Point[]): Point[] {
    return [];
  }
}

export class DegradePointProcessor extends PointProcessor {
  chance = new Chance(); 
  percent: number;

  constructor(percent: number) {
    super();
    this.percent = percent;
  }

  processPoints(points: Point[]): Point[] {
    let processedPoints = [];
    for (var point of points) {
      let degrade = this.chance.bool({ likelihood: this.percent });
      if (!degrade) {
        processedPoints.push(point);
      }
    }
    return processedPoints; 
  }
}

export class ColumnRemover extends PointProcessor {
  chance = new Chance();
  min: number;
  max: number;

  constructor(min: number, max: number) {
    super();
    this.min = min;
    this.max = max;
  }

  processPoints(points: Point[]): Point[] {
    let processedPoints = [];
    let rows = {}; // {1: false}
    let likelihood = this.chance.integer({ min: this.min, max: this.max});
    for (var point of points) {
      if (!rows.hasOwnProperty(point.x)) {
        let remove = this.chance.bool({ likelihood: likelihood });
        rows[point.x] = remove;
      }
      if (!rows[point.x]) {
        processedPoints.push(point);
      }
    }
    return processedPoints;
  }
}

export class RowRemover extends PointProcessor {
  chance = new Chance();
  min: number;
  max: number;

  constructor(min: number, max: number) {
    super();
    this.min = min;
    this.max = max;
  }

  processPoints(points: Point[]): Point[] {
    let processedPoints = [];
    let rows = {}; // {1: false}
    let likelihood = this.chance.integer({ min: this.min, max: this.max});
    for (var point of points) {
      if (!rows.hasOwnProperty(point.y)) {
        let remove = this.chance.bool({ likelihood: likelihood});
        rows[point.y] = remove;
      }
      if (!rows[point.y]) {
        processedPoints.push(point);
      }
    }
    return processedPoints;
  }
}

export class RowMover extends PointProcessor {
  chance = new Chance();
  percent: number;

  constructor(percent: number) {
    super();
    this.percent = percent;
  }

  processPoints(points: Point[]): Point[] {
    let processedPoints = [];
    let rows = {}; // {1: false}
    for (var point of points) {
      if (!rows.hasOwnProperty(point.y)) {
        let move = this.chance.bool({ likelihood: this.percent});
        rows[point.y] = move ? point.y + 1 : point.y;
      }
      point.y = rows[point.y];
      processedPoints.push(point);
    }
    return processedPoints;
  }
}
