/* =========================================
   PROFESSIONAL PORTFOLIO — script.js
   Alan Varghese | Full Stack Developer
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 0. Theme Toggle Logic ---- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Sync toggle icon on load based on active theme set by inline script
  const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  if (activeTheme === 'light') {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }

  themeToggleBtn.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });

  /* ---- 1. Initialize AOS (Animate On Scroll) ---- */
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
  });

  /* ---- 2. Typed.js for Hero Section ---- */
  if (document.getElementById('typed-name')) {
    new Typed('#typed-name', {
      strings: ["Hi, I'm <span class='highlight'>Alan Varghese</span>"],
      typeSpeed: 65,
      showCursor: true,
      cursorChar: '|',
      onComplete: (self) => {
        // Hide the main title cursor after typing is done
        document.querySelector('.typed-cursor').style.display = 'none';

        // Start the subtitle typing only after the main title finishes
        if (document.getElementById('typed-output')) {
          new Typed('#typed-output', {
            strings: [
              'Full Stack Developer',
              'AI & ML Enthusiast',
              'Python Developer',
              'React Developer'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: false
          });
        }
      }
    });
  }

  /* ---- 3. Navbar Scroll Effect & Active Links ---- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Sticky Navbar
    if (window.scrollY > 50) {
      navbar.classList.add('stuck');
    } else {
      navbar.classList.remove('stuck');
    }

    // Active Link Highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current) && current !== '') {
        link.classList.add('active');
      }
    });
  });

  // Close mobile nav on click
  const navCollapse = document.getElementById('navContent');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  /* ---- 4. Scroll Progress Bar ---- */
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }



  /* ---- 6. Button Ripple Effect ---- */
  const buttons = document.querySelectorAll('.ripple');
  buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const wave = document.createElement('span');
      wave.classList.add('ripple-wave');
      wave.style.left = `${x}px`;
      wave.style.top = `${y}px`;

      this.appendChild(wave);
      setTimeout(() => wave.remove(), 700);
    });
  });

  /* ---- 7. Number Counter Animation ---- */
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetVal = parseFloat(target.getAttribute('data-target'));
          const suffix = target.getAttribute('data-suffix') || '';
          const isDecimal = target.getAttribute('data-decimal') === 'true';
          const duration = 2000; // ms
          const frames = 60;
          const stepTime = duration / frames;
          const increment = targetVal / frames;

          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= targetVal) {
              current = targetVal;
              clearInterval(timer);
            }
            target.innerText = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
          }, stepTime);

          obs.unobserve(target); // Only animate once
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  /* ---- 8. Particle Canvas (Hero Background) ---- */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    });

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        ctx.fillStyle = isLight ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function initParticles() {
      particlesArray = [];
      const numberOfParticles = (canvas.height * canvas.width) / 15000;
      for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * 2) + 0.5;
        const x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        const y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        const directionX = (Math.random() * 0.4) - 0.2;
        const directionY = (Math.random() * 0.4) - 0.2;
        const color = 'rgba(255, 255, 255, 0.4)'; // Primary color with opacity
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function animateParticles() {
      requestAnimationFrame(animateParticles);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connectParticles();
    }

    function connectParticles() {
      let opacityValue = 1;
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const lineColorBase = isLight ? 'rgba(0, 0, 0, ' : 'rgba(255, 255, 255, ';
      const lineOpacityScale = isLight ? 0.15 : 0.2;

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
            ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          if (distance < (canvas.width / 10) * (canvas.height / 10)) {
            opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = lineColorBase + (opacityValue * lineOpacityScale) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    initParticles();
    animateParticles();
  }

  /* ---- 9. Interactive Contact Form Submission ---- */
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contact-status');

  if (contactForm && contactStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

      contactStatus.style.display = 'none';
      contactStatus.className = 'mt-3 text-center';

      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
      .then(async (response) => {
        let res = await response.json();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        contactStatus.style.display = 'block';

        if (response.status === 200) {
          contactStatus.className = 'mt-3 text-center alert alert-success border-0 shadow-sm';
          contactStatus.innerHTML = `
            <i class="fas fa-check-circle me-2"></i> 
            <strong>Thank you, ${document.getElementById('fname').value}!</strong> Your message has been sent successfully. I'll get back to you within 24 hours.
          `;
          contactForm.reset();
        } else {
          contactStatus.className = 'mt-3 text-center alert alert-danger border-0 shadow-sm';
          contactStatus.innerHTML = `
            <i class="fas fa-exclamation-circle me-2"></i> 
            <strong>Oops!</strong> ${res.message || 'Something went wrong. Please try again later.'}
          `;
        }

        setTimeout(() => {
          contactStatus.style.opacity = '0';
          contactStatus.style.transition = 'opacity 0.5s ease';
          setTimeout(() => {
            contactStatus.style.display = 'none';
            contactStatus.style.opacity = '1';
          }, 500);
        }, 7000);
      })
      .catch((error) => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        contactStatus.style.display = 'block';
        contactStatus.className = 'mt-3 text-center alert alert-danger border-0 shadow-sm';
        contactStatus.innerHTML = `
          <i class="fas fa-exclamation-circle me-2"></i> 
          <strong>Error!</strong> Could not connect to the mail server. Please check your internet connection.
        `;
      });
    });
  }

});
