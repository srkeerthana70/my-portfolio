/**
 * Main Application Logic
 * Navigation, Theme Toggle, Typing Animation, Contact Form Validation, Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Dynamic Year ---
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- Typewriter Effect ---
  const typingText = document.getElementById('typing-text');
  const roles = [
    '2nd Year ISE Student @ UVCE',
    'Information Science Engineer',
    'AI Tools & Python Developer',
    'Modern Front-End Enthusiast',
    'Creative Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // --- Theme Toggle System ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlElement = document.documentElement;

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('keerthana_portfolio_theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('keerthana_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark Aurora' : 'Light'} Mode`, 'info');
    });
  }

  // --- Header Scroll Effect & Back-to-Top ---
  const header = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (header) {
      if (scrollPos > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    highlightActiveNavLink();
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Navigation Active Link Highlight on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // --- Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('active');
      mobileToggle.classList.toggle('active', !isOpen);
      navMenu.classList.toggle('active', !isOpen);
      mobileToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Resume Modal ---
  const resumeModal = document.getElementById('resume-modal');
  const resumeModalBtn = document.getElementById('resume-modal-btn');
  const resumeCloseBtn = document.getElementById('resume-close-btn');
  const resumeDismissBtn = document.getElementById('resume-dismiss-btn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      resumeModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      resumeModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (resumeModalBtn) resumeModalBtn.addEventListener('click', openResumeModal);
  if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResumeModal);
  if (resumeDismissBtn) resumeDismissBtn.addEventListener('click', closeResumeModal);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  // --- Interactive Contact Form with Validation & Feedback ---
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const subjectError = document.getElementById('subject-error');
      const messageError = document.getElementById('message-error');

      // Validation
      if (!nameInput.value.trim()) {
        nameError.classList.add('active');
        isValid = false;
      } else {
        nameError.classList.remove('active');
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        emailError.classList.add('active');
        isValid = false;
      } else {
        emailError.classList.remove('active');
      }

      if (!subjectInput.value.trim()) {
        subjectError.classList.add('active');
        isValid = false;
      } else {
        subjectError.classList.remove('active');
      }

      if (!messageInput.value.trim()) {
        messageError.classList.add('active');
        isValid = false;
      } else {
        messageError.classList.remove('active');
      }

      if (isValid) {
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spin-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
          <span>Sending...</span>
        `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
          contactForm.reset();

          showToast('🎉 Thank you! Your message has been received. Keerthana will get back to you shortly.', 'success');
        }, 1200);
      }
    });
  }

  // --- Toast Notification Helper ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
    toast.innerHTML = `
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  }

  // --- Animated Counter Observer for Stat Cards ---
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          if (isNaN(target)) return;

          let count = 0;
          const duration = 1500;
          const stepTime = Math.max(20, Math.floor(duration / (target > 50 ? 50 : target)));
          const increment = target > 50 ? Math.ceil(target / 50) : 1;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              stat.textContent = target === 2 ? '2nd' : (target === 100 ? '100%' : (target === 4 ? '4+' : target));
              clearInterval(timer);
            } else {
              stat.textContent = target === 100 ? `${count}%` : (target === 2 ? `${count}nd` : `${count}+`);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsCol = document.querySelector('.stats-column');
  if (statsCol) {
    statsObserver.observe(statsCol);
  }
});
