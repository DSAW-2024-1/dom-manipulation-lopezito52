const lista = document.querySelector('#lista');
const input = document.querySelector('#Tarea'); // Cambiado de '#tarea' a '#Tarea'
const botonEnter = document.querySelector('#boton-agregar');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'tachado';
let LIST = [];
let id = 0;

function agregarTarea(tarea, id, realizado, eliminado) {
    if (eliminado) { return; }

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : '';

    const elemento = `
        <li class="elemento">
            <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
            <p class="text ${LINE}">${tarea}</p>
            <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
        </li>
    `;
    lista.insertAdjacentHTML("beforeend", elemento);
}

function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[element.id].realizado = !LIST[element.id].realizado;
}

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true;
}

botonEnter.addEventListener('click', () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        });
        localStorage.setItem('TODO', JSON.stringify(LIST));
        id++;
        input.value = '';
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea, id, false, false);
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            });
            localStorage.setItem('TODO', JSON.stringify(LIST));
            input.value = '';
            id++;
        }
    }
});

lista.addEventListener('click', function (event) {
    const element = event.target;
    const elementData = element.getAttribute('data');
    if (elementData === 'realizado') {
        tareaRealizada(element);
    } else if (elementData === 'eliminado') {
        tareaEliminada(element);
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
});

// Cargar lista desde el localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    let data = localStorage.getItem('TODO');
    if (data) {
        LIST = JSON.parse(data);
        id = LIST.length;
        cargarLista(LIST);
    }
});

function cargarLista(array) {
    array.forEach(function (item) {
        agregarTarea(item.nombre, item.id, item.realizado, item.eliminado);
    });
}
