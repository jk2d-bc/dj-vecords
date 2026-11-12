document.addEventListener('DOMContentLoaded', () => {
  // 1. Año automático en el footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Efecto glass en el navbar al hacer scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Menú móvil adaptable
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Animación de entrada por sección al hacer scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll('.section-reveal').forEach(section => {
    observer.observe(section);
  });

  // 5. Efecto de inclinación 3D sutil en el logo al mover el mouse (PC/Laptop)
  const logoStage = document.getElementById('logoStage');
  const supportsHover = window.matchMedia('(hover: hover)').matches;

  if (logoStage && supportsHover) {
    logoStage.addEventListener('mousemove', (e) => {
      const rect = logoStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      logoStage.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
    });

    logoStage.addEventListener('mouseleave', () => {
      logoStage.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
    });
  }

  // 6. Garantizar reproducción del video de fondo en navegadores móviles
  const bgVideo = document.getElementById('bgVideo');
  if (bgVideo) {
    bgVideo.muted = true;
    bgVideo.play().catch(() => {
      // Si el modo ahorro de energía bloquea autoplay, arranca al primer toque
      document.addEventListener('touchstart', () => bgVideo.play(), { once: true });
    });
  }
});