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

// Criar e configurar o renderer
let renderer = new THREE.WebGLRenderer({canvas : canva});
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;

// Criar Eixos
let eixos = new THREE.AxesHelper();
cena.add(eixos);

// Criar Grelha
let grelha = new THREE.GridHelper();
cena.add(grelha);

function pegarPrimeiro() {
  raycaster.setFromCamera(rato, camera)
  let intersetados = raycaster.intersectObjects(candidatos)
  console.log(intersetados.length)
  if (intersetados.length > 0) {
      // fazer o que houver a fazer com o primeiro interesetado . . . intersetados[0].object . . .
      console.log(intersetados[0].object.name)
      //object.getObjectByName(alvo) 
      alvo.material = intersetados[0].object.material
  }
}

window.onclick = function (evento) {
  rato.x = (evento.clientX / window.innerWidth) * 2 - 1   // se nao der meter window.innerWidth
  rato.y = -(evento.clientY / window.innerHeight) * 2 + 1  // se nao der meter window.innerHeight

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
          /*if (elemento.name == 'Cubo') {
              alvo = elemento
              console.log(alvo)
          }*/
          if (elemento.name.includes('Porta_R')){  //tinha else if aqui
              console.log(elemento)
              candidatos.push(elemento)
              
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

function animar() {
  requestAnimationFrame(animar); 
  renderer.render(cena, camera);
}
// iniciar animar
animar();

console.log(cena.getObjectByName(cena.name))