document.addEventListener('DOMContentLoaded', function () {
      const slides = document.querySelectorAll('.slideshow-container .image');
      const dots = document.querySelectorAll('.dots .dot');

      // Debugging help (open console if you still see nothing)
      console.log('slides:', slides.length, 'dots:', dots.length);

      if (!slides.length) return; // nothing to do

      let slideIndex = 0;
      let timer = null;
      const INTERVAL = 2000;

      function showSlide(idx) {
        // normalize index (wrap-around)
        slideIndex = ((idx % slides.length) + slides.length) % slides.length;

        slides.forEach((s) => s.style.display = 'none');
        dots.forEach((d) => d.classList.remove('active'));

        slides[slideIndex].style.display = 'block';
        dots[slideIndex].classList.add('active');
      }

      function startAutoplay() {
        stopAutoplay();
        timer = setInterval(() => showSlide(slideIndex + 1), INTERVAL);
      }

      function stopAutoplay() {
        if (timer) { clearInterval(timer); timer = null; }
      }

      // wire up dots (manual navigation)
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          stopAutoplay();
          showSlide(i);
          // restart autoplay so it continues after manual click
          startAutoplay();
        });
      });

      // initialize
      showSlide(0);
      startAutoplay();
    });




    