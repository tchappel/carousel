class Carousel {
  constructor(carouselId, initialActiveSlideIndex, intervalTime) {
    this.carousel = document.querySelector(`.carousel#${carouselId}`);
    this.track = this.carousel.querySelector(".carousel__track");
    this.slides = Array.from(this.track.children);
    this.prevSlideButton = this.carousel.querySelector(
      ".carousel__button--left"
    );
    this.nextSlideButton = this.carousel.querySelector(
      ".carousel__button--right"
    );
    this.dotsNav = this.carousel.querySelector(".carousel__nav");
    this.dots = Array.from(this.dotsNav.children);
    this.slideWidth = this.carousel.getBoundingClientRect().width;
    // Slide Index to be displayed at start
    this.activeSlideIndex = initialActiveSlideIndex; // ATTENTION: just use setActiveSlideIndex() to change this value !!!!!
    this.intervalTime = intervalTime;
    this.interval = null;
    this.init();
  }

  // method that must be used to set a new activeSlideIndex
  setActiveSlideIndex = num => {
    if (num > this.slides.length - 1) {
      this.activeSlideIndex = 0;
    } else if (num < 0) {
      this.activeSlideIndex = this.slides.length - 1;
    } else {
      this.activeSlideIndex = num;
    }
  };

  moveToSlide = index => {
    this.track.style.transform = `translateX(-${this.slides[index].style.left})`;
  };

  updateDots = activeSlideIndex => {
    // remove class 'current-slide' from previous dot
    const prevActiveDot = this.dots.find(dot =>
      dot.classList.contains("active")
    );
    if (prevActiveDot) {
      prevActiveDot.classList.remove("active");
    }
    // add class 'current-slide' to active dot
    this.dots[activeSlideIndex].classList.add("active");
  };

  updateCarousel = newActiveIndex => {
    this.setActiveSlideIndex(newActiveIndex);
    this.moveToSlide(this.activeSlideIndex);
    this.updateDots(this.activeSlideIndex);
    this.resetCarouselInterval();
  };

  // methods to manage carousel interval
  setCarouselInterval = () => {
    this.interval = setInterval(() => {
      this.updateCarousel(this.activeSlideIndex + 1);
    }, this.intervalTime);
  };

  resetCarouselInterval = () => {
    clearInterval(this.interval);
    this.setCarouselInterval();
  };

  init = () => {
    // arrange slides next to one another
    this.slides.forEach((slide, index) => {
      slide.style.left = `${this.slideWidth * index}px`;
    });
    // initialize view to active slide
    this.track.style.transform = `translateX(-${
      this.slides[this.activeSlideIndex].style.left
    })`;
    this.updateDots(this.activeSlideIndex);
    // set interval
    this.setCarouselInterval();
    // when click left button, move slides to the left and reset interval
    this.prevSlideButton.addEventListener("click", () => {
      this.updateCarousel(this.activeSlideIndex - 1);
    });
    // when click right button, move slides to the right and reset interval
    this.nextSlideButton.addEventListener("click", () => {
      this.updateCarousel(this.activeSlideIndex + 1);
    });
    // when I click nav indicator, move to that slide
    this.dotsNav.addEventListener("click", e => {
      // what indicator was clicked?
      const clickedDot = e.target.closest("button");
      if (!clickedDot) return;
      const nextActiveSlideIndex = this.dots.findIndex(
        dot => dot === clickedDot
      );
      this.updateCarousel(nextActiveSlideIndex);
    });
    // manage screen resize...
    window.addEventListener('resize', () => {
      if (!this.track) return
      // reset slideWidth
      this.slideWidth = this.carousel.getBoundingClientRect().width;
      // rearrange slides next to one another
      this.slides.forEach((slide, index) => {
        slide.style.left = `${this.slideWidth * index}px`;
      });
    });
  };
}

const carousel1 = new Carousel("carousel-1", 0, 5000);
const carousel2 = new Carousel("carousel-2", 0, 5000);
