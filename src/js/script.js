"use strict";
const menuBtn = document.querySelector('.header__burgermenu')
const nav = document.querySelector('.nav')
const pictureBtn = document.querySelector('.picture')
window.addEventListener('click', (e) => {
  if (!e.target.closest('.nav') && !e.target.closest('.header__burgermenu')) {
    nav.classList.remove('show')
    pictureBtn.classList.remove('header__burgermenu--show')
    pictureBtn.classList.add('header__burgermenu--hide')
  }
})
menuBtn.addEventListener('click', (e) => {
  pictureBtn.classList.toggle('header__burgermenu--show');
  pictureBtn.classList.toggle('header__burgermenu--hide');
  nav.classList.toggle('show')
})
