import * as THREE from "three";
import { OrbitControls } from "three/examples/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/loaders/GLTFLoader.js";


let candidatos = []

// Criar a cena
let cena = new THREE.Scene();
cena.background = new THREE.Color("lightgray");

// Criar e posicionar a camara
let camera = new THREE.PerspectiveCamera(70, 800 / 600, 0.1, 500);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
camera.lookAt(0, 0, 0);

let raycaster = new THREE.Raycaster()
let rato = new THREE.Vector2()

let misturador = new THREE.AnimationMixer(cena)

// Criar Ações
let acao_abrePortaR = null
let acao_abrePortaL = null
let acao_abreGavetaR = null
let acao_abreGavetaL = null

// Captura do elemento HTML
  // Captura do elemento canva
  const canva = document.getElementById("meuCanvas");

  //Seletor do Controlo do Loop
  var menuLoop = document.getElementById("menu_loop");

  //Botões de Controlo da PORTA DIREITA
  const btn_play_PortaR = document.getElementById("btn_play_PortaR");
  const btn_pause_PortaR = document.getElementById("btn_pause_PortaR");

  //Botões de Controlo da PORTA ESQUERDA
  const btn_play_PortaL = document.getElementById("btn_play_PortaL");
  const btn_pause_PortaL = document.getElementById("btn_pause_PortaL");

  //Botões de Controlo da GAVETA DIREITA
  const btn_play_GavetaR = document.getElementById("btn_play_GavetaR");
  const btn_pause_GavetaR = document.getElementById("btn_pause_GavetaR");

  //Botões de Controlo da GAVETA ESQUERDA
  const btn_play_GavetaL = document.getElementById("btn_play_GavetaL");
  const btn_pause_GavetaL = document.getElementById("btn_pause_GavetaL");

  //Botões de Controlo de todas as ANIMAÇÕES
  const btn_play = document.getElementById("btn_play");
  const btn_stop = document.getElementById("btn_stop");

  //Cores
  const color_wood = document.getElementById("color_wood");




// Criar e configurar o renderer
let renderer = new THREE.WebGLRenderer({canvas : canva});
renderer.setSize(800, 600)
renderer.shadowMap.enabled = true;

function pegarPrimeiro() {
 // console.log("candidatos", candidatos)
  if (candidatos.length>0) {
    raycaster.setFromCamera(rato, camera)
    console.log(raycaster.intersectObjects(candidatos))
    let intersetados = raycaster.intersectObjects(candidatos)
    console.log(intersetados.length)

    if (intersetados.length > 0) {
        // fazer o que houver a fazer com o primeiro interesetado . . . intersetados[0].object . . .
   
      if (intersetados[0].object.name == "Porta_R_1" || intersetados[0].object.name == "Porta_R_2"|| intersetados[0].object.name == "Porta_R_3") {

        //chama a função abrir porta direita
        abrir_PortaR(); 

      }else if(intersetados[0].object.name == "Porta_L_1" || intersetados[0].object.name == "Porta_L_2"|| intersetados[0].object.name == "Porta_L_3"){
       
        //chama a funçaõ abrir porta esquerda
        abrir_PortaL();

      }else if(intersetados[0].object.name == "Gaveta_R_1" || intersetados[0].object.name == "Gaveta_R_2"){ 
        
        //chama a funçaõ abrir gaveta direita
        abrir_GavetaR();

      }else if(intersetados[0].object.name == "Gaveta_L_1" || intersetados[0].object.name == "Gaveta_L_2"){
        
        //chama a função abrir gaveta esquerda
        abrir_GavetaL();

      }else{
        console.log(intersetados[0].object.name)
      }
    }
  } 
}

canva.onclick = function (evento) {
  var limites = evento.target.getBoundingClientRect()
  rato.x = 2 * (evento.clientX - limites.left) / parseInt(meuCanvas.style.width) - 1
  rato.y = 1 - 2 * (evento.clientY - limites.top) / parseInt(meuCanvas.style.height)
  
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

// Load do modelo 3D -> GLTFLoader
let carregador = new GLTFLoader();
carregador.load(
  "./model/mesaAnimacao_alterado.gltf",
    function (gltf) {
      cena.add(gltf.scene);
      cena.traverse(function(elemento){
        if (elemento.isMesh) {
          elemento.castShadow = true
          elemento.receiveShadow = true
          
          //tinha else if aqui
          console.log(elemento)
          candidatos.push(elemento)
          console.log(candidatos)
          
          //Importação da Animação "abrePortaR"
          let clipe= THREE.AnimationClip.findByName(gltf.animations, 'abrePortaR');
          acao_abrePortaR = misturador.clipAction(clipe);
          acao_abrePortaR.setLoop(THREE.LoopOnce);
          acao_abrePortaR.clampWhenFinished = true

          //Importação da Animação "abrePortaL"
          clipe = THREE.AnimationClip.findByName(gltf.animations, 'abrePortaL');
          acao_abrePortaL = misturador.clipAction(clipe);
          acao_abrePortaL.setLoop(THREE.LoopOnce);
          acao_abrePortaL.clampWhenFinished = true

          //Importação da Animação "abreGavetaR"
          clipe = THREE.AnimationClip.findByName(gltf.animations, 'abreGavetaR');
          acao_abreGavetaR = misturador.clipAction(clipe);
          acao_abreGavetaR.setLoop(THREE.LoopOnce);
          acao_abreGavetaR.clampWhenFinished = true

          //Importação da Animação "abreGavetaL"
          clipe = THREE.AnimationClip.findByName(gltf.animations, 'abreGavetaL');
          acao_abreGavetaL = misturador.clipAction(clipe);
          acao_abreGavetaL.setLoop(THREE.LoopOnce);
          acao_abreGavetaL.clampWhenFinished = true
      }
      })
});

//Configuração de luzes
//luz frente
const luzPonto1 = new THREE.PointLight("white");  
luzPonto1.position.set(0, 2, 2);
luzPonto1.intensity = 6;
//luz trás
const luzPonto2 = new THREE.PointLight("white");  
luzPonto2.position.set(0, 2, -2);
luzPonto2.intensity = 6;
//luz lado direito
const luzDirecional1 = new THREE.DirectionalLight("white");     
luzDirecional1.position.set(3, 2.5, 0); //aponta na direção de (0, 0, 0)
luzDirecional1.intensity = 4; 
luzDirecional1.castShadow = true;
const LightHelper2 = new THREE.DirectionalLightHelper(luzDirecional1, 0.2);
cena.add(LightHelper2);
//luz lado esquerdo
const luzDirecional2 = new THREE.DirectionalLight("white");     
luzDirecional2.position.set(-3, 2, 0); //aponta na direção de (0, 0, 0)
luzDirecional2.intensity = 3;

cena.add(luzPonto1);
cena.add(luzPonto2);
cena.add(luzDirecional1);
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

//Alterar a Cor da Madeira
color_wood.addEventListener("click", function(event){
  if (event.target.type === "radio") {
    // Capturar o valor da opção selecionada (cor)
    const selectedColor = event.target.value;

    if (selectedColor=="wood") {    
      console.log("CATCHAU:",candidatos)
      for (let index = 0; index < candidatos.length-1; index++) {
        if(candidatos[index].material.name=="Wood"){
          candidatos[index].material.map=new THREE.TextureLoader().load("./model/materials/madeira_clara.jpg");
        }else if(candidatos[index].material.name=="Wicker"){
          candidatos[index].material.map=new THREE.TextureLoader().load("./model/materials/Wicker2_Color_1K.png");
        }
      }
  }else if (selectedColor=="wood1") {    
        console.log("CATCHAU:",candidatos)
        for (let index = 0; index < candidatos.length-1; index++) {
          if(candidatos[index].material.name=="Wood"){
            candidatos[index].material.map=new THREE.TextureLoader().load("./model/materials/madeira_clara.jpg");
          }else if(candidatos[index].material.name=="Wicker"){
            candidatos[index].material.map=new THREE.TextureLoader().load("./model/materials/Wicker2_Color_1K.png");
          }
        }
    } else if(selectedColor=="wood2"){
        for (let index = 0; index < candidatos.length-1; index++) {
          if(candidatos[index].material.name=="Wood"){
            candidatos[index].material.map=new THREE.TextureLoader().load("./model/materials/madeira_cinza.jpg");
          }else if(candidatos[index].material.name=="Wicker"){
            candidatos[index].material.map=new THREE.TextureLoader().load("./model/materials/Wicker2_Color_1K.png");
          }
        }
    } else if(selectedColor=="wood3"){
      for (let index = 0; index < candidatos.length-1; index++) {
        if(candidatos[index].material.name=="Wood"){
          candidatos[index].material.map=new THREE.TextureLoader().load("./model/materials/madeira_es ra.jpg");
        }else if(candidatos[index].material.name=="Wicker"){
          candidatos[index].material.map=new THREE.TextureLoader().load("./model/materials/Wicker2_Color_1K.png");
        }
      }
    }
}
})

//CONTROLO do LOOP das ANIMAÇÕES
menuLoop.addEventListener("change", function() {
    switch (menuLoop.value) {
        case "1":
            acao_abrePortaR.setLoop(THREE.LoopOnce);
            acao_abrePortaR.clampWhenFinished = true
            acao_abrePortaL.setLoop(THREE.LoopOnce);
            acao_abrePortaL.clampWhenFinished = true
            acao_abreGavetaR.setLoop(THREE.LoopOnce);
            acao_abreGavetaR.clampWhenFinished = true
            acao_abreGavetaL.setLoop(THREE.LoopOnce);
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

//AÇÕES PORTA DIREITA
// Abrir/fechar PORTA DIREITA
btn_play_PortaR.onclick = function () {
  abrir_PortaR();
};

function abrir_PortaR(){
    if(acao_abrePortaR.paused && acao_abrePortaR.timeScale == -1){
      acao_abrePortaR.stop()
    }
    if (acao_abrePortaR.paused){
      acao_abrePortaR.paused = !acao_abrePortaR.paused
      acao_abrePortaR.timeScale = -1
    }
    else {
      acao_abrePortaR.timeScale = 1
      acao_abrePortaR.play()
    }
}

// Pausar animação PORTA DIREITA
btn_pause_PortaR.onclick = function () {
    if (!acao_abrePortaR.paused){
      acao_abrePortaR.paused = !acao_abrePortaR.paused
    } else {
      acao_abrePortaR.paused = !acao_abrePortaR.paused
      acao_abrePortaR.play()
    }
}

//AÇÕES PORTA ESQUERDA
// Abrir/fechar PORTA ESQUERDA
btn_play_PortaL.onclick = function () {
  abrir_PortaL();
};

function abrir_PortaL() {
  if(acao_abrePortaL.paused && acao_abrePortaL.timeScale == -1){
    acao_abrePortaL.stop()
  }
  if (acao_abrePortaL.paused){
    acao_abrePortaL.paused = !acao_abrePortaL.paused
    acao_abrePortaL.timeScale = -1
  }
  else {
    acao_abrePortaL.timeScale = 1
    acao_abrePortaL.play()
  }
}

// Pausar animação PORTA ESQUERDA
btn_pause_PortaL.onclick = function () {
  if (!acao_abrePortaL.paused){
    acao_abrePortaL.paused = !acao_abrePortaL.paused
  } else {
    acao_abrePortaL.paused = !acao_abrePortaL.paused
    acao_abrePortaL.play()
  }
}

//AÇÕES GAVETA DIREITA
// Abrir/fechar GAVETA DIREITA
btn_play_GavetaR.onclick = function () {
  abrir_GavetaR();
}

function abrir_GavetaR() {
  if(acao_abreGavetaR.paused && acao_abreGavetaR.timeScale == -1){
    acao_abreGavetaR.stop()
  }
  if (acao_abreGavetaR.paused){
    acao_abreGavetaR.paused = !acao_abreGavetaR.paused
    acao_abreGavetaR.timeScale = -1
  }
  else {
    acao_abreGavetaR.timeScale = 1
    acao_abreGavetaR.play()
  }
}

// Pausar animação GAVETA DIREITA
btn_pause_GavetaR.onclick = function () {
  if (!acao_abreGavetaR.paused){
    acao_abreGavetaR.paused = !acao_abreGavetaR.paused
  } else {
    acao_abreGavetaR.paused = !acao_abreGavetaR.paused
    acao_abreGavetaR.play()
  }
}

//AÇÕES GAVETA ESQUERDA
// Abrir/fechar GAVETA ESQUERDA
btn_play_GavetaL.onclick = function () {
  abrir_GavetaL();
}

function abrir_GavetaL() {
  if(acao_abreGavetaL.paused && acao_abreGavetaL.timeScale == -1){
    acao_abreGavetaL.stop()
  }
  if (acao_abreGavetaL.paused){
    acao_abreGavetaL.paused = !acao_abreGavetaL.paused
    acao_abreGavetaL.timeScale = -1
  }
  else {
    acao_abreGavetaL.timeScale = 1
    acao_abreGavetaL.play()
  }
}

// Pausar animação GAVETA ESQUERDA
btn_pause_GavetaL.onclick = function () {
  if (!acao_abreGavetaL.paused){
    acao_abreGavetaL.paused = !acao_abreGavetaL.paused
  } else {
    acao_abreGavetaL.paused = !acao_abreGavetaL.paused
    acao_abreGavetaL.play()
  }
}



//Ações em Simultaneo
//Todas as açoes em Simultaneo
btn_play.onclick = function () {
  if(acao_abreGavetaL.paused && acao_abreGavetaL.timeScale == -1){
    acao_abreGavetaL.stop()
    acao_abreGavetaR.stop()
    acao_abrePortaL.stop()
    acao_abrePortaR.stop()
  }
  if (acao_abreGavetaL.paused || acao_abreGavetaR.paused || acao_abrePortaL.paused || acao_abrePortaR.paused){
    acao_abreGavetaL.paused = !acao_abreGavetaL.paused
    acao_abreGavetaL.timeScale = -1

    acao_abreGavetaR.paused = !acao_abreGavetaR.paused
    acao_abreGavetaR.timeScale = -1

    acao_abrePortaL.paused = !acao_abrePortaL.paused
    acao_abrePortaL.timeScale = -1

    acao_abrePortaR.paused = !acao_abrePortaR.paused
    acao_abrePortaR.timeScale = -1
  }
  else {
    acao_abreGavetaL.timeScale = 1
    acao_abreGavetaL.play()
    acao_abreGavetaR.timeScale = 1
    acao_abreGavetaR.play()
    acao_abrePortaL.timeScale = 1
    acao_abrePortaL.play()
    acao_abrePortaR.timeScale = 1
    acao_abrePortaR.play()
  }
}

//Parar todas as Animações
btn_stop.onclick = function () {
  acao_abrePortaR.stop()
  acao_abrePortaL.stop()
  acao_abreGavetaR.stop()
  acao_abreGavetaL.stop()

}

console.log(cena.getObjectByName(cena.name))
