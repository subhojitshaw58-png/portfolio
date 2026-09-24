/**
 * Subhojit Shaw — Ultra-Futuristic Executive Developer Portfolio
 * Fully Animated Engine:
 * - Dynamic Cyber Particle Network (Connecting Node Mesh on Canvas)
 * - Numerical Telemetry Counter Easing (Count-up on scroll)
 * - Interactive 3D Perspective Card Tilt with Specular Spotlight
 * - Text Decryption / Scramble Reveal on Section Headers
 * - Cyber Command Terminal (Ctrl + K) with Interactive Shell
 * - 1-Click Clipboard Utilities for subhojitshaw58@gmail.com
 */

document.addEventListener('DOMContentLoaded', () => {
  // Prevent double initialization if both script.js and js/script.js load
  if (window.__SUBHOJIT_PORTFOLIO_INIT__) return;
  window.__SUBHOJIT_PORTFOLIO_INIT__ = true;

  const SUBHOJIT_EMAIL = 'subhojitshaw58@gmail.com';

  // --------------------------------------------------------------------------
  // 1. DOM Elements
  // --------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast-notification');
  const contactForm = document.getElementById('portfolio-contact-form');
  const backToTopBtn = document.querySelector('.back-to-top');
  const terminalLauncherBtn = document.getElementById('terminal-launcher-btn');
  const terminalModal = document.getElementById('cyber-terminal-modal');
  const terminalCloseBtn = document.getElementById('cmd-close-btn');
  const terminalInput = document.getElementById('cmd-input-field');
  const terminalOutput = document.getElementById('cmd-log-output');
  const cmdQuickBtns = document.querySelectorAll('.cmd-quick-btn');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --------------------------------------------------------------------------
  // 2. Interactive Cyber Particle Canvas (Connecting Neural / Security Mesh)
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('cyber-canvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: null, y: null, radius: 140 };

    // Adaptive particle budget: lower on mobile screens to preserve battery & high FPS
    const getParticleBudget = () => {
      const isMobile = window.innerWidth < 768;
      return isMobile
        ? Math.min(Math.floor((width * height) / 22000), 28)
        : Math.min(Math.floor((width * height) / 16000), 65);
    };

    let particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.75;
        this.vy = (Math.random() - 0.5) * 0.75;
        this.radius = Math.random() * 1.7 + 1.1;
        this.color = Math.random() > 0.3 ? '#38bdf8' : '#818cf8';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 2.2;
            this.y -= (dy / dist) * force * 2.2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initParticles = () => {
      particles = [];
      const count = getParticleBudget();
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    const connect = () => {
      const isMobile = window.innerWidth < 768;
      const maxDist = isMobile ? 95 : 125;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (document.hidden) {
        requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connect();
      requestAnimationFrame(animate);
    };

    animate();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
      }, 150);
    });

    // Mouse Tracking (Laptop & PC)
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Mobile & Tablet Touch Tracking
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  // --------------------------------------------------------------------------
  // 3. Numerical Telemetry Counter Animation (Count-up Easing)
  // --------------------------------------------------------------------------
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const duration = 1600;
          const startTime = performance.now();

          const updateNumber = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = target * easeOut;
            el.textContent = current.toFixed(decimals) + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              el.textContent = target.toFixed(decimals) + suffix;
            }
          };

          requestAnimationFrame(updateNumber);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach((c) => counterObserver.observe(c));
  }

  // --------------------------------------------------------------------------
  // 4. Text Scrambling / Decryption Micro-Animation
  // --------------------------------------------------------------------------
  const chars = '01#%@&<>/_[]*!';
  const scrambleEls = document.querySelectorAll('[data-scramble]');
  scrambleEls.forEach((el) => {
    const originalText = el.textContent.trim();
    let isScrambling = false;

    const doScramble = () => {
      if (isScrambling) return;
      isScrambling = true;
      let iteration = 0;
      const interval = setInterval(() => {
        el.textContent = originalText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= originalText.length) {
          clearInterval(interval);
          el.textContent = originalText;
          isScrambling = false;
        }
        iteration += 1 / 2;
      }, 35);
    };

    el.addEventListener('mouseenter', doScramble);
  });

  // --------------------------------------------------------------------------
  // 5. 3D Perspective Card Tilt & Specular Spotlight (Laptop & PC with Mouse)
  // --------------------------------------------------------------------------
  const cyberCards = document.querySelectorAll('.cyber-card');
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!prefersReducedMotion && hasFinePointer && cyberCards.length > 0) {
    cyberCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(950px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Header Scroll Shadow & Sticky Styling
  // --------------------------------------------------------------------------
  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // --------------------------------------------------------------------------
  // 7. Mobile Navigation Drawer Toggle & Accessibility
  // --------------------------------------------------------------------------
  if (mobileToggle && navMenu) {
    const toggleMenu = (closeOnly) => {
      const isCurrentlyOpen = navMenu.classList.contains('open');
      if (closeOnly === true || isCurrentlyOpen) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Open navigation menu');
        document.body.style.overflow = '';
      } else {
        navMenu.classList.add('open');
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileToggle.setAttribute('aria-label', 'Close navigation menu');
        document.body.style.overflow = 'hidden';
      }
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Auto-close drawer on mobile when clicking any link or action button inside
    const navClickables = navMenu.querySelectorAll('a, button');
    navClickables.forEach((item) => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          toggleMenu(true);
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        toggleMenu(true);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(true);
        mobileToggle.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. ScrollSpy: Highlight Active Nav Link on Scroll
  // --------------------------------------------------------------------------
  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // --------------------------------------------------------------------------
  // 9. Scroll Reveal Animations
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.fade-in-up');
  if (!prefersReducedMotion && 'IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // --------------------------------------------------------------------------
  // 10. Toast Notification Helper
  // --------------------------------------------------------------------------
  let toastTimer = null;
  const showToast = (message) => {
    if (!toast) return;
    const toastMsgEl = toast.querySelector('.toast-msg');
    if (toastMsgEl) toastMsgEl.textContent = message;

    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // --------------------------------------------------------------------------
  // 11. 1-Click Copy Email to Clipboard (subhojitshaw58@gmail.com)
  // --------------------------------------------------------------------------
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = SUBHOJIT_EMAIL;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        showToast(`Copied ${email} to clipboard!`);
      } catch (err) {
        showToast(`Email: ${email}`);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12. Contact Form Handling
  // --------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#sender-name')?.value.trim();
      const email = contactForm.querySelector('#sender-email')?.value.trim();
      const subject = contactForm.querySelector('#message-subject')?.value.trim();
      const message = contactForm.querySelector('#message-body')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      const mailtoUrl = `mailto:${SUBHOJIT_EMAIL}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

      showToast('Launching email client with your message...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 400);

      contactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 13. Back to Top
  // --------------------------------------------------------------------------
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 14. Interactive Cyber Command Terminal (Ctrl + K / Quick Launch)
  // --------------------------------------------------------------------------
  const openTerminal = () => {
    if (!terminalModal) return;
    terminalModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (terminalInput) {
      setTimeout(() => terminalInput.focus(), 80);
    }
  };

  const closeTerminal = () => {
    if (!terminalModal) return;
    terminalModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (terminalLauncherBtn) {
    terminalLauncherBtn.addEventListener('click', openTerminal);
  }

  if (terminalCloseBtn) {
    terminalCloseBtn.addEventListener('click', closeTerminal);
  }

  if (terminalModal) {
    terminalModal.addEventListener('click', (e) => {
      if (e.target === terminalModal) closeTerminal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (terminalModal && terminalModal.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openTerminal();
    } else if (e.key === 'Escape') {
      if (certModal && certModal.classList.contains('active')) {
        closeCertModal();
      } else if (terminalModal && terminalModal.classList.contains('active')) {
        closeTerminal();
      }
    }
  });

  const appendLog = (htmlContent) => {
    if (!terminalOutput) return;
    const line = document.createElement('div');
    line.innerHTML = htmlContent;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  };

  const executeCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();

    appendLog(`<span class="log-user">&gt; ${raw}</span>`);

    switch (cmd) {
      case 'help':
        appendLog(`
          <div class="log-sys">Available commands:</div>
          <div class="log-dim">  • <span style="color:#38bdf8;">projects</span>  : Show featured projects &amp; GitHub links</div>
          <div class="log-dim">  • <span style="color:#38bdf8;">certs</span>     : List verified certifications (Infosys, IIT KGP, IIT Bombay)</div>
          <div class="log-dim">  • <span style="color:#38bdf8;">skills</span>    : View technical domain stack</div>
          <div class="log-dim">  • <span style="color:#38bdf8;">about</span>     : Display academic bio &amp; 9.25 CGPA</div>
          <div class="log-dim">  • <span style="color:#38bdf8;">contact</span>   : Display email &amp; direct links</div>
          <div class="log-dim">  • <span style="color:#38bdf8;">clear</span>     : Clear terminal output</div>
        `);
        break;

      case 'certs':
      case 'certifications':
        appendLog(`
          <div class="log-sys">[VERIFIED CERTIFICATIONS &amp; LEADERSHIP]</div>
          <div style="margin: 4px 0;">
            1. <strong>IBM Learning:</strong> Artificial Intelligence Analyst (IBM Virtual Internship, CEAIAIIN)
            <br>&nbsp;&nbsp;<span style="color:#4589ff;">Course Code: CEAIAIIN (IBMCE)</span> &bull; <a href="https://ibmlearning.skillsnetwork.site" target="_blank" style="color:#38bdf8;text-decoration:underline;">ibmlearning.skillsnetwork.site</a>
          </div>
          <div style="margin: 4px 0;">
            2. <strong>Infosys Springboard:</strong> Next Gen Technologies (Sep 2025)
            <br>&nbsp;&nbsp;<a href="https://verify.onwingspan.com" target="_blank" style="color:#38bdf8;text-decoration:underline;">verify.onwingspan.com</a>
          </div>
          <div style="margin: 4px 0;">
            3. <strong>BuildX'26 Buildathon:</strong> IIT Kharagpur IIC &amp; Resourcio (6 Weeks)
            <br>&nbsp;&nbsp;<a href="https://verification.givemycertificate.com/v/59069db9-9b6c-43e1-a44a-f5490646c89b" target="_blank" style="color:#38bdf8;text-decoration:underline;">GiveMyCertificate Verification</a>
          </div>
          <div style="margin: 4px 0;">
            4. <strong>Techfest, IIT Bombay:</strong> College Ambassador Appreciation (Rank &lt; 9000)
          </div>
          <div class="log-dim" style="margin-top:6px;">Type <code>cert ibm</code>, <code>cert infosys</code>, <code>cert buildx</code>, or <code>cert techfest</code> to inspect.</div>
        `);
        break;

      case 'cert ibm':
        appendLog('<div class="log-sys">Launching IBM Artificial Intelligence Analyst Credential Viewer...</div>');
        closeTerminal();
        setTimeout(() => openCertModal('ibm'), 150);
        break;

      case 'cert infosys':
        appendLog('<div class="log-sys">Launching Infosys Springboard Credential Viewer...</div>');
        closeTerminal();
        setTimeout(() => openCertModal('infosys'), 150);
        break;

      case 'cert buildx':
        appendLog('<div class="log-sys">Launching BuildX\'26 IIT Kharagpur Credential Viewer...</div>');
        closeTerminal();
        setTimeout(() => openCertModal('buildx'), 150);
        break;

      case 'cert techfest':
        appendLog('<div class="log-sys">Launching Techfest IIT Bombay Credential Viewer...</div>');
        closeTerminal();
        setTimeout(() => openCertModal('techfest'), 150);
        break;

      case 'projects':
        appendLog(`
          <div class="log-sys">[FOUND 3 REPOSITORIES &amp; PROJECTS]</div>
          <div style="margin: 4px 0;">
            1. <strong>SIH 2026 Model:</strong> XGBoost Classification (94.55% Accuracy)
            <br>&nbsp;&nbsp;<a href="https://github.com/subhojitshaw58-png/SIH_2026_model" target="_blank" style="color:#38bdf8;text-decoration:underline;">github.com/subhojitshaw58-png/SIH_2026_model</a>
          </div>
          <div style="margin: 4px 0;">
            2. <strong>AI Scam &amp; Fake Email Analyzer:</strong> IBM Project (NLP Classification)
            <br>&nbsp;&nbsp;<a href="https://github.com/subhojitshaw58-png/Ibm_project" target="_blank" style="color:#38bdf8;text-decoration:underline;">github.com/subhojitshaw58-png/Ibm_project</a>
          </div>
          <div style="margin: 4px 0;">
            3. <strong>Smart Home Automation:</strong> ESP32 IoT &amp; Sensor Relay Prototype
          </div>
        `);
        break;

      case 'skills':
        appendLog(`
          <div class="log-sys">[TECHNICAL CAPABILITIES]</div>
          <div>• <strong>Programming:</strong> C, Java, Python, HTML, CSS, JavaScript</div>
          <div>• <strong>AI/ML:</strong> Machine Learning, XGBoost, NLP, Data Preprocessing</div>
          <div>• <strong>Cybersecurity:</strong> Network Defense, Computer Security, Ethical Hacking</div>
          <div>• <strong>Tools &amp; OS:</strong> Kali Linux, VS Code, Git, Jupyter Notebook</div>
        `);
        break;

      case 'about':
        appendLog(`
          <div class="log-sys">[PROFILE DATA]</div>
          <div>• Name: Subhojit Shaw</div>
          <div>• Enrolled: BCA @ Amity University Jharkhand (3rd Sem)</div>
          <div>• Academic Score: <strong>9.25 CGPA</strong></div>
          <div>• Focus: Cybersecurity &amp; AI/ML Systems</div>
        `);
        break;

      case 'contact':
      case 'email':
        appendLog(`
          <div class="log-sys">[DIRECT CHANNELS]</div>
          <div>• Email: <a href="mailto:${SUBHOJIT_EMAIL}" style="color:#38bdf8;">${SUBHOJIT_EMAIL}</a></div>
          <div>• GitHub: <a href="https://github.com/subhojitshaw58-png" target="_blank" style="color:#38bdf8;">github.com/subhojitshaw58-png</a></div>
          <div>• LinkedIn: <a href="https://www.linkedin.com/in/subhojit-shaw-76b2a730a/" target="_blank" style="color:#38bdf8;">linkedin.com/in/subhojit-shaw-76b2a730a</a></div>
        `);
        break;

      case 'clear':
      case 'cls':
        if (terminalOutput) terminalOutput.innerHTML = '';
        break;

      default:
        appendLog(`<div style="color:#f87171;">Command not found: '${raw}'. Type <span style="color:#38bdf8;">help</span> for commands.</div>`);
        break;
    }
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(terminalInput.value);
        terminalInput.value = '';
      }
    });
  }

  cmdQuickBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });

  // --------------------------------------------------------------------------
  // 15. Interactive Cyber Credential Viewer (Modal Engine)
  // --------------------------------------------------------------------------
  const CERT_DATA = {
    ibm: {
      title: "Artificial Intelligence Analyst",
      issuer: "IBM Learning • IBM Developer Skills Network • IBM India Pvt Ltd (CEAIAIIN)",
      pdfUrl: "IBM_AI_Certificate.pdf",
      imageUrl: null,
      verifyUrl: "https://ibmlearning.skillsnetwork.site",
      verifyLabel: "Verify on IBM Skills Network",
      hudStatus: "AUTHENTICATED CREDENTIAL // IBM LEARNING & IBMCE"
    },
    infosys: {
      title: "Next Gen Technologies",
      issuer: "Infosys Springboard • Course Completion • Issued Sep 4, 2025",
      pdfUrl: "infosys-springboard.pdf",
      imageUrl: null,
      verifyUrl: "https://verify.onwingspan.com",
      verifyLabel: "Verify on Wingspan Portal",
      hudStatus: "AUTHENTICATED CREDENTIAL // INFOSYS LIMITED"
    },
    buildx: {
      title: "BuildX'26 Product Buildathon",
      issuer: "Resourcio Community & IIC, IIT Kharagpur • 6-Week Buildathon • Aug 22, 2026",
      pdfUrl: "buildx26-iit-kharagpur.pdf",
      imageUrl: "buildx26-preview.jpg",
      verifyUrl: "https://verification.givemycertificate.com/v/59069db9-9b6c-43e1-a44a-f5490646c89b",
      verifyLabel: "Verify on GiveMyCertificate",
      hudStatus: "AUTHENTICATED CREDENTIAL // IIT KHARAGPUR IIC"
    },
    techfest: {
      title: "College Ambassador Recognition",
      issuer: "Techfest, IIT Bombay • All-India Rank Under 9000",
      pdfUrl: "techfest-iit-bombay.pdf",
      imageUrl: null,
      verifyUrl: null,
      verifyLabel: null,
      hudStatus: "AUTHENTICATED CREDENTIAL // TECHFEST IIT BOMBAY"
    }
  };

  const certModal = document.getElementById('cyber-cert-modal');
  const certCloseBtn = document.getElementById('cert-close-btn');
  const certCloseFooterBtn = document.getElementById('cert-close-footer-btn');
  const certFrame = document.getElementById('cert-viewer-frame');
  const certImgWrapper = document.getElementById('cert-img-wrapper');
  const certImg = document.getElementById('cert-viewer-img');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalIssuer = document.getElementById('cert-modal-issuer');
  const certHudStatus = document.getElementById('cert-modal-hud-status');
  const certDownloadLink = document.getElementById('cert-download-link');
  const certExternalLink = document.getElementById('cert-external-link');
  const certVerifyLink = document.getElementById('cert-verify-link');
  const certVerifyLabel = document.getElementById('cert-verify-label');
  const certStripVerifyContainer = document.getElementById('cert-strip-verify-container');
  const certSwitchBtns = document.querySelectorAll('.cert-switch-btn');
  const certMobileDirectLink = document.getElementById('cert-mobile-direct-link');

  let activeCertId = 'ibm';

  const loadCertificate = (key) => {
    const data = CERT_DATA[key];
    if (!data) return;
    activeCertId = key;

    // Update Header HUD status & Info
    if (certModalTitle) certModalTitle.textContent = data.title;
    if (certModalIssuer) certModalIssuer.textContent = data.issuer;
    if (certHudStatus) certHudStatus.textContent = data.hudStatus;

    // Update Action Links (Download, New Tab & Mobile Fallback)
    if (certDownloadLink) {
      certDownloadLink.href = data.pdfUrl;
      certDownloadLink.setAttribute('download', `${key}-certificate-subhojit-shaw.pdf`);
    }
    if (certExternalLink) {
      certExternalLink.href = data.pdfUrl;
    }
    if (certMobileDirectLink) {
      certMobileDirectLink.href = data.pdfUrl;
    }

    // Update Verification portal button
    if (data.verifyUrl) {
      if (certStripVerifyContainer) certStripVerifyContainer.style.display = 'block';
      if (certVerifyLink) certVerifyLink.href = data.verifyUrl;
      if (certVerifyLabel) certVerifyLabel.textContent = data.verifyLabel || 'Verify on Portal';
    } else {
      if (certStripVerifyContainer) certStripVerifyContainer.style.display = 'none';
    }

    // Toggle between PDF frame and high-res image
    if (data.imageUrl) {
      if (certFrame) {
        certFrame.style.display = 'none';
        certFrame.src = 'about:blank';
      }
      if (certImgWrapper) certImgWrapper.style.display = 'flex';
      if (certImg) {
        certImg.src = data.imageUrl;
        certImg.alt = `${data.title} - Subhojit Shaw`;
      }
    } else {
      if (certImgWrapper) certImgWrapper.style.display = 'none';
      if (certFrame) {
        certFrame.style.display = 'block';
        certFrame.src = data.pdfUrl + '#toolbar=0';
      }
    }

    // Update active tab in switcher
    certSwitchBtns.forEach((btn) => {
      if (btn.getAttribute('data-cert') === key) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  const openCertModal = (key = 'ibm') => {
    if (!certModal) return;
    loadCertificate(key);
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCertModal = () => {
    if (!certModal) return;
    certModal.classList.remove('active');
    document.body.style.overflow = '';
    // Reset iframe after closing to stop any background media
    setTimeout(() => {
      if (certFrame && certModal && !certModal.classList.contains('active')) {
        certFrame.src = 'about:blank';
      }
    }, 250);
  };

  // Close handlers
  if (certCloseBtn) certCloseBtn.addEventListener('click', closeCertModal);
  if (certCloseFooterBtn) certCloseFooterBtn.addEventListener('click', closeCertModal);
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }

  // Switcher bar tabs
  certSwitchBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const certKey = btn.getAttribute('data-cert');
      if (certKey) loadCertificate(certKey);
    });
  });

  // Certificate cards & preview triggers
  document.querySelectorAll('.open-cert-modal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const certKey = btn.getAttribute('data-cert') || 'ibm';
      openCertModal(certKey);
    });
  });

  document.querySelectorAll('.cert-preview-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const certKey = trigger.getAttribute('data-cert') || 'ibm';
      openCertModal(certKey);
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const certKey = trigger.getAttribute('data-cert') || 'ibm';
        openCertModal(certKey);
      }
    });
  });

  // Also make clicking the certificate card itself open the modal if clicking outside secondary links
  document.querySelectorAll('.cert-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      const certKey = card.getAttribute('data-cert-card') || 'ibm';
      openCertModal(certKey);
    });
  });

  // Custom event listener for terminal integration
  document.addEventListener('open-cert', (e) => {
    if (e.detail) {
      if (terminalModal && terminalModal.classList.contains('active')) {
        closeTerminal();
      }
      setTimeout(() => openCertModal(e.detail), 150);
    }
  });
});
