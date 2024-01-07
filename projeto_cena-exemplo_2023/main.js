import * as THREE from "three";
import { OrbitControls } from "three/examples/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/loaders/GLTFLoader.js";

const btn_cor = document.getElementById("btn_cor");
const btn_material = document.getElementById("btn_material");
const btn_transparencia = document.getElementById("btn_transparencia");
const btn_repor = document.getElementById("btn_repor");
const btn_vis = document.getElementById("btn_vis");
const canva = document.getElementById("meuCanvas");

let candidatos = []
let alvo = null

// Criar a cena
let cena = new THREE.Scene();
cena.background = new THREE.Color("lightgray");

// Criar e posicionar a camara
let camera = new THREE.PerspectiveCamera(70, 800 / 600, 0.1, 500);
camera.position.x = 2;
camera.position.y = 3;
camera.position.z = 5;
camera.lookAt(0, 0, 0);

let raycaster = new THREE.Raycaster()
let rato = new THREE.Vector2()

let relogio = new THREE.Clock()
let misturador = new THREE.AnimationMixer(cena)

let acao_abrePortaR = null
let acao_abrePortaL = null
let acao_abreGavetaR = null
let acao_abreGavetaL = null



// Criar e configurar o renderer
let renderer = new THREE.WebGLRenderer({canvas : canva});
renderer.setSize(800, 600)
renderer.shadowMap.enabled = true;

// Criar Eixos
let eixos = new THREE.AxesHelper();
cena.add(eixos);

// Criar Grelha
let grelha = new THREE.GridHelper();
cena.add(grelha);

function pegarPrimeiro() {
  console.log("candidatos", candidatos)
  if (candidatos.length>0) {
    raycaster.setFromCamera(rato, camera)
    console.log(raycaster.intersectObjects(candidatos))
    let intersetados = raycaster.intersectObjects(candidatos)
    console.log(intersetados.length)
    if (intersetados.length > 0) {
        // fazer o que houver a fazer com o primeiro interesetado . . . intersetados[0].object . . .
        //object.getObjectByName(alvo) 
        //alvo.material = intersetados[0].object.material
      if (intersetados[0].object.name == "Porta_R_1" || intersetados[0].object.name == "Porta_R_2"|| intersetados[0].object.name == "Porta_R_3") {
        console.log(intersetados[0].object.name)
        if (acao_abrePortaR.paused){
          acao_abrePortaR.paused = !acao_abrePortaR.paused
        }
        else {
          acao_abrePortaR.play()
        }

        
      }else if(intersetados[0].object.name == "Porta_L_1" || intersetados[0].object.name == "Porta_L_2"|| intersetados[0].object.name == "Porta_L_3"){
        console.log(intersetados[0].object.name)
        if (acao_abrePortaL.paused){
          acao_abrePortaL.paused = !acao_abrePortaL.paused
        }
        else {
          acao_abrePortaL.play()
        }


      }else if(intersetados[0].object.name == "Gaveta_R_1" || intersetados[0].object.name == "Gaveta_R_2"){
        console.log(intersetados[0].object.name)
        if (acao_abreGavetaR.paused){
          acao_abreGavetaR.paused = !acao_abreGavetaR.paused
        }
        else {
          acao_abreGavetaR.play()
        }


      }else if(intersetados[0].object.name == "Gaveta_L_1" || intersetados[0].object.name == "Gaveta_L_2"){
        console.log(intersetados[0].object.name)
        if (acao_abreGavetaL.paused){
          acao_abreGavetaL.paused = !acao_abreGavetaL.paused
        }
        else {
          acao_abreGavetaL.play()
        }

      }else{
        console.log(intersetados[0].object.name)
      }
    }
  } 
}

window.onclick = function (evento) {
  rato.x = (evento.clientX / 800) * 2 - 1   // se nao der meter window.innerWidth
  rato.y = -(evento.clientY / 600) * 2 + 1  // se nao der meter window.innerHeight
  // invocar raycaster
  pegarPrimeiro()
}

// Controlos de cena -> OrbitControls
let controlos = new OrbitControls(camera, renderer.domElement);

// Renderizar e animar
function renderizar() {
  renderer.render(cena, camera);
}
renderizar();
controlos.addEventListener("change", renderizar);

let material_novo = new THREE.MeshStandardMaterial({
  metalness: 1, // entre 0 e 1
  roughness: 0.5 // entre 0 e 1 
})

// Load do modelo 3D -> GLTFLoader
let carregador = new GLTFLoader();
carregador.load(
  "./model/mesaAnimacao_alterado.gltf",
    function (gltf) {
      cena.add(gltf.scene);
      cena.traverse(function(elemento){
        if (elemento.isMesh) {
          cena.getObjectByName(elemento.name).castShadow = true
          cena.getObjectByName(elemento.name).receiveShadow = true
          if (elemento.name == '') {
              alvo = elemento
              console.log(alvo)
              console.error(alvo)

          }
          if (elemento.name.includes('Plane')){  //tinha else if aqui

          }
          else{  //tinha else if aqui
            console.log(elemento)
            candidatos.push(elemento)
            console.log(candidatos)

            let clipe= THREE.AnimationClip.findByName(gltf.animations, 'abrePortaR');
            acao_abrePortaR = misturador.clipAction(clipe);

            clipe = THREE.AnimationClip.findByName(gltf.animations, 'abrePortaL');
            acao_abrePortaL = misturador.clipAction(clipe);

            clipe = THREE.AnimationClip.findByName(gltf.animations, 'abreGavetaR');
            acao_abreGavetaR = misturador.clipAction(clipe);


            clipe = THREE.AnimationClip.findByName(gltf.animations, 'abreGavetaL');
            acao_abreGavetaL = misturador.clipAction(clipe);

  
          
        }
          //console.log(elemento.name)
      }
      })

});

//Configuração de luzes
//luz frente
const luzPonto = new THREE.PointLight("white");  
luzPonto.position.set(0, 2, 2);
luzPonto.intensity = 2;
cena.add(luzPonto);
// auxiliar visual
//const LightHelper1 = new THREE.PointLightHelper(luzPonto, 0.2);
//cena.add(LightHelper1);

//luz trás
const luzPonto2 = new THREE.PointLight("white");  
luzPonto2.position.set(0, 2, -2);
luzPonto2.intensity = 2;
cena.add(luzPonto2);

//luz lado direito
const luzDirecional1 = new THREE.DirectionalLight("white");     
luzDirecional1.position.set(3, 2, 0); //aponta na direção de (0, 0, 0)
luzDirecional1.intensity = 2;
cena.add(luzDirecional1);
// auxiliar visual
//const LightHelper2 = new THREE.DirectionalLightHelper(luzDirecional1, 0.2);
//cena.add(LightHelper2);

//luz lado esquerdo
const luzDirecional2 = new THREE.DirectionalLight("white");     
luzDirecional2.position.set(-3, 2, 0); //aponta na direção de (0, 0, 0)
luzDirecional2.intensity = 2;
cena.add(luzDirecional2);


//ANIMAÇÃO
// CLOCK
let clock = new THREE.Clock()
let delta = 0; 
let latency_min = 1 / 60; 
// Cenário Estático
function animate() {
    requestAnimationFrame(animate);
    delta += clock.getDelta() 
    if (delta < latency_min) 
        return; 

    const excedente = delta % latency_min
    const latency_discret = delta - excedente
    misturador.update(latency_discret) 
    renderer.render( cena, camera ) 

    delta = delta % latency_min 
}
animate() 

controlos.addEventListener( 'change', animate )


//controlo de loop
var menuLoop = document.getElementById("menu_loop")
menuLoop.addEventListener("change", function() {
    switch (menuLoop.value) {
        case "1":
            acao_abrePortaR.setLoop(THREE.LoopOnce)
            acao_abrePortaR.clampWhenFinished = true
            acao_abrePortaL.setLoop(THREE.LoopOnce)
            acao_abrePortaL.clampWhenFinished = true
            acao_abreGavetaR.setLoop(THREE.LoopOnce)
            acao_abreGavetaR.clampWhenFinished = true
            acao_abreGavetaL.setLoop(THREE.LoopOnce)
            acao_abreGavetaL.clampWhenFinished = true
          
            break;
        case "2":
            acao_abrePortaR.setLoop(THREE.LoopRepeat);
            acao_abrePortaL.setLoop(THREE.LoopRepeat);
            acao_abreGavetaR.setLoop(THREE.LoopRepeat);
            acao_abreGavetaL.setLoop(THREE.LoopRepeat);

            break;
        case "3":
            acao_abrePortaR.setLoop(THREE.LoopPingPong);
            acao_abrePortaL.setLoop(THREE.LoopPingPong);
            acao_abreGavetaR.setLoop(THREE.LoopPingPong);
            acao_abreGavetaL.setLoop(THREE.LoopPingPong);

            break;
        default:
    }
});


//acao_abrePortaR
document.getElementById("btn_play_PortaR").onclick = function () {
    if (acao_abrePortaR.paused){
      acao_abrePortaR.paused = !acao_abrePortaR.paused
    }
    else {
      acao_abrePortaR.play()
    }
}

document.getElementById("btn_pause_PortaR").onclick = function () {
    if (!acao_abrePortaR.paused){
      acao_abrePortaR.paused = !acao_abrePortaR.paused
    }
}

document.getElementById("btn_stop_PortaR").onclick = function () {
    acao_abrePortaR.stop()
}

document.getElementById("btn_reverse_PortaR").onclick = function () {
  if (acao_abrePortaR.timeScale = -1) {
    acao_abrePortaR.timeScale = 1
  }else{
    acao_abrePortaR.timeScale = -1
  }
}


//acao_abrePortaL
document.getElementById("btn_play_PortaL").onclick = function () {
  console.log(acao_abrePortaL)
  if (acao_abrePortaL.paused){
    acao_abrePortaL.paused = !acao_abrePortaL.paused
  }
  else {
    acao_abrePortaL.play()
  }
}

document.getElementById("btn_pause_PortaL").onclick = function () {
  if (!acao_abrePortaL.paused){
    acao_abrePortaL.paused = !acao_abrePortaL.paused
  }
}

document.getElementById("btn_stop_PortaL").onclick = function () {
  acao_abrePortaL.stop()
}

document.getElementById("btn_reverse_PortaL").onclick = function () {
if (acao_abrePortaL.timeScale = -1) {
  acao_abrePortaL.timeScale = 1
}else{
  acao_abrePortaL.timeScale = -1
}
}


//acao_abreGavetaR
document.getElementById("btn_play_GavetaR").onclick = function () {
  if (acao_abreGavetaR.paused){
    acao_abreGavetaR.paused = !acao_abreGavetaR.paused
  }
  else {
    acao_abreGavetaR.play()
  }
}

document.getElementById("btn_pause_GavetaR").onclick = function () {
  if (!acao_abreGavetaR.paused){
    acao_abreGavetaR.paused = !acao_abreGavetaR.paused
  }
}

document.getElementById("btn_stop_GavetaR").onclick = function () {
  acao_abreGavetaR.stop()
}

document.getElementById("btn_reverse_GavetaR").onclick = function () {
if (acao_abreGavetaR.timeScale = -1) {
  acao_abreGavetaR.timeScale = 1
}else{
  acao_abreGavetaR.timeScale = -1
}
}


//acao_abreGavetaL
document.getElementById("btn_play_GavetaL").onclick = function () {
  if (acao_abreGavetaL.paused){
    acao_abreGavetaL.paused = !acao_abreGavetaL.paused
  }
  else {
    acao_abreGavetaL.play()
  }
}

document.getElementById("btn_pause_GavetaL").onclick = function () {
  if (!acao_abreGavetaL.paused){
    acao_abreGavetaL.paused = !acao_abreGavetaL.paused
  }
}

document.getElementById("btn_stop_GavetaL").onclick = function () {
  acao_abreGavetaL.stop()
}

document.getElementById("btn_reverse_GavetaL").onclick = function () {
if (acao_abreGavetaL.timeScale = -1) {
  acao_abreGavetaL.timeScale = 1
}else{
  acao_abreGavetaL.timeScale = -1
}
}



//Todas as açoes em simultanio

document.getElementById("btn_play").onclick = function () {
  if (acao_abreGavetaL.paused || acao_abreGavetaR.paused || acao_abrePortaL.paused || acao_abrePortaR.paused){
    acao_abreGavetaL.paused = !acao_abreGavetaL.paused
    acao_abreGavetaR.paused = !acao_abreGavetaR.paused
    acao_abrePortaL.paused = !acao_abrePortaL.paused
    acao_abrePortaR.paused = !acao_abrePortaR.paused

  }
  else {
    acao_abreGavetaL.play()
    acao_abreGavetaR.play()
    acao_abrePortaL.play()
    acao_abrePortaR.play()
  }
}
console.log(cena.getObjectByName(cena.name))
