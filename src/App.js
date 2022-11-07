import './App.css';
import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Piano from './lib/Piano.js';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

function App() {
  
  useEffect( () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer( { canvas, antialias: true } );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const piano = new Piano(scene, 3);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.castShadow = true;
    directionalLight.position.set(20, 10, 10);
    scene.add(directionalLight);

    const lightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
    scene.add( lightHelper );

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.position.z = 15;

    let currentOcatave = 4;

    const onKeyDown = (event) => {
      if(event.key == 'ArrowLeft') {
        event.preventDefault();
        if(currentOcatave > piano.lowestOctave) {
          currentOcatave--;
        }
      }
      if(event.key == 'ArrowRight') {
        event.preventDefault();
        if(currentOcatave < piano.highestOctave) {
          currentOcatave++;
        }
      }
      if(event.repeat) {
        return;
      }
      piano.pressKey(event, currentOcatave);
    };
  
    // window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyDown);

    function animate() {
      requestAnimationFrame( animate );

      renderer.render( scene, camera );
    }

    animate();

  });

  return (
    <div>
      <canvas id="c"></canvas>
    </div>
    
  );
}

export default App;
