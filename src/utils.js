// utils.js

export const crearColorAleatorio = () => {
  return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
};

export const generarColoresUnicos = (cantidad) => {
    const colores = new Set();
    while (colores.size < cantidad) {
        colores.add(crearColorAleatorio());
    }
    return [...colores];
};

