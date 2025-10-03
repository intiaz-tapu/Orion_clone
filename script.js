// Products Slideshow functionality
document.addEventListener('DOMContentLoaded', function () {
      const showcase = document.getElementById('productsShowcase');
      const sliderThumb = document.getElementById('sliderThumb');
      const sliderTrack = document.querySelector('.slider-track');
      const panels = document.querySelectorAll('.product-panel');
      
      let currentSlide = 0;
      let slideTimer = null;
      const slideInterval = 5000; // 5 seconds (matching Orion's timing)
      const panelsPerSlide = 2; // Show 2 panels at a time
      
      // Calculate total number of slides - always show 2 panels per slide
      const totalSlides = Math.ceil(panels.length / panelsPerSlide);
      
      // Create a cycling array to ensure we always have 2 panels per slide
      function getPanelsForSlide(slideIndex) {
        const startIndex = slideIndex * panelsPerSlide;
        const slidePanels = [];
        
        for (let i = 0; i < panelsPerSlide; i++) {
          const panelIndex = (startIndex + i) % panels.length;
          slidePanels.push(panelIndex);
        }
        
        return slidePanels;
      }
      
      function updateSlide() {
        // Hide all panels first
        panels.forEach(panel => {
          panel.style.display = 'none';
        });
        
        // Show only the panels for current slide
        const currentSlidePanels = getPanelsForSlide(currentSlide);
        currentSlidePanels.forEach(panelIndex => {
          panels[panelIndex].style.display = 'block';
        });
        
        console.log(`Slide ${currentSlide + 1} of ${totalSlides}, showing panels:`, currentSlidePanels.map(i => i + 1));
        
        // Update slider thumb position
        const thumbPosition = (currentSlide / (totalSlides - 1)) * 150; // 150px is the max movement (200px track - 50px thumb)
        sliderThumb.style.left = `${thumbPosition}px`;
      }
      
      function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
      }
      
      function startAutoplay() {
        stopAutoplay();
        slideTimer = setInterval(nextSlide, slideInterval);
      }
      
      function stopAutoplay() {
        if (slideTimer) {
          clearInterval(slideTimer);
          slideTimer = null;
        }
      }
      
      
      // Add click functionality to product panels
      panels.forEach((panel, index) => {
        panel.addEventListener('click', () => {
          const caption = panel.querySelector('.product-caption').textContent;
          showNotification(`Loading ${caption} section...`);
        });
        
        // Pause autoplay on hover
        panel.addEventListener('mouseenter', stopAutoplay);
        panel.addEventListener('mouseleave', startAutoplay);
      });

      // Slider functionality
      let isDragging = false;
      let startX = 0;
      let startLeft = 0;

      function getSlideFromPosition(x) {
        const trackRect = sliderTrack.getBoundingClientRect();
        const relativeX = x - trackRect.left;
        const percentage = relativeX / trackRect.width;
        return Math.round(percentage * (totalSlides - 1));
      }

      function updateSlideFromSlider(newSlide) {
        if (newSlide >= 0 && newSlide < totalSlides) {
          currentSlide = newSlide;
          updateSlide();
          startAutoplay(); // Restart autoplay after manual navigation
        }
      }

      // Mouse events
      sliderTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        stopAutoplay();
        sliderTrack.style.cursor = 'grabbing';
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
      });

      document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        sliderTrack.style.cursor = 'pointer';
        
        const newSlide = getSlideFromPosition(e.clientX);
        updateSlideFromSlider(newSlide);
      });

      // Touch events for mobile
      sliderTrack.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        stopAutoplay();
      });

      document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
      });

      document.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const newSlide = getSlideFromPosition(e.changedTouches[0].clientX);
        updateSlideFromSlider(newSlide);
      });

      // Click on track to jump to position
      sliderTrack.addEventListener('click', (e) => {
        if (isDragging) return; // Don't trigger click if we just dragged
        const newSlide = getSlideFromPosition(e.clientX);
        updateSlideFromSlider(newSlide);
      });
      
      // Initialize
      updateSlide();
      startAutoplay();
    });

// Hamburger Menu Toggle Function
function toggleMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.getElementById('navMenu');
  
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

// Close menu when clicking on a link (for mobile)
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.getElementById('navMenu');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // Add click functionality to all buttons
  addClickFunctionality();
});

// Function to add click functionality to all interactive elements
function addClickFunctionality() {
  // Navigation links
  const navLinks = document.querySelectorAll('ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const linkText = link.textContent.trim();
      showNotification(`Navigating to: ${linkText}`);
    });
  });

  // History and Future Thinking buttons
  const historyBtn = document.querySelector('.item2');
  const futureBtn = document.querySelector('.item3');
  
  if (historyBtn) {
    historyBtn.addEventListener('click', () => {
      showNotification('Loading History section...');
    });
  }
  
  if (futureBtn) {
    futureBtn.addEventListener('click', () => {
      showNotification('Loading Future Thinking section...');
    });
  }

  // Profile button
  const profileBtn = document.querySelector('.box2');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      showNotification('Loading Profile section...');
    });
  }

  // Read More and Overview buttons
  const readMoreBtn = document.querySelector('.tem2');
  const overviewBtn = document.querySelector('.tem3');
  
  if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
      showNotification('Loading more content...');
    });
  }
  
  if (overviewBtn) {
    overviewBtn.addEventListener('click', () => {
      showNotification('Loading Overview section...');
    });
  }

  // Member company links
  const memberLinks = document.querySelectorAll('.member-item a');
  memberLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const companyName = link.textContent.trim();
      showNotification(`Loading ${companyName} details...`);
    });
  });
}

// Function to show notification (you can replace this with actual navigation)
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    z-index: 10000;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    animation: slideIn 0.3s ease;
  `;
  
  // Add animation keyframes
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}
