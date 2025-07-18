import '../sass/style.scss';
import { iniciarJuego, activarEventosCartas, desactivarEventosCartas, reiniciarJuego } from './game.js';
import { startStop, reset } from './timer.js';

const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');

document.addEventListener('DOMContentLoaded', () => {
    iniciarJuego();
});

// Cuando inicias el juego
startStopButton.addEventListener('click', () => {
    startStop();
    if (startStopButton.textContent === 'Detener') {
        activarEventosCartas(); // activar clics
    } else {
        desactivarEventosCartas(); // detener clics
    }
});

// Cuando reinicias
resetButton.addEventListener('click', () => {
    reset();
    desactivarEventosCartas();
    // Aquí podrías recargar el juego si quieres:
    // location.reload(); 
});

resetButton.addEventListener('click', () => {
    reset(); // reinicia el tiempo
    desactivarEventosCartas(); // por si acaso hay algún evento activo
    reiniciarJuego(); // 🔁 nuevo tablero
});