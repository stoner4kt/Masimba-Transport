document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const expanded = navLinks.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');

      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', !expanded);
        icon.classList.toggle('fa-times', expanded);
      }
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') {
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement && navbar) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  if (sections.length > 0 && navItems.length > 0 && navbar) {
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const navHeight = navbar.offsetHeight;

        if (scrollY >= sectionTop - navHeight - 50) {
          current = section.getAttribute('id') || '';
        }
      });

      navItems.forEach((item) => {
        item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
      });
    });
  }

  const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries, observerRef) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observerRef.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });

    animatedElements.forEach((el) => observer.observe(el));

    setTimeout(() => {
      animatedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('appear');
        }
      });
    }, 100);
  }
});
