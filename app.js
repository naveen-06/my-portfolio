'use strict'

// my-portfolio

const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const menubar = document.querySelector('.menu__bar');
const overlay = document.querySelector('.overlay');
const menuIcon = document.querySelector('.menu__icon');
const knowMoreBtn = document.querySelector('.know__more');
const aboutSection = document.querySelector('.about');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots__container');

let curSlide = 0;
let slideLength = slides.length - 1;

function stickyNavbar(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) navbar.classList.add('sticky--navbar');
  else navbar.classList.remove('sticky--navbar');
}

function toggleMenubar() {
  overlay.classList.toggle('overlay--hidden');
  menubar.classList.toggle('menu__bar--hidden');
}

function closeMenubar(e) {
  e.preventDefault();

  if (e.target.classList.contains('link')) {
    const id = (e.target.getAttribute('href'));
    const section = document.querySelector(id);
    section.scrollIntoView({behaviour: 'smooth'});
    toggleMenubar();
  }
}

function scrollToAboutSection() {
  aboutSection.scrollIntoView({ behavior: 'smooth' });
}

function goToSlide(curSlide) {
  slides.forEach((slide, i) => slide.style.transform = `translateX(${(i - curSlide) * 100}%)`);
}

function nextSlide() {
  if (curSlide < slideLength) curSlide++;
  else curSlide = 0;

  goToSlide(curSlide);
  addDots(curSlide);
}

function addDots(curSlide) {
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => 
  dotsContainer.insertAdjacentHTML('beforeend', `<div class="dot" data-id="${i}"></div>`));
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.remove('dot--active');
  });
  document.querySelector(`.dot[data-id="${curSlide}"]`).classList.add('dot--active');
}

const headerObserver = new IntersectionObserver(stickyNavbar, {
  root: null,
  threshold: 0,
  rootMargin: "-100px"
});
headerObserver.observe(header);

menuIcon.addEventListener('click', toggleMenubar);
overlay.addEventListener('click', toggleMenubar);
menubar.addEventListener('click', closeMenubar);
knowMoreBtn.addEventListener('click', scrollToAboutSection);

// slider
slides.forEach((slide, i) => slide.style.transform = `translateX(${i * 100}%)`);
dotsContainer.insertAdjacentHTML('beforeend', addDots);
addDots(curSlide);

// auto slide
setInterval(() => {
  nextSlide();
}, 5000);