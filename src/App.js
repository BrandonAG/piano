import './App.css';
import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { CSG } from 'three-csg-ts';

// Length and Width Dimensions from https://github.com/gin66/piano_keyboard
const naturalKeyLength = 12.627;
const naturalKeyWidth = 2.215;
const naturalKeyDepth = 2.5;
const sharpKeyLength = 8;
const sharpKeyWidth = 1.1;
const sharpKeyDepth = 3.5;
const spaceBetweenKeys = 0.127

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.castShadow = true;
    // directionalLight.shadow.mapSize.set(1024, 1024);
    // directionalLight.shadow.camera.far = 15;
    // directionalLight.shadow.camera.left = - 7;
    // directionalLight.shadow.camera.top = 7;
    // directionalLight.shadow.camera.right = 7;
    // directionalLight.shadow.camera.bottom = - 7;
    directionalLight.position.set(20, 10, 10);
    scene.add(directionalLight);

    const lightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
    scene.add( lightHelper );

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    //
    //  Natural Keys
    //

    // Key Material
    const naturalKeyMaterial = new THREE.MeshStandardMaterial({
      color: 0xfffff0,
      metalness: 0.6,
      roughness: 0.0
    });

    //  C Key
    const cBulk = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth, naturalKeyLength));
    const cSub1 = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth - spaceBetweenKeys / 2, spaceBetweenKeys / 2));
    cSub1.position.z = (naturalKeyLength / 2) - (spaceBetweenKeys / 4);
    cSub1.position.y = -(spaceBetweenKeys / 4);
    const cSub2 =new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth - 1.397, naturalKeyDepth, naturalKeyLength - 4.5));
    cSub2.position.x = 1.397 / 2;
    cSub2.position.z = -4.5 / 2;
    cBulk.updateMatrix();
    cSub1.updateMatrix();
    cSub2.updateMatrix();
    const keyC = CSG.subtract(CSG.subtract(cBulk, cSub1), cSub2);
    keyC.material = naturalKeyMaterial;
    // keyC.rotation.x =  Math.PI * 0.75;
    // keyC.position.x = 0;
    keyC.castShadow = true;

    // cSub2.material = new THREE.MeshStandardMaterial({color: 'red'});
    // scene.add(cSub2);

    //  D Key
    const dBulk = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth, naturalKeyLength));
    const dSub1 = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth - spaceBetweenKeys / 2, spaceBetweenKeys / 2));
    dSub1.position.z = (naturalKeyLength / 2) - (spaceBetweenKeys / 4);
    dSub1.position.y = -(spaceBetweenKeys / 4);
    const dSub2 =new THREE.Mesh(new THREE.BoxGeometry(0.409, naturalKeyDepth, naturalKeyLength - 4.5));
    dSub2.position.x = (naturalKeyWidth / 2) - (0.409 / 2);
    dSub2.position.z = -4.5 / 2;
    const dSub3 =new THREE.Mesh(new THREE.BoxGeometry(0.409, naturalKeyDepth, naturalKeyLength - 4.5));
    dSub3.position.x = -((naturalKeyWidth / 2) - (0.409 / 2));
    dSub3.position.z = -4.5 / 2;
    dBulk.updateMatrix();
    dSub1.updateMatrix();
    dSub2.updateMatrix();
    dSub3.updateMatrix();
    const keyD = CSG.subtract(CSG.subtract(CSG.subtract(dBulk, dSub1), dSub2), dSub3);
    keyD.material = naturalKeyMaterial;
    // keyD.rotation.x =  Math.PI * 0.75;
    keyD.position.x = 1 * (naturalKeyWidth + spaceBetweenKeys);
    keyD.castShadow = true;

    //  E Key
    const eBulk = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth, naturalKeyLength));
    const eSub1 = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth - spaceBetweenKeys / 2, spaceBetweenKeys / 2));
    eSub1.position.z = (naturalKeyLength / 2) - (spaceBetweenKeys / 4);
    eSub1.position.y = -(spaceBetweenKeys / 4);
    const eSub2 =new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth - 1.397, naturalKeyDepth, naturalKeyLength - 4.5));
    eSub2.position.x = -(1.397 / 2);
    eSub2.position.z = -4.5 / 2;
    eBulk.updateMatrix();
    eSub1.updateMatrix();
    eSub2.updateMatrix();
    const keyE = CSG.subtract(CSG.subtract(eBulk, eSub1), eSub2);
    keyE.material = naturalKeyMaterial;
    // keyE.rotation.x = Math.PI * 0.75;
    keyE.position.x = 2 * (naturalKeyWidth + spaceBetweenKeys);
    keyE.castShadow = true;

    //  F Key
    const fBulk = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth, naturalKeyLength));
    const fSub1 = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth - spaceBetweenKeys / 2, spaceBetweenKeys / 2));
    fSub1.position.z = (naturalKeyLength / 2) - (spaceBetweenKeys / 4);
    fSub1.position.y = -(spaceBetweenKeys / 4);
    const fSub2 =new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth - 1.283, naturalKeyDepth, naturalKeyLength - 4.5));
    fSub2.position.x = 1.283 / 2;
    fSub2.position.z = -4.5 / 2;
    fBulk.updateMatrix();
    fSub1.updateMatrix();
    fSub2.updateMatrix();
    const keyF = CSG.subtract(CSG.subtract(fBulk, fSub1), fSub2);
    keyF.material = naturalKeyMaterial;
    // keyF.rotation.x =  Math.PI * 0.75;
    keyF.position.x = 3 * (naturalKeyWidth + spaceBetweenKeys);
    keyF.castShadow = true;

    //  G Key
    const gBulk = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth, naturalKeyLength));
    const gSub1 = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth - spaceBetweenKeys / 2, spaceBetweenKeys / 2));
    gSub1.position.z = (naturalKeyLength / 2) - (spaceBetweenKeys / 4);
    gSub1.position.y = -(spaceBetweenKeys / 4);
    const gSub2 =new THREE.Mesh(new THREE.BoxGeometry(0.6135, naturalKeyDepth, naturalKeyLength - 4.5));
    gSub2.position.x = (naturalKeyWidth / 2) - (0.6135 / 2);
    gSub2.position.z = -4.5 / 2;
    const gSub3 =new THREE.Mesh(new THREE.BoxGeometry(0.295, naturalKeyDepth, naturalKeyLength - 4.5));
    gSub3.position.x = -((naturalKeyWidth / 2) - (0.295 / 2));
    gSub3.position.z = -4.5 / 2;
    gBulk.updateMatrix();
    gSub1.updateMatrix();
    gSub2.updateMatrix();
    gSub3.updateMatrix();
    const keyG = CSG.subtract(CSG.subtract(CSG.subtract(gBulk, gSub1), gSub2), gSub3);
    keyG.material = naturalKeyMaterial;
    // keyG.rotation.x =  Math.PI * 0.75;
    keyG.position.x = 4 * (naturalKeyWidth + spaceBetweenKeys);
    keyG.castShadow = true;

    //  A Key
    const aBulk = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth, naturalKeyLength));
    const aSub1 = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth - spaceBetweenKeys / 2, spaceBetweenKeys / 2));
    aSub1.position.z = (naturalKeyLength / 2) - (spaceBetweenKeys / 4);
    aSub1.position.y = -(spaceBetweenKeys / 4);
    const aSub2 =new THREE.Mesh(new THREE.BoxGeometry(0.6135, naturalKeyDepth, naturalKeyLength - 4.5));
    aSub2.position.x = -((naturalKeyWidth / 2) - (0.6135 / 2));
    aSub2.position.z = -4.5 / 2;
    const aSub3 =new THREE.Mesh(new THREE.BoxGeometry(0.295, naturalKeyDepth, naturalKeyLength - 4.5));
    aSub3.position.x = (naturalKeyWidth / 2) - (0.295 / 2);
    aSub3.position.z = -4.5 / 2;
    aBulk.updateMatrix();
    aSub1.updateMatrix();
    aSub2.updateMatrix();
    aSub3.updateMatrix();
    const keyA = CSG.subtract(CSG.subtract(CSG.subtract(aBulk, aSub1), aSub2), aSub3);
    keyA.material = naturalKeyMaterial;
    // keyA.rotation.x =  Math.PI * 0.75;
    keyA.position.x = 5 * (naturalKeyWidth + spaceBetweenKeys);
    keyA.castShadow = true;

    //  B Key
    const bBulk = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth, naturalKeyLength));
    const bSub1 = new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth, naturalKeyDepth - spaceBetweenKeys / 2, spaceBetweenKeys / 2));
    bSub1.position.z = (naturalKeyLength / 2) - (spaceBetweenKeys / 4);
    bSub1.position.y = -(spaceBetweenKeys / 4);
    const bSub2 =new THREE.Mesh(new THREE.BoxGeometry(naturalKeyWidth - 1.283, naturalKeyDepth, naturalKeyLength - 4.5));
    bSub2.position.x = -(1.283 / 2);
    bSub2.position.z = -4.5 / 2;
    bBulk.updateMatrix();
    bSub1.updateMatrix();
    bSub2.updateMatrix();
    const keyB = CSG.subtract(CSG.subtract(bBulk, bSub1), bSub2);
    keyB.material = naturalKeyMaterial;
    // keyB.rotation.x =  Math.PI * 0.75;
    keyB.position.x = 6 * (naturalKeyWidth + spaceBetweenKeys);
    keyB.castShadow = true;

    //
    //  Sharp Keys
    //

    const sharpKeyMaterial = new THREE.MeshStandardMaterial({
      // color: 0x100c08,
      color: 'red',
      metalness: 0.6,
      roughness: 0.0
    });

    // C# Key
    const cSharpBulk = new THREE.Mesh(new THREE.BoxGeometry(sharpKeyWidth, sharpKeyDepth, sharpKeyLength));
    cSharpBulk.material = sharpKeyMaterial;
    cSharpBulk.position.x = 0.289 + (sharpKeyWidth / 2) + spaceBetweenKeys;
    cSharpBulk.position.z = -(naturalKeyLength - sharpKeyLength) / 2;
    cSharpBulk.position.y = (sharpKeyDepth - naturalKeyDepth) / 2;
    cSharpBulk.updateMatrix();
    // cSharpBulk.rotation.x =  Math.PI * 0.75;
    cSharpBulk.castShadow = true;

    scene.add(cSharpBulk);

    // D# Key
    const dSharpBulk = new THREE.Mesh(new THREE.BoxGeometry(sharpKeyWidth, sharpKeyDepth, sharpKeyLength));
    dSharpBulk.material = sharpKeyMaterial;
    dSharpBulk.position.x = 1 * (naturalKeyWidth + spaceBetweenKeys) + (0.6985) + (sharpKeyWidth / 2) + spaceBetweenKeys;
    dSharpBulk.position.z = -(naturalKeyLength - sharpKeyLength) / 2;
    dSharpBulk.position.y = (sharpKeyDepth - naturalKeyDepth) / 2;
    dSharpBulk.updateMatrix();
    // dSharpBulk.rotation.x =  Math.PI * 0.75;
    dSharpBulk.castShadow = true;

    scene.add(dSharpBulk);

    // F# Key
    const fSharpBulk = new THREE.Mesh(new THREE.BoxGeometry(sharpKeyWidth, sharpKeyDepth, sharpKeyLength));
    fSharpBulk.material = sharpKeyMaterial;
    // fSharpBulk.position.x = 3 * (naturalKeyWidth + spaceBetweenKeys) + (0.6985) + (sharpKeyWidth / 2) + spaceBetweenKeys;
    fSharpBulk.position.x = 7.8785;
    fSharpBulk.position.z = -(naturalKeyLength - sharpKeyLength) / 2;
    fSharpBulk.position.y = (sharpKeyDepth - naturalKeyDepth) / 2;
    fSharpBulk.updateMatrix();
    // fSharpBulk.rotation.x =  Math.PI * 0.75;
    fSharpBulk.castShadow = true;

    scene.add(fSharpBulk);

    // G# Key
    const gSharpBulk = new THREE.Mesh(new THREE.BoxGeometry(sharpKeyWidth, sharpKeyDepth, sharpKeyLength));
    gSharpBulk.material = sharpKeyMaterial;
    // gSharpBulk.position.x = 3 * (naturalKeyWidth + spaceBetweenKeys) + (0.6985) + (sharpKeyWidth / 2) + spaceBetweenKeys;
    gSharpBulk.position.x = 10.539;
    gSharpBulk.position.z = -(naturalKeyLength - sharpKeyLength) / 2;
    gSharpBulk.position.y = (sharpKeyDepth - naturalKeyDepth) / 2;
    gSharpBulk.updateMatrix();
    // gSharpBulk.rotation.x =  Math.PI * 0.75;
    gSharpBulk.castShadow = true;

    scene.add(gSharpBulk);

    // A# Key
    const aSharpBulk = new THREE.Mesh(new THREE.BoxGeometry(sharpKeyWidth, sharpKeyDepth, sharpKeyLength));
    aSharpBulk.material = sharpKeyMaterial;
    // aSharpBulk.position.x = 3 * (naturalKeyWidth + spaceBetweenKeys) + (0.6985) + (sharpKeyWidth / 2) + spaceBetweenKeys;
    aSharpBulk.position.x = 13.201;
    aSharpBulk.position.z = -(naturalKeyLength - sharpKeyLength) / 2;
    aSharpBulk.position.y = (sharpKeyDepth - naturalKeyDepth) / 2;
    aSharpBulk.updateMatrix();
    // aSharpBulk.rotation.x =  Math.PI * 0.75;
    aSharpBulk.castShadow = true;

    scene.add(aSharpBulk);

    // const geometry = new THREE.BoxGeometry( naturalKeyWidth, naturalKeyLength, naturalKeyDepth );
    // const geo2 = new THREE.BoxGeometry(1, 4.8, 1);
    // geo2.translate(0, 0.1, 0.4);

    // const material = new THREE.MeshStandardMaterial( { color: 0x417dc1 } );
    // const mat2 = new THREE.MeshStandardMaterial( { color: 'green' } );
    // const cube = new THREE.Mesh( geometry, material );
    // const mesh2 = new THREE.Mesh(geo2, material);
    // // const newGeo = BufferGeometryUtils.mergeBufferGeometries([geometry, geo2], false);
    // // const newMesh = new THREE.Mesh(newGeo, material);
    // const newMesh = CSG.union(cube, mesh2);
    // newMesh.material = mat2;

    scene.add( keyC, keyD, keyE, keyF, keyG, keyA, keyB );

    camera.position.z = 15;

    function animate() {
      requestAnimationFrame( animate );

      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.0;

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
