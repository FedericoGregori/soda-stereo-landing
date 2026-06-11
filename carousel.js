const carousels = document.querySelectorAll('.vinilo-carousel, .disco-carousel');

for (let c = 0; c < carousels.length; c++) {
  const carousel = carousels[c];

  
  const slides = carousel.querySelectorAll('.carousel-item');
  const buttons = carousel.querySelectorAll('.carousel-button');
  const total = slides.length;

  
  let current = 0;

  
  for (let i = 0; i < total; i++) {
    if (slides[i].classList.contains('active')) {
      current = i;
    }
  }

  
  function gotoNum(number) {
    current = number;
    let prev = current - 1;
    let next = current + 1;

    
    if (next >= total) {
      next = 0;
    }

    
    if (prev < 0) {
      prev = total - 1;
    }

    
    for (let i = 0; i < total; i++) {
      slides[i].classList.remove('active');
      slides[i].classList.remove('prev');
      slides[i].classList.remove('next');
    }

    
    slides[current].classList.add('active');
    slides[prev].classList.add('prev');
    slides[next].classList.add('next');
  }

  
  buttons[0].addEventListener('click', function (event) {
    event.preventDefault();

    
    if (current > 0) {
      gotoNum(current - 1);
    } else {
      gotoNum(total - 1);
    }
  });

  
  buttons[1].addEventListener('click', function (event) {
    event.preventDefault();

    if (current < total - 1) {
      gotoNum(current + 1);
    } else {
      gotoNum(0);
    }
  });
}
