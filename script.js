// ============================================
// MacSoft AI Assistant Website — Interactive Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Particle System ----
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrame;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.random() > 0.5 ? 190 : 270; // cyan or purple
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    animationFrame = requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ---- Mobile Nav Toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // ---- Scroll Reveal ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- CRUD Tabs Switcher ----
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.crud-tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate all buttons & contents
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.style.display = 'none');

      // Activate selected
      btn.classList.add('active');
      const activeTabId = btn.getAttribute('data-tab');
      document.getElementById(activeTabId).style.display = 'block';
    });
  });

  // ---- Screenshot to AutoCount Automation Simulation ----
  const stepUpload = document.getElementById('simStepUpload');
  const stepDetails = document.getElementById('simStepDetails');
  const stepSuccess = document.getElementById('simStepSuccess');
  const scanOverlay = document.getElementById('simScanOverlay');
  const btnRestart = document.getElementById('btnRestartSimulation');
  
  let simTimers = [];

  function runSimulation() {
    // Clear any active timers
    simTimers.forEach(t => clearTimeout(t));
    simTimers = [];

    // Reset display states
    stepUpload.style.display = 'block';
    stepDetails.style.display = 'none';
    stepSuccess.style.display = 'none';
    scanOverlay.style.display = 'block';

    // Timer for step 2 (Extraction)
    const t1 = setTimeout(() => {
      stepUpload.style.display = 'none';
      scanOverlay.style.display = 'none';
      stepDetails.style.display = 'block';
    }, 3000);
    simTimers.push(t1);

    // Timer for step 3 (AutoCount update Success)
    const t2 = setTimeout(() => {
      stepDetails.style.display = 'none';
      stepSuccess.style.display = 'block';
    }, 6000);
    simTimers.push(t2);
  }

  // Start the simulation cycle
  runSimulation();

  if (btnRestart) {
    btnRestart.addEventListener('click', runSimulation);
  }

  // ---- Form Submission handler ----
  const inquiryForm = document.getElementById('inquiryForm');
  const successMessage = document.getElementById('formSuccessMessage');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Collect input values
      const name = document.getElementById('inputName').value;
      const company = document.getElementById('inputCompany').value;
      const whatsapp = document.getElementById('inputWhatsApp').value;
      const email = document.getElementById('inputEmail').value;
      const message = document.getElementById('inputMessage').value;

      // Log values or transmit (no backend in static files)
      console.log('Inquiry submitted:', { name, company, whatsapp, email, message });

      // Animate form hide and show success message
      inquiryForm.style.transition = 'opacity 0.3s ease';
      inquiryForm.style.opacity = '0';
      setTimeout(() => {
        inquiryForm.style.display = 'none';
        successMessage.style.display = 'block';
      }, 3000);
    });
  }

  // ---- Tilt Effect on Cards (Desktop Only) ----
  const tiltCards = document.querySelectorAll('.crud-card, .step-card, .simulation-box');

  if (window.innerWidth > 768) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // ---- Parallax on Hero Image ----
  const heroVisual = document.querySelector('.hero-image-wrapper');
  if (heroVisual) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.08}px)`;
      }
    });
  }

  // ---- Cursor Glow Effect (Desktop Only) ----
  if (window.innerWidth > 768) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transition: transform 0.15s ease;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

});
