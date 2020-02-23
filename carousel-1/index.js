const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const prevSlideButton = document.querySelector(".carousel__button--left");
const nextSlideButton = document.querySelector(".carousel__button--right");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

// Slide Index to be displayed at start
let activeSlideIndex = 0; // ATTENTION: just use setActiveIndexNumber() to change this value !!!!!

// function that must be used to set a new activeSlideIndex
const setActiveSlideIndex = num => {
  if (num > slides.length - 1) {
    activeSlideIndex = 0;
  } else if (num < 0) {
    activeSlideIndex = slides.length - 1;
  } else {
    activeSlideIndex = num;
  }
};

const moveToSlide = index => {
  track.style.transform = `translateX(-${slides[index].style.left})`;
};

const updateDots = activeSlideIndex => {
  // remove class 'current-slide' from previous dot
  dots
    .find(dot => dot.classList.contains("current-slide"))
    .classList.remove("current-slide");
  // add class 'current-slide' to active dot
  dots[activeSlideIndex].classList.add("current-slide");
};

const updateCarousel = newActiveIndex => {
  setActiveSlideIndex(newActiveIndex);
  moveToSlide(activeSlideIndex);
  updateDots(activeSlideIndex);
};

// arrange slides next to one another
slides.forEach((slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
});

// initialize view to active slide
track.style.transform = `translateX(-${slides[activeSlideIndex].style.left})`;

// interval
setInterval(() => {
  updateCarousel(activeSlideIndex + 1)
}, 5000)

// when click left button, move slides to the left
prevSlideButton.addEventListener("click", () => {
  updateCarousel(activeSlideIndex - 1);
});

// when click right button, move slides to the right
nextSlideButton.addEventListener("click", () => {
  updateCarousel(activeSlideIndex + 1);
});

// when I click nav indicator, move to that slide
dotsNav.addEventListener("click", e => {
  // what indicator was clicked?
  const clickedDot = e.target.closest("button");
  if (!clickedDot) return;
  const nextActiveSlideIndex = dots.findIndex(dot => dot === clickedDot);
  updateCarousel(nextActiveSlideIndex);
});
