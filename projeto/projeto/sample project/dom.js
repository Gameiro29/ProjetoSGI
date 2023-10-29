const quit3DBtn = document.querySelector(".quit")
const modalWrapper = document.querySelector(".modal")
const open3DBtn = document.querySelector(".button-3d")
const options3DTrigger = document.querySelector("#trigger-3d")
const options3D = document.querySelector("#options-3d")

function change3DState(){
    if(modalWrapper.dataset.visible == "true")
        modalWrapper.dataset.visible = false
    else
        modalWrapper.dataset.visible = true
}

open3DBtn.onclick = quit3DBtn.onclick = change3DState

options3DTrigger.onclick = () => {
    if(options3D.dataset.open == "true"){
        options3D.dataset.open = false
        options3DTrigger.textContent = '←'
    }else{
        options3D.dataset.open = true
        options3DTrigger.textContent = '→'
    }

}