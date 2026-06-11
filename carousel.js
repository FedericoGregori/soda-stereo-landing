/* ── CARRUSELES (Obra solista y Soda Stereo) ──────────────────────
Basado en https://codepen.io/YousifW/pen/LKBxZX

CÓMO FUNCIONA LA IDEA GENERAL:
El JavaScript NO mueve las imágenes: solo cambia clases de CSS.
En el CSS, los .carousel-item están todos apilados en el centro e
invisibles (opacity: 0). Solo tres clases los hacen visibles:
  - "active" → el disco del centro, grande.
  - "prev"   → el disco chico de la izquierda.
  - "next"   → el disco chico de la derecha.
Como los items tienen "transition" en el CSS, al cambiar de clase el
navegador anima solo el movimiento y el cambio de tamaño.

Entonces, cuando el usuario hace click en una flecha, lo único que
hacemos es: sacar esas tres clases de donde estaban y ponérselas a
los tres discos que corresponden ahora. */

/* querySelectorAll busca en la página TODOS los elementos que tengan
alguna de estas dos clases, y devuelve una lista. En este caso devuelve
los dos carruseles: el de vinilos y el de discos de Soda. */
const carousels = document.querySelectorAll('.vinilo-carousel, .disco-carousel');

/* Recorremos la lista para preparar cada carrusel por separado.
Así el mismo código sirve para los dos sin repetirlo. */
for (let c = 0; c < carousels.length; c++) {
  const carousel = carousels[c];

  /* Buscamos DENTRO de este carrusel sus imágenes y sus dos flechas. */
  const slides = carousel.querySelectorAll('.carousel-item');
  const buttons = carousel.querySelectorAll('.carousel-button');
  const total = slides.length;

  /* "current" guarda la posición (índice) del disco que está al centro.
  Los índices arrancan en 0: el primer item es 0, el segundo es 1, etc. */
  let current = 0;

  /* Buscamos qué item tiene la clase "active" en el HTML, para que el
  carrusel arranque desde el disco que elegimos como inicial. */
  for (let i = 0; i < total; i++) {
    if (slides[i].classList.contains('active')) {
      current = i;
    }
  }

  /* Esta función "mueve" el carrusel a la posición que le pasemos.
  Calcula quién queda a la izquierda (prev) y a la derecha (next),
  y reparte las clases. */
  function gotoNum(number) {
    current = number;
    let prev = current - 1;
    let next = current + 1;

    /* El carrusel es circular: si estamos en el último disco, el
    "siguiente" vuelve a ser el primero (índice 0)... */
    if (next >= total) {
      next = 0;
    }

    /* ...y si estamos en el primero, el "anterior" es el último. */
    if (prev < 0) {
      prev = total - 1;
    }

    /* Primero limpiamos: les sacamos las tres clases a TODOS los items.
    classList.remove no da error si el item no tenía esa clase. */
    for (let i = 0; i < total; i++) {
      slides[i].classList.remove('active');
      slides[i].classList.remove('prev');
      slides[i].classList.remove('next');
    }

    /* Y después se las ponemos solo a los tres que corresponden.
    El CSS se encarga del resto (posición, tamaño y animación). */
    slides[current].classList.add('active');
    slides[prev].classList.add('prev');
    slides[next].classList.add('next');
  }

  /* addEventListener('click', ...) ejecuta la función cada vez que se
  hace click en el elemento. buttons[0] es la flecha izquierda.
  event.preventDefault() evita que el <a href="#"> haga scroll arriba. */
  buttons[0].addEventListener('click', function (event) {
    event.preventDefault();

    /* Flecha izquierda: retrocedemos una posición. Si ya estábamos en
    la primera (0), saltamos a la última para dar la vuelta. */
    if (current > 0) {
      gotoNum(current - 1);
    } else {
      gotoNum(total - 1);
    }
  });

  /* buttons[1] es la flecha derecha: avanzamos una posición, y si
  estábamos en la última volvemos a la primera. */
  buttons[1].addEventListener('click', function (event) {
    event.preventDefault();

    if (current < total - 1) {
      gotoNum(current + 1);
    } else {
      gotoNum(0);
    }
  });
}
