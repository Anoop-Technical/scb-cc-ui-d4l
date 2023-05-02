var swiper = new Swiper(".mySwiper", {
  direction: 'vertical',
  loop: false,
  spaceBetween: 10,
  slidesPerView: 7,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  loop: true,
  // autoplay: true,
  spaceBetween: 10,
  slidesPerView: 1.07,
  thumbs: {
    swiper: swiper,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

