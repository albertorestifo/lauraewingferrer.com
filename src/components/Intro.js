import React from 'react';
import {scaleLinear} from 'd3-scale';
import * as PIXI from 'pixi.js';

import styles from './intro.module.css';

import backgroundHillFarImg from './background_hill_far.png';
import backgroundHillMediumImg from './background_hill_medium.png';
import backgroundHillCloseImg from './background_hill_close.png';
import groundImg from './ground.png';
import backgroundRockImg from './background_rock.png';
import mainRockImg from './main_rock.png';
import frontRockImg from './front_rock.png';

// Configuration object aligning the drawing correctly. All the units are
// in percentages relative to the PSD size.
const drawing = [
  {
    img: backgroundHillFarImg,
    x: 53.1,
    y: 13.3,
    width: 46.9,
    height: 19.6,
  },
];

class Intro extends React.PureComponent {
  state = {
    height: 0,
    width: 0,
    loading: true,
    progress: 0,
  };

  componentDidMount() {
    const width = 1200;
    const height = 1967;

    const app = new PIXI.Application({
      width,
      height,
      antialias: true,
      view: this.canvasEl,
    });

    this.app = app;

    // To resize:
    // app.renderer.autoResize = true
    // app.renderer.resize(512, 512)

    this.loadImages();
  }

  loadImages = () => {
    PIXI.loader
      .add([
        backgroundHillFarImg,
        backgroundHillMediumImg,
        backgroundHillCloseImg,
        backgroundRockImg,
        groundImg,
        mainRockImg,
        frontRockImg,
      ])
      .on('progress', loader => this.setState({progress: loader.progress}))
      .load(this.handleLoad);
  };

  handleLoad = () => {
    const app = this.app;
    const height = app.screen.height;
    const width = app.screen.width;

    const x = scaleLinear()
      .domain([0, 100])
      .rangeRound([0, width]);
    const y = scaleLinear()
      .domain([0, 100])
      .rangeRound([0, height]);

    this.setState({loading: false});

    // Draw the sky
    const sky = new PIXI.Graphics();
    sky.beginFill(0x6eb0e9);
    sky.drawRect(0, 0, width, y(50));
    sky.endFill();
    app.stage.addChild(sky);

    // Draw the ground
    const ground = new PIXI.Graphics();
    ground.beginFill(0x4d3612);
    ground.drawRect(0, y(50), width, y(50));
    ground.endFill();
    app.stage.addChild(ground);

    // Farthest away hill
    const backgroundHillFar = new PIXI.Sprite(
      PIXI.loader.resources[backgroundHillFarImg].texture,
    );
    backgroundHillFar.width = x(47);
    backgroundHillFar.height = y(15.2);
    backgroundHillFar.position.x = width - backgroundHillFar.width;
    backgroundHillFar.position.y = y(10.3);
    app.stage.addChild(backgroundHillFar);
  };

  canvasRef = el => {
    if (!el) return;
    this.canvasEl = el;
  };

  render() {
    const {loading, progress} = this.state;
    return (
      <div>
        {loading && <p>Loading {Math.round(progress)} ... </p>}
        <canvas className={styles.container} ref={this.canvasRef} />
      </div>
    );
  }
}

export default Intro;
