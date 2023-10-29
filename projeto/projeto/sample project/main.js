//Preparação da cena
const canvas = document.getElementById("canvas")
const leftDoorTrigger = document.querySelector("#leftdoor")
const resetOptionsBtn = document.querySelector("#clear-3d-options")

var cena = new THREE.Scene(); 

var renderer = new THREE.WebGLRenderer(); 
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
canvas.appendChild(renderer.domElement)

var axes = new THREE.AxesHelper();
cena.add(axes)

var camara = new THREE.PerspectiveCamera( 70, canvas.clientWidth / canvas.clientHeight, 0.01, 1000 ); 
camara.position.z = 10;
camara.position.y = 8;

new THREE.OrbitControls(camara, document.body)

let mixer = new THREE.AnimationMixer(cena)
let clock = new THREE.Clock()

const geometry = new THREE.CircleGeometry( 0.3, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xff0f00 } );

const loader = new THREE.GLTFLoader()

var elements = []

loader.load(
    './TV.gltf',
    (gltf) => {
        cena.add(gltf.scene)
        clipUpperDrawer = THREE.AnimationClip.findByName( gltf.animations, 'drawerUpOpen' )
        clipLeftDoor = THREE.AnimationClip.findByName( gltf.animations, 'doorLeftOpen' )
        actionUpperDrawer = mixer.clipAction(clipUpperDrawer)
        actionLeftDoor = mixer.clipAction(clipLeftDoor)

        cena.traverse((obj) => {
            if(obj.isMesh){
                elements.push(obj)
            }
        })

        console.log(elements)
     
    } 
)


// iniciar animação... 
animar(); 
addLights();



let opened = false
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()

window.onclick = function(e){
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    pickOne();
    
}



function animar() { 
requestAnimationFrame( animar ); 

mixer.update(clock.getDelta());

// mostrar... 
renderer.render( cena, camara ); 
} 

function addLights(){
    let ambientLight = new THREE.AmbientLight(0xFFFFFF)
    cena.add(ambientLight)
    let pointLightFront, pointLightBack, directionalLightLeft, directionalLightRight
    pointLightFront = new THREE.PointLight(0xFFFFFF, 8);
    pointLightBack = new THREE.PointLight(0xFFFFFF, 8);
    directionalLightRight = new THREE.DirectionalLight(0xFFFFFF, 10)
    directionalLightLeft = new THREE.DirectionalLight(0xFFFFFF, 10)

    pointLightFront.position.z = 10;
    pointLightFront.position.y = 5;

    pointLightBack.position.z = -10;
    pointLightBack.position.y = 8;

    directionalLightLeft.position.x = -15;
    directionalLightLeft.position.y = 8;
    directionalLightLeft.scal    

    directionalLightRight.position.x = 10;
    directionalLightRight.position.z = 8;

    cena.add(pointLightFront)
    cena.add(pointLightBack)
    cena.add(directionalLightLeft)
    cena.add(directionalLightRight)
}

function pickOne(){

    raycaster.setFromCamera(mouse, camara)

    var intersected = raycaster.intersectObjects(elements)

    if(intersected.length > 0)
        if(intersected[0].object.name === "drawerUp_2"){
            actionUpperDrawer.setLoop(THREE.LoopOnce)

            if(!opened){
                actionUpperDrawer.enabled = true
                actionUpperDrawer.reset()
                actionUpperDrawer.play()
                actionUpperDrawer.clampWhenFinished = true
            }else{
                actionUpperDrawer.paused = false
                actionUpperDrawer.timeScale = -1
            }

            opened = !opened
        }
}

leftDoorTrigger.onclick = () => {

    if(leftDoorTrigger.dataset.opened == 'false'){
        actionLeftDoor.reset()
        actionLeftDoor.timeScale = 1;
        actionLeftDoor.clampWhenFinished = true
        actionLeftDoor.setLoop(THREE.LoopOnce)
        actionLeftDoor.play()

        leftDoorTrigger.dataset.opened = 'true'
    }else{
        if (actionLeftDoor.time === 0) {
          actionLeftDoor.time = clipLeftDoor.duration
        }
        actionLeftDoor.paused = false
        action.setLoop(THREE.LoopOnce)
        actionLeftDoor.timeScale = -1.0
        leftDoorTrigger.dataset.opened = 'false'
    }
}

resetOptionsBtn.onclick = () => {
    actionLeftDoor.reset()
    actionUpperDrawer.reset()
}