import React from 'react';
import * as PIXI from 'pixi.js';
import {scaleLinear} from 'd3-scale';

import backgroundHill1Img from './img/background-hill-1.png?placeholder=true&min=400&max=1800&steps=4';
import backgroundHill2Img from './img/background-hill-2.png?placeholder=true&min=600&max=2400&steps=4';
import backgroundHill3Img from './img/background-hill-3.png?placeholder=true&min=600&max=2400&steps=4';
import groundImg from './img/ground.png?placeholder=true&min=600&max=2400&steps=4';
import backgroundRockImg from './img/background-rock.png?placeholder=true&min=600&max=2400&steps=4';
import rockMainImg from './img/rock-main.png?placeholder=true&min=600&max=2400&steps=4';
import rockFrontImg from './img/rock-front.png?placeholder=true&min=600&max=2400&steps=4';

// Configuration object aligning the drawing correctly. All the units are
// in percentages relative to the PSD size.
const composition = [
  {
    img: backgroundHill1Img,
    x: 53.1,
    y: 13.3,
    width: 46.9,
    height: 19.6,
  },
  {
    img: backgroundHill2Img,
    x: 0,
    y: 10.2,
    width: 97.6,
    height: 41.4,
  },
  {
    img: backgroundHill3Img,
    x: 0,
    y: 26.5,
    width: 100,
    height: 41.8,
  },
  {
    img: groundImg,
    x: 0,
    y: 48.3,
    width: 100,
    height: 14.7,
  },
  {
    img: backgroundRockImg,
    x: 13,
    y: 43.6,
    width: 87,
    height: 39.7,
  },
  {
    img: rockMainImg,
    x: 0,
    y: 29.7,
    width: 100,
    height: 70.4,
  },
  {
    img: rockFrontImg,
    x: 0,
    y: 75.6,
    width: 100,
    height: 24.4,
  },
];

export default class Drawing extends React.PureComponent {
  canvasRef = React.createRef();

  componentDidMount() {
    const aspectRatio = 1967 / 1200;
    const width = 1200; // window.innerWidth;
    const height = width * aspectRatio;

    const app = new PIXI.Application({
      width,
      height,
      antialias: true,
      view: this.canvasRef.current,
    });

    this.app = app;

    // To resize:
    // app.renderer.autoResize = true
    // app.renderer.resize(512, 512)

    this.loadImages();
  }

  loadImages = () => {
    const images = composition.map(el => el.img.images[3].path);
    console.log('IMAGES ==>', images);

    PIXI.loader
      .add(images)
      //.on('progress', loader => this.setState({progress: loader.progress}))
      .load(this.handleLoad);
  };

  componentDidUpdate() {
    this.handleLoad();
  }

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

    // Remove all children
    this.app.stage.removeChildren();

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

    // Draw the composition
    composition.forEach(element => {
      const sprite = new PIXI.Sprite(
        PIXI.loader.resources[element.img.images[3].path].texture,
      );

      sprite.width = x(element.width);
      sprite.height = y(element.height);
      sprite.position.x = x(element.x);
      sprite.position.y = y(element.y);

      app.stage.addChild(sprite);
    });
  };

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}
