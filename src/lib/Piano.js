import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import Key from './Key.js';

const naturalKeyWidth = 2.215;
const spaceBetweenKeys = 0.127

export default class Piano {

  // octaveCount can range from 1 to 3
  constructor(scene, octaveCount) {
    this.octaveCount = octaveCount;
    this.lowestOctave = 4 - Math.ceil((octaveCount - 1) / 2);
    this.highestOctave = 4 + Math.floor((octaveCount - 1) / 2);
    this.keys = [];
    this.pianoGroup = new THREE.Group();
    let octaveNum = 4;
    for(let i = 0; i < octaveCount; i++) {
      if(octaveCount === 1) {
        octaveNum = i + 4;
      } else {
        octaveNum = i + this.lowestOctave;
      }

      this.keys.push(
        // Natural Keys
        new Key(scene, this.pianoGroup,  'C', 'KeyQ', octaveNum),
        new Key(scene, this.pianoGroup,  'D', 'KeyE', octaveNum),
        new Key(scene, this.pianoGroup,  'E', 'KeyT', octaveNum),
        new Key(scene, this.pianoGroup,  'F', 'KeyY', octaveNum),
        new Key(scene, this.pianoGroup,  'G', 'KeyI', octaveNum),
        new Key(scene, this.pianoGroup,  'A', 'KeyP', octaveNum),
        new Key(scene, this.pianoGroup,  'B', 'BracketRight', octaveNum),

        // Flat Keys
        new Key(scene, this.pianoGroup, 'Db', 'KeyW', octaveNum),
        new Key(scene, this.pianoGroup, 'Eb', 'KeyR', octaveNum),
        new Key(scene, this.pianoGroup, 'Gb', 'KeyU', octaveNum),
        new Key(scene, this.pianoGroup, 'Ab', 'KeyO', octaveNum),
        new Key(scene, this.pianoGroup, 'Bb', 'BracketLeft', octaveNum),
      );
    }

    this.pianoGroup.position.z = -15;
    this.pianoGroup.position.x = (naturalKeyWidth / 2) + (spaceBetweenKeys / 2);
    if(octaveCount % 2) {
      this.pianoGroup.position.x += -(7 / 2) * (naturalKeyWidth + spaceBetweenKeys)
    }
    this.pianoGroup.position.y = 0;
    this.pianoGroup.rotation.x = 45 * Math.PI / 180;

    scene.add(this.pianoGroup);

  };

  pressKey(pressEvent, currentOcatave) {

    let key = this.keys.filter((item) => item.qwertyCode === pressEvent.code && item.octaveNum === currentOcatave);
    if(key.length === 0) {
      return
    }

    key[0].playNote();
    
  };

  releaseKey(releaseEvent, currentOcatave) {

    let keys = this.keys.filter((item) => item.qwertyCode === releaseEvent.code);
    if(keys.length === 0) {
      return
    }
    keys.forEach((key) => {
      key.releaseKey();
    });

  };

};