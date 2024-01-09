import * as THREE from "three";
import { OrbitControls } from "three/examples/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/loaders/GLTFLoader.js";


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
  const btn_stop_PortaR = document.getElementById("btn_stop_PortaR");
  const btn_reverse_PortaR = document.getElementById("btn_reverse_PortaR");

  //Botões de Controlo da PORTA ESQUERDA
  const btn_play_PortaL = document.getElementById("btn_play_PortaL");
  const btn_pause_PortaL = document.getElementById("btn_pause_PortaL");
  const btn_stop_PortaL = document.getElementById("btn_stop_PortaL");
  const btn_reverse_PortaL = document.getElementById("btn_reverse_PortaL");

  //Botões de Controlo da GAVETA DIREITA
  const btn_play_GavetaR = document.getElementById("btn_play_GavetaR");
  const btn_pause_GavetaR = document.getElementById("btn_pause_GavetaR");
  const btn_stop_GavetaR = document.getElementById("btn_stop_GavetaR");
  const btn_reverse_GavetaR = document.getElementById("btn_reverse_GavetaR");

  //Botões de Controlo da GAVETA ESQUERDA
  const btn_play_GavetaL = document.getElementById("btn_play_GavetaL");
  const btn_pause_GavetaL = document.getElementById("btn_pause_GavetaL");
  const btn_stop_GavetaL = document.getElementById("btn_stop_GavetaL");
  const btn_reverse_GavetaL = document.getElementById("btn_reverse_GavetaL");

  //Botões de Controlo de todas as ANIMAÇÕES
  const btn_play = document.getElementById("btn_play");
  const btn_stop = document.getElementById("btn_stop");

  //Cores
  //const color_white = 
  //const color_gray = 
  //const color_black = 

  //console.log("COLORS:", color_gray, color_white, color_black);



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
 // console.log("candidatos", candidatos)
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

canva.onclick = function (evento) {
  var limites = evento.target.getBoundingClientRect()
  rato.x = 2 * (evento.clientX - limites.left) / parseInt(meuCanvas.style.width) - 1
  rato.y = 1 - 2 * (evento.clientY - limites.top) / parseInt(meuCanvas.style.height)

  /*rato.x = (evento.clientX / 800) * 2 - 1   // se nao der meter window.innerWidth
  rato.y = -(evento.clientY /600) * 2 + 1  // se nao der meter window.innerHeight
  */

  // invocar raycaster
  pegarPrimeiro()
}

// Controlos de cena -> OrbitControls
let controlos = new OrbitControls(camera, renderer.domElement);

// Renderizar e animar
function renderizar() {
  /*const intersects = raycaster.intersectObjects( cena.children );
  for ( let i = 0; i < intersects.length; i ++ ) {
		intersects[ i ].object.material.color.set( 0xff0000 );
	}*/

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
  console.error(acao_abrePortaR);
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

// Stop animação PORTA DIREITA
btn_stop_PortaR.onclick = function () {
    acao_abrePortaR.stop()
}

// Reverse animação PORTA DIREITA
btn_reverse_PortaR.onclick = function () {
  if (acao_abrePortaR.timeScale = -1) {
    acao_abrePortaR.timeScale = 1
  }else{
    acao_abrePortaR.timeScale = -1
  }
}


//AÇÕES PORTA ESQUERDA
// Abrir/fechar PORTA ESQUERDA
btn_play_PortaL.onclick = function () {
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

// Stop animação PORTA ESQUERDA
btn_stop_PortaL.onclick = function () {
  acao_abrePortaL.stop()
}

// Reverse animação PORTA ESQUERDA
btn_reverse_PortaL.onclick = function () {
if (acao_abrePortaL.timeScale = -1) {
  acao_abrePortaL.timeScale = 1
}else{
  acao_abrePortaL.timeScale = -1
}
}



//AÇÕES GAVETA DIREITA
// Abrir/fechar GAVETA DIREITA
btn_play_GavetaR.onclick = function () {
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

// Stop animação GAVETA DIREITA
btn_stop_GavetaR.onclick = function () {
  acao_abreGavetaR.stop()
}

// Reverse animação GAVETA DIREITA
btn_reverse_GavetaR.onclick = function () {
if (acao_abreGavetaR.timeScale = -1) {
  acao_abreGavetaR.timeScale = 1
}else{
  acao_abreGavetaR.timeScale = -1
}
}


//AÇÕES GAVETA ESQUERDA
// Abrir/fechar GAVETA ESQUERDA
btn_play_GavetaL.onclick = function () {
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

// Stop animação GAVETA ESQUERDA
btn_stop_GavetaL.onclick = function () {
  acao_abreGavetaL.stop()
}

// Reverse animação GAVETA ESQUERDA
btn_reverse_GavetaL.onclick = function () {
if (acao_abreGavetaL.timeScale = -1) {
  acao_abreGavetaL.timeScale = 1
}else{
  acao_abreGavetaL.timeScale = -1
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
