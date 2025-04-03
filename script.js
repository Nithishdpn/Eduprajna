// document.querySelectorAll('nav a').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();
//         const section = document.querySelector(this.getAttribute('href'));
//         section.scrollIntoView({ behavior: 'smooth' });
//     });
// });
// Common variables
const logoWidth = 150; // Width of logo
const gap = 20; // Gap between logos
const speed = 1; // Pixels per frame

// Left-moving slider
const leftSlider = document.getElementById('left-slider');
const leftLogos = Array.from(leftSlider.children);
const leftTotalWidth = (logoWidth + gap) * leftLogos.length - gap;
leftLogos.forEach(logo => leftSlider.appendChild(logo.cloneNode(true)));
let leftOffset = 0;

function animateLeft() {
    leftOffset -= speed;
    if (Math.abs(leftOffset) >= leftTotalWidth) {
        leftOffset += leftTotalWidth;
    }
    leftSlider.style.transform = `translateX(${leftOffset}px)`;
    requestAnimationFrame(animateLeft);
}

leftSlider.style.willChange = 'transform';
requestAnimationFrame(animateLeft);

// Right-moving slider
const rightSlider = document.getElementById('right-slider');
const rightLogos = Array.from(rightSlider.children);
const rightTotalWidth = (logoWidth + gap) * rightLogos.length - gap;
rightLogos.forEach(logo => rightSlider.appendChild(logo.cloneNode(true)));
let rightOffset = -rightTotalWidth;

function animateRight() {
    rightOffset += speed;
    if (rightOffset >= 0) {
        rightOffset -= rightTotalWidth;
    }
    rightSlider.style.transform = `translateX(${rightOffset}px)`;
    requestAnimationFrame(animateRight);
}

rightSlider.style.transform = `translateX(${rightOffset}px)`;
rightSlider.style.willChange = 'transform';
requestAnimationFrame(animateRight);


document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number.stat-number-text');
    const section = document.querySelector('.social-proof-container');
  
    // Function to reset counters to 0
    function resetCounters() {
      counters.forEach(counter => {
        const originalText = counter.dataset.original || counter.textContent; // Store original text if not set
        counter.dataset.original = originalText; // Save original text
        counter.textContent = '0' + (originalText.includes('%') ? '%' : '+'); // Reset to 0 with + or %
        counter.classList.remove('counting'); // Remove counting class
      });
      section.classList.remove('in-view'); // Remove in-view class to reset animation
    }
  
    // Function to animate the counter
    function animateCounter(counter) {
      const target = +counter.dataset.original.replace('+', '').replace('%', ''); // Get the target number
      let count = 0;
      const duration = 2000; // Animation duration in milliseconds
      const increment = target / (duration / 16); // Approximate frames (60fps)
  
      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.textContent = Math.floor(count) + (counter.dataset.original.includes('%') ? '%' : '+');
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target + (counter.dataset.original.includes('%') ? '%' : '+');
        }
      };
  
      updateCount();
      counter.classList.add('counting');
    }
  
    // Intersection Observer to trigger animation when in view
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            section.classList.add('in-view'); // Fade in the section
            counters.forEach(animateCounter); // Start counting for each number
          } else {
            resetCounters(); // Reset counters when out of view
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );
  
    // Initialize original values in dataset
    counters.forEach(counter => {
      counter.dataset.original = counter.textContent;
    });
  
    // Reset counters initially
    resetCounters();
  
    observer.observe(section); // Observe the section
  });