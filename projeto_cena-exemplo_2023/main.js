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
carregador.load("./model/vintageDesk.gltf", function (gltf) {
  cena.add(gltf.scene);
});

//Configuração de luzes
const luzAmbiente = new THREE.AmbientLight("lightgreen");
cena.add(luzAmbiente);

const luzPonto = new THREE.PointLight("white");
luzPonto.position.set(0, 2, 2);
luzPonto.intensity = 15;
cena.add(luzPonto);
// auxiliar visual
const LightHelper1 = new THREE.PointLightHelper(luzPonto, 0.2);
cena.add(LightHelper1);

const luzDirecional = new THREE.DirectionalLight("white");
luzDirecional.position.set(3, 2, 0); //aponta na direção de (0, 0, 0)
luzDirecional.intensity = 30;
cena.add(luzDirecional);
// auxiliar visual
const LightHelper2 = new THREE.DirectionalLightHelper(luzDirecional, 0.2);
cena.add(LightHelper2);

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
