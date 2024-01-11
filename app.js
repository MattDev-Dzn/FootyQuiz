const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
const photosWrapper = document.querySelector('.photos-wrapper');

const scrollAmount = 4;
let currentIndex = 0;

leftButton.addEventListener('click', () => {
  currentIndex -= scrollAmount;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
  scrollPhotos();
});

rightButton.addEventListener('click', () => {
  currentIndex += scrollAmount;
  const maxIndex = photosWrapper.children.length - scrollAmount;
  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }
  scrollPhotos();
});

function scrollPhotos() {
  const scrollDistance = currentIndex * (photosWrapper.firstElementChild.offsetWidth + 18);
  photosWrapper.style.transform = `translateX(-${scrollDistance}px)`;
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
