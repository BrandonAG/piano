import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import Key from './Key.js';

export default class Piano {

  // octaveCount can range from 1 to 3
  constructor(scene, octaveCount) {
    this.octaveCount = octaveCount;
    this.lowestOctave = 4 - Math.ceil((octaveCount - 1) / 2);
    this.highestOctave = 4 + Math.floor((octaveCount - 1) / 2);
    this.keys = [];
    let octaveNum = 4;
    for(let i = 0; i < octaveCount; i++) {
      if(octaveCount === 1) {
        octaveNum = i + 4;
      } else {
        octaveNum = i + this.lowestOctave;
      }

      this.keys.push(
        // Natural Keys
        new Key(scene, 'C', 'KeyQ', octaveNum),
        new Key(scene, 'D', 'KeyE', octaveNum),
        new Key(scene, 'E', 'KeyT', octaveNum),
        new Key(scene, 'F', 'KeyY', octaveNum),
        new Key(scene, 'G', 'KeyI', octaveNum),
        new Key(scene, 'A', 'KeyP', octaveNum),
        new Key(scene, 'B', 'BracketRight', octaveNum),

        // Flat Keys
        new Key(scene, 'Db', 'KeyW', octaveNum),
        new Key(scene, 'Eb', 'KeyR', octaveNum),
        new Key(scene, 'Gb', 'KeyU', octaveNum),
        new Key(scene, 'Ab', 'KeyO', octaveNum),
        new Key(scene, 'Bb', 'BracketLeft', octaveNum),
      );
    }

  };

  pressKey(pressEvent, currentOcatave) {

    let key = this.keys.filter((item) => item.qwertyCode === pressEvent.code && item.octaveNum === currentOcatave);
    if(key.length === 0) {
      return
    }

    key[0].playNote();
    
  };

  releaseKey(releaseEvent, currentOcatave) {

    let key = this.keys.filter((item) => item.qwertyCode === releaseEvent.code && item.octaveNum === currentOcatave);
    if(key.length === 0) {
      return
    }

    key[0].releaseKey();

  };

};