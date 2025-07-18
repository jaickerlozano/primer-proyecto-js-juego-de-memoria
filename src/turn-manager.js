// Con esta parte del código se bloquean los eventos cuando hay dos cartas abiertas. De esta forma no se crea un bug.
let bloqueo = false;

export const estaBloqueado = () => bloqueo;

export const activarBloqueo = () => {
    bloqueo = true;
};

export const desactivarBloqueo = () => {
    bloqueo = false;
};
