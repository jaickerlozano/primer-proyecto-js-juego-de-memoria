// game.js

import { generarColoresUnicos } from './utils.js';
import { colorearCarta, obtenerCartas } from './dom.js';

let cartas = [];
let cartaClickHandler; // función para manejar clics, la guardamos para poder removerla

export const iniciarJuego = () => {
    cartas = obtenerCartas(); // guardamos cartas globalmente
    const arrayCartas = [...cartas];
    const colorPorDefecto = 'rgb(51, 51, 51)';
    const colores = generarColoresUnicos(15);

    let primerPar = new Set();
    let segundoPar = new Set();
    let parejasFormadas = new Set();
    let contador = 0;
    let primeraCarta = '';
    let segundaCarta = '';
    let inicioJuego = Date.now();

    const lista = document.createElement('ul');
    lista.textContent = 'Parejas encontradas:';
    document.querySelector('.container').after(lista);

    const mensajeContador = document.createElement('p');
    mensajeContador.classList.add('contador');
    lista.before(mensajeContador);

    // Asignar clases y colores
    cartas.forEach(carta => {
        let par;
        if (primerPar.size < 15) {
            do { par = Math.floor(Math.random() * 15 + 1); } while (primerPar.has(par));
            primerPar.add(par);
        } else {
            do { par = Math.floor(Math.random() * 15 + 1); } while (segundoPar.has(par));
            segundoPar.add(par);
        }
        carta.classList.add(`par${par}`);
        colorearCarta(carta, colorPorDefecto);
    });

    // Función manejadora del clic (guardada para poder quitarla después)
    cartaClickHandler = function () {
        if (this.classList.contains('turnedCard')) return;

        const clasePar = [...this.classList].find(clase => clase.startsWith('par'));
        const parIndex = parseInt(clasePar.replace('par', '')) - 1;
        const color = colores[parIndex];

        colorearCarta(this, color);
        this.textContent = `${parIndex + 1}`;
        this.classList.add('turnedCard');

        if (!primeraCarta) {
            primeraCarta = clasePar;
        } else {
            segundaCarta = clasePar;

            if (primeraCarta === segundaCarta) {
                const mensaje = document.createElement('li');
                mensaje.classList.add('mensaje');
                mensaje.textContent = `Has encontrado el par de cartas ${primeraCarta.replace('par', '')}`;
                lista.appendChild(mensaje);

                parejasFormadas.add(primeraCarta);
                contador++;
                mensajeContador.textContent = `Total encontradas: ${contador}`;

                if (parejasFormadas.size === 15) {
                    const finJuego = Date.now();
                    const segundos = Math.floor((finJuego - inicioJuego) / 1000);
                    alert(`🎉¡Ganaste! Tiempo: ${segundos} segundos`);
                }

                primeraCarta = '';
                segundaCarta = '';
            } else {
                setTimeout(() => {
                    arrayCartas.forEach(c => {
                        if (
                            (c.classList.contains(primeraCarta) || c.classList.contains(segundaCarta)) &&
                            !parejasFormadas.has(c.classList[1])
                        ) {
                            colorearCarta(c, colorPorDefecto);
                            c.textContent = '';
                            c.classList.remove('turnedCard');
                        }
                    });
                    primeraCarta = '';
                    segundaCarta = '';
                }, 500);
            }
        }
    };
};

// Activar eventos
export function activarEventosCartas() {
    cartas.forEach(carta => {
        carta.addEventListener('click', cartaClickHandler);
    });
}

// Desactivar eventos
export function desactivarEventosCartas() {
    cartas.forEach(carta => {
        carta.removeEventListener('click', cartaClickHandler);
    });
}

// Reiniciar juego
export function reiniciarJuego() {
    // Eliminar cartas del DOM
    const contenedor = document.querySelector('.container');
    contenedor.innerHTML = ''; // Limpia todo dentro del contenedor

    // Eliminar mensajes y contador
    const lista = document.querySelector('ul');
    const contador = document.querySelector('.contador');
    if (lista) lista.remove();
    if (contador) contador.remove();

    // Volver a crear las cartas
    for (let i = 0; i < 30; i++) {
        const carta = document.createElement('div');
        carta.classList.add('cartas');
        contenedor.appendChild(carta);
    }

    // Iniciar nuevamente el juego con las nuevas cartas
    iniciarJuego();
}