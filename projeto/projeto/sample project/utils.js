function isChecked(id){

    const elem = document.getElementById(id);

    if(elem.dataset.checked === 'false')
        elem.dataset.checked = 'true'
    else
        elem.dataset.checked = 'false'
}

function changeView(value){
    const elem = document.getElementById('visualizar');

    elem.dataset.active = value
}