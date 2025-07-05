// game.js

import { generarColoresUnicos } from './utils.js';
import { colorearCarta, obtenerCartas } from './dom.js';

export const iniciarJuego = () => {
    const cartas = obtenerCartas();
    const arrayCartas = [...cartas];
    const colorPorDefecto = 'rgb(51, 51, 51)';

    let primerPar = new Set();
    let segundoPar = new Set();
    let parejasFormadas = new Set();
    const colores = generarColoresUnicos(15);

    // Asignar clases y colores por par
    cartas.forEach(carta => {
        let par;
        let color;
        if (primerPar.size < 15) {
        do { par = Math.floor(Math.random() * 15 + 1); } while (primerPar.has(par));
            primerPar.add(par);
            color = colores[par - 1];
        } else {
            do { par = Math.floor(Math.random() * 15 + 1); } while (segundoPar.has(par));
            segundoPar.add(par);
            color = colores[par - 1];
        }
        carta.classList.add(`par${par}`);
        colorearCarta(carta, colorPorDefecto);
    });

    let primeraCarta = '';
    let segundaCarta = '';
    let inicioJuego = Date.now();

    arrayCartas.forEach(carta => {
        carta.addEventListener('click', () => {
            if (carta.classList.contains('turnedCard')) return;

            const clasePar = [...carta.classList].find(cl => cl.startsWith('par'));
            const parIndex = parseInt(clasePar.replace('par', '')) - 1;
            const color = colores[parIndex];

            colorearCarta(carta, color);
            carta.classList.add('turnedCard');

            if (!primeraCarta) {
                primeraCarta = clasePar;
            } else {
                segundaCarta = clasePar;

                if (primeraCarta === segundaCarta) {
                    parejasFormadas.add(primeraCarta);
                    if (parejasFormadas.size === 15) {
                    const finJuego = Date.now();
                    const segundos = Math.floor((finJuego - inicioJuego) / 1000);
                    alert(`¡Ganaste! Tiempo: ${segundos} segundos`);
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
                            c.classList.remove('turnedCard');
                            }
                    });
                    primeraCarta = '';
                    segundaCarta = '';
                    }, 1000);
                }
            }
        });
    });
};
