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
            // color = colores[par - 1]; // no es necesario de momento
        } else {
            do { par = Math.floor(Math.random() * 15 + 1); } while (segundoPar.has(par));
            segundoPar.add(par);
            // color = colores[par - 1]; // no es necesario de momento
        }
        carta.classList.add(`par${par}`);
        colorearCarta(carta, colorPorDefecto);
    });

    let primeraCarta = '';
    let segundaCarta = '';
    let inicioJuego = Date.now();

    const lista = document.createElement('ul'); // Se crea una lista donde se añadirán las cartas encontradas
    lista.textContent = 'Parejas encontradas:';
    document.getElementsByClassName('container')[0].after(lista);

    arrayCartas.forEach(carta => {
        carta.addEventListener('click', () => {
            if (carta.classList.contains('turnedCard')) return;

            const clasePar = [...carta.classList].find(cl => cl.startsWith('par'));
            const parIndex = parseInt(clasePar.replace('par', '')) - 1;
            const color = colores[parIndex];

            colorearCarta(carta, color); // Colorea la carta
            carta.textContent = `${parIndex + 1}`; // Identifica la carta con su número en el DOM
            carta.classList.add('turnedCard');  // Añade la clase turnedCard

            // Se evalua si ña carta está vacía o no para agregar la clase
            if (!primeraCarta) {
                primeraCarta = clasePar;
            } else {
                segundaCarta = clasePar;

                // Si los dos pares de cartas son iguales se entra en este condicional
                if (primeraCarta === segundaCarta) {
                    const mensaje = document.createElement('li');
                    mensaje.classList.add('mensaje');
                    mensaje.textContent = `Has encontrado el par de cartas ${primeraCarta.replace('par', '')}`;
                    lista.appendChild(mensaje); // Se agrega el nuevo par de cartas encontrado a la lista

                    parejasFormadas.add(primeraCarta); // Se añade el par de cartas encontrado

                    // Si se han encontrado las 15 parejas se entra en este condicional
                    if (parejasFormadas.size === 15) {
                    const finJuego = Date.now();
                    const segundos = Math.floor((finJuego - inicioJuego) / 1000);
                    alert(`¡Ganaste! Tiempo: ${segundos} segundos`);
                    }

                    primeraCarta = '';
                    segundaCarta = '';

                    // Si las dos cartas son diferentes se entra en esta condición 
                } else {
                    // Se 
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
                    }, 1000);
                }
            }
        });
    });
};
