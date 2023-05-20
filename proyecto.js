const encriptador = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat",
};
const desencriptador = {
    "ai": "a",
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ufat": "u",
};
const encriptarFunction = (texto) => texto.replace(/[aeiou]/g, letra => encriptador[letra]);
const desencriptarFunction = (texto) => texto.replace(/ai|enter|imes|ober|ufat/g, palabra => desencriptador[palabra]);

function printDesencriptadorInf(textEncriptado,desencriptarInf$) {
    desencriptarInf$.innerHTML = `
    <p>${textEncriptado}</p>
    <button class="btn copiar ">Copiar</button>
`;
}
function cambiarDisplay(elemento,display) {
    return elemento.style.display = display;
}
function validarContenido(contenido) {
    const regex = /^[a-z\s]+$/;
    return !regex.test(contenido);
}
function toggleEncryption(encriptador$,desencriptarInf$) {
    const botones$ = document.querySelector('.botones');
    botones$.addEventListener('click',(e) => {
        const btnEncriptar = e.target.classList.contains('Encriptar');
        const btnDesencriptar = e.target.classList.contains('Desencriptar')
        if (!encriptador$.value) return
        if (validarContenido(encriptador$.value)) {
            encriptador$.focus();
            return Swal.fire({
                icon: 'info',
                title: '¡Asegurate de solo poner letras minusculas sin caracteres especiales o numeros!',
                showConfirmButton: false,
                timer: 2000 
            });
        }

        if (btnEncriptar || btnDesencriptar) {
            if (btnEncriptar) {
                const textEncriptado = encriptarFunction(encriptador$.value);
                printDesencriptadorInf(textEncriptado,desencriptarInf$);
            }
            if (btnDesencriptar) {
                const textoDesencriptado = desencriptarFunction(encriptador$.value);
                printDesencriptadorInf(textoDesencriptado,desencriptarInf$);
            }
            cambiarDisplay(placeholderInf,'none');
            cambiarDisplay(desencriptarInf$,'block');
            btnCopiar(desencriptarInf$,encriptador$);
            encriptador$.value = ''
        }
        encriptador$.focus();
    })
}
function handlePlaceholderInf(encriptador$,desencriptarInf$) {
    encriptador$.addEventListener("input",()=> {
        if (encriptador$.value.trim() === '') {
            cambiarDisplay(placeholderInf,'flex');
            cambiarDisplay(desencriptarInf$,'none');
        }
    })
}
function btnCopiar(desencriptarInf$,encriptador$) {
    const btnCopiar$ = document.querySelector(".copiar");
    const textAcopiar = desencriptarInf$.firstElementChild;
    btnCopiar$.addEventListener('click', async() => {
        await navigator.clipboard.writeText(textAcopiar.textContent)
        encriptador$.focus()
        btnCopiar$.textContent = 'Texto Copiado'
        setTimeout(() => {
            btnCopiar$.textContent = 'Copiar'
        }, 2000);
    })    
}
function darkMode() {
    toggle.addEventListener('change',() => {
        if (toggle.checked) {
            console.log('activado')
            document.querySelector('body').classList.add('modoNoche');
        } else {
            document.querySelector('body').classList.remove('modoNoche');
        }
    })
}

const main = () => {
    const encriptador$ = document.getElementById('encriptador');
    const desencriptarInf$ = document.getElementById('desencriptarInf');
    toggleEncryption(encriptador$,desencriptarInf$); // accion de los botones
    handlePlaceholderInf(encriptador$,desencriptarInf$); // encargado de activar placehoder en el caso de que no haya texto    
}
window.addEventListener("load",() => {
    main();
    darkMode();
})