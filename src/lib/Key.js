import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { Howl } from 'howler';

// Length and Width Dimensions from https://github.com/gin66/piano_keyboard
const naturalKeyLength = 12.627;
const naturalKeyWidth = 2.215;
const naturalKeyDepth = 2.5;
const flatKeyLength = 8;
const flatKeyWidth = 1.1;
const flatKeyDepth = 3.5;
const spaceBetweenKeys = 0.127

const keyModelSculpting = {
  // Natural Keys
  'C': [{xDimension: 0.818, zDimension: 8.127, xOffset: 0.6985, zOffset: -2.25}],
  'D': [{xDimension: 0.409, zDimension: 8.127, xOffset: -0.903, zOffset: -2.25},
        {xDimension: 0.409, zDimension: 8.127, xOffset: 0.903, zOffset: -2.25}],
  'E': [{xDimension: 0.818, zDimension: 8.127, xOffset: -0.6985, zOffset: -2.25}],
  'F': [{xDimension: 0.932, zDimension: 8.127, xOffset: 0.6415, zOffset: -2.25}],
  'G': [{xDimension: 0.295, zDimension: 8.127, xOffset: -0.96, zOffset: -2.25},
        {xDimension: 0.6135, zDimension: 8.127, xOffset: 0.80075, zOffset: -2.25}],
  'A': [{xDimension: 0.6135, zDimension: 8.127, xOffset: -0.80075, zOffset: -2.25},
        {xDimension: 0.295, zDimension: 8.127, xOffset: 0.96, zOffset: -2.25}],
  'B': [{xDimension: 0.932, zDimension: 8.127, xOffset: -0.6415, zOffset: -2.25}]
}

const positionOffsets = {
  // Natural Keys
  'C': 0 * (naturalKeyWidth + spaceBetweenKeys),
  'D': 1 * (naturalKeyWidth + spaceBetweenKeys),
  'E': 2 * (naturalKeyWidth + spaceBetweenKeys),
  'F': 3 * (naturalKeyWidth + spaceBetweenKeys),
  'G': 4 * (naturalKeyWidth + spaceBetweenKeys),
  'A': 5 * (naturalKeyWidth + spaceBetweenKeys),
  'B': 6 * (naturalKeyWidth + spaceBetweenKeys),
  // Flat Keys
  'Db': 0 * (naturalKeyWidth + spaceBetweenKeys) + 0.9665,
  'Eb': 1 * (naturalKeyWidth + spaceBetweenKeys) + 1.376,
  'Gb': 3 * (naturalKeyWidth + spaceBetweenKeys) + 0.8525,
  'Ab': 4 * (naturalKeyWidth + spaceBetweenKeys) + 1.171,
  'Bb': 5 * (naturalKeyWidth + spaceBetweenKeys) + 1.491
};

const naturalKeyMaterial = new THREE.MeshStandardMaterial({
  color: 0xfffff0,
  metalness: 0.6,
  roughness: 0.0
});

const flatKeyMaterial = new THREE.MeshStandardMaterial({
  color: 0x100c08,
  metalness: 0.2,
  roughness: 0.0
});

export default class Key {

  constructor(scene, pianoGroup, note, qwertyCode, octaveNum) {
    this.note = note + octaveNum;
    this.qwertyCode = qwertyCode;
    this.octaveNum = octaveNum;
    this.sound = new Howl({src: [`./audio/Piano.mf.${this.note}.mp3`]});
    this.keyObj = new THREE.Object3D()

    if(note.length === 2) {

      this.keyObj = new THREE.Object3D()
      this.keyMesh = new THREE.Mesh(new THREE.BoxGeometry(flatKeyWidth, flatKeyDepth, flatKeyLength));
      this.keyMesh.material = flatKeyMaterial;
      this.keyMesh.position.x = 0.289 + (flatKeyWidth / 2) + spaceBetweenKeys;
      this.keyMesh.position.z = -(naturalKeyLength - flatKeyLength) / 2;
      this.keyMesh.position.y = (flatKeyDepth - naturalKeyDepth) / 2;
      this.keyMesh.updateMatrix();
      this.keyMesh.castShadow = true;
      this.keyMesh.position.x = (octaveNum - 4) * 7 * (naturalKeyWidth + spaceBetweenKeys) + positionOffsets[note];
      this.keyMesh.position.z = flatKeyLength / 2;
      this.keyMesh.position.y = flatKeyDepth / 2;

    } else {

      this.keyMesh = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth, naturalKeyLength));
      let sculptMesh = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth - spaceBetweenKeys / 2, spaceBetweenKeys / 2));
      sculptMesh.position.z = (naturalKeyLength / 2) - (spaceBetweenKeys / 4);
      sculptMesh.position.y = -(spaceBetweenKeys / 4);
      this.keyMesh.updateMatrix();
      sculptMesh.updateMatrix();
      this.keyMesh = CSG.subtract(this.keyMesh, sculptMesh);

      for (let item of keyModelSculpting[note]) {
        sculptMesh = new THREE.Mesh(new THREE.BoxGeometry(item.xDimension, naturalKeyDepth, item.zDimension));
        sculptMesh.position.x = item.xOffset;
        sculptMesh.position.z = item.zOffset;
        sculptMesh.updateMatrix();
        this.keyMesh = CSG.subtract(this.keyMesh, sculptMesh);
      }

      this.keyMesh.material = naturalKeyMaterial;
      this.keyMesh.castShadow = true;
      this.keyMesh.position.x = (octaveNum - 4) * 7 * (naturalKeyWidth + spaceBetweenKeys) + positionOffsets[note];
      this.keyMesh.position.z = naturalKeyLength / 2;
      this.keyMesh.position.y = naturalKeyDepth / 2;

    }

    this.keyObj.add(this.keyMesh)
    pianoGroup.add(this.keyObj);

  };

  rotateKey(angle) {
    this.keyObj.rotation.x = angle * Math.PI / 180;
  };

  playNote() {
    this.rotateKey(8);
    this.sound.play();
  };

  releaseKey() {
    this.rotateKey(0);
  };

};