document.addEventListener('DOMContentLoaded', () => {
  const images = [
    'Interactables/Interactable_bg1.png',
    'Interactables/Interactable_bg2.png',
    'Interactables/Interactable_bg3.png',
    'Interactables/Interactable_bg4.png'
  ];

  const slide1 = document.querySelector('.bg-slide-1');
  const slide2 = document.querySelector('.bg-slide-2');

  if (!slide1 || !slide2) {
    console.error('Background slide elements not found');
    return;
  }

  let currentIndex = 0;
  let currentSlide = slide1;
  let nextSlide = slide2;   

  // Set initial states
  currentSlide.style.backgroundImage = `url('${images[currentIndex]}')`;
  currentSlide.classList.add('visible');

  function changeBackground() {
    // Get next image index
    currentIndex = (currentIndex + 1) % images.length;

    // Set the background image for the hidden slide
    nextSlide.style.backgroundImage = `url('${images[currentIndex]}')`;

    // Crossfade: show next, hide current
    nextSlide.classList.add('visible');
    currentSlide.classList.remove('visible');

    // Swap slides
    const temp = currentSlide;
    currentSlide = nextSlide;
    nextSlide = temp;
  }

  setInterval(changeBackground, 5000);
});
