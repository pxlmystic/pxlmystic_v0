import {RainbowScreenExperiment} from "../src/experiments/rainbow-screen";
import {RainbowLinesExperiment} from "../src/experiments/rainbow-lines";
import {LoaderExperiment} from "../src/experiments/loader";
import {PatternsExperiment} from "../src/experiments/patterns";
import {Patterns2Experiment} from "../src/experiments/patterns2";
import {LinesExperiment} from "../src/experiments/lines";
import {Frame, Canvas} from "../src/svg"
import path from "path";
import {promises as fs} from "fs";
import {existsSync} from "fs";
import sharp from "sharp";
import {execSync} from "child_process";

const OUT_DIR = path.join(__dirname, "../out");

const canvas: Canvas = { 
  dimensions: { width: 1000, height: 1000}, 
  pixelGrid: { x: 64, y: 64 }
};

async function createDirectories(root: string) {
  let paths = ["/svg", "/png", "/gif"];
  for (var path of paths) {
    let fullPath = `${root}/${path}`;
    let exists = existsSync(fullPath);
    if (!exists) {
      await fs.mkdir(fullPath, {recursive: true});    
    }
  }  
}

async function writeSVGFrames(root: string, frames: Frame[]) {
  for (let i = 0; i < frames.length; i++) {
    let frame = frames[i];
    await fs.writeFile(`${root}/svg/${i}.svg`, frame.toString());
  }
}

async function convertPNG(root: string, totalFrames: number) {
  for (let i = 0; i < totalFrames; i++) {
    let svgPath = `${root}/svg/${i}.svg`;
    let pngPath = `${root}/png/${i}.png`;
    await sharp(svgPath).png().toFile(pngPath);
  }
}

function convertGIF(root: string, delay: string) {
  let cmd = `convert -delay ${delay} -dispose Previous $(ls -1 ${root}/png/*.png | sort -V) -loop 0 ${root}/gif/final.gif`;
  execSync(cmd);
}

const generate = async () => {
  let experiments = [
    //new RainbowScreenExperiment(canvas),
    //new RainbowLinesExperiment(canvas),
    //new LoaderExperiment(canvas),
    //new PatternsExperiment(canvas),
    //new Patterns2Experiment(canvas),
    new LinesExperiment(canvas)
  ];
  for (var experiment of experiments) {
    let root = `${OUT_DIR}/${experiment.name}/${Date.now()}`;
    await createDirectories(root);

    let frames: Frame[] = [];
    for (let i = 0; i < experiment.totalFrames; i++) {
      let frame = experiment.generateFrame();
      frames.push(frame);
    }

    await writeSVGFrames(root, frames); 
    await convertPNG(root, experiment.totalFrames);
    await convertGIF(root, experiment.frameRate);
  }
};

generate();

