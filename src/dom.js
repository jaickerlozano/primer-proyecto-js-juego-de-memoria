// dom.js

export const colorearCarta = (carta, color) => {
    carta.style.background = color;
};

export const obtenerCartas = () => {
    return document.querySelectorAll('.cartas');
};
