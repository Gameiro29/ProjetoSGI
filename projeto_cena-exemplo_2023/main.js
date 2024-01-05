import * as THREE from "three";
import { OrbitControls } from "three/examples/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/loaders/GLTFLoader.js";

const btn_cor = document.getElementById("btn_cor");
const btn_material = document.getElementById("btn_material");
const btn_transparencia = document.getElementById("btn_transparencia");
const btn_repor = document.getElementById("btn_repor");
const btn_vis = document.getElementById("btn_vis");

// Criar a cena
let cena = new THREE.Scene();
cena.background = new THREE.Color("lightgray");

// Criar e posicionar a camara
let camara = new THREE.PerspectiveCamera(70, 800 / 600, 0.1, 500);
camara.position.x = 2;
camara.position.y = 3;
camara.position.z = 5;
camara.lookAt(0, 0, 0);

// Criar e configurar o renderer
let renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);
document.body.appendChild(renderer.domElement);

// Criar Eixos
let eixos = new THREE.AxesHelper();
cena.add(eixos);

// Criar Grelha
let grelha = new THREE.GridHelper();
cena.add(grelha);

// Controlos de cena -> OrbitControls
let controlos = new OrbitControls(camara, renderer.domElement);

// Renderizar e animar
function renderizar() {
  renderer.render(cena, camara);
}
renderizar();
controlos.addEventListener("change", renderizar);

// Load do modelo 3D -> GLTFLoader
let carregador = new GLTFLoader();
carregador.load("./model/mesaAnimacao.gltf", function (gltf) {
  cena.add(gltf.scene);
});

//Configuração de luzes
//luz frente
const luzPonto = new THREE.PointLight("white");  
luzPonto.position.set(0, 2, 2);
luzPonto.intensity = 10;
cena.add(luzPonto);
// auxiliar visual
//const LightHelper1 = new THREE.PointLightHelper(luzPonto, 0.2);
//cena.add(LightHelper1);

//luz trás
const luzPonto2 = new THREE.PointLight("white");  
luzPonto2.position.set(0, 2, -2);
luzPonto2.intensity = 10;
cena.add(luzPonto2);

//luz lado direito
const luzDirecional1 = new THREE.DirectionalLight("white");     
luzDirecional1.position.set(3, 2, 0); //aponta na direção de (0, 0, 0)
luzDirecional1.intensity = 15;
cena.add(luzDirecional1);
// auxiliar visual
//const LightHelper2 = new THREE.DirectionalLightHelper(luzDirecional1, 0.2);
//cena.add(LightHelper2);

//luz lado esquerdo
const luzDirecional2 = new THREE.DirectionalLight("white");     
luzDirecional2.position.set(-3, 2, 0); //aponta na direção de (0, 0, 0)
luzDirecional2.intensity = 15;
cena.add(luzDirecional2);

// Renderizar e animar
let delta = 0; // tempo desde a última atualização
let relogio = new THREE.Clock(); // componente que obtém o delta
let latencia_minima = 1 / 60; // tempo mínimo entre cada atualização
function animar() {
  requestAnimationFrame(animar); // agendar animar para o próximo animation frame
  delta += relogio.getDelta(); // acumula tempo entre chamadas de getDelta
  if (delta < latencia_minima) return; // não exceder a taxa de atualização
  // atualizar rotação do cubo
  cubo.rotateX(0.01);
  cubo.rotateY(0.02);
  // mostrar...
  renderer.render(cena, camara);
  delta = delta % latencia_minima; // atualizar delta com o excedente
}
// iniciar animar
animar();
