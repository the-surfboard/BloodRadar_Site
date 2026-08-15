/* ==========================================================================
   BloodRadar Web Logic & Interactive Engine
   100% Standard Native Web Standards • Zero Scroll Hijacking • Zero Dependencies
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initBloodCalculator();
  initSmoothScroll();
  initActiveNavSpy();
});

/* ==========================================================================
   Navbar Scroll & Glassmorphism Transition
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   Mobile Navigation Drawer Toggle
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function toggleMenu(open) {
    const shouldOpen = typeof open === 'boolean' ? open : !drawer.classList.contains('open');
    if (shouldOpen) {
      toggleBtn.classList.add('active');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      toggleBtn.classList.remove('active');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   Blood Compatibility Matrix & Calculator
   ========================================================================== */
const COMPATIBILITY_DATA = {
  'A+': {
    canDonateTo: ['A+', 'AB+'],
    canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
    note: 'As an A+ donor, you can help anyone with A+ and AB+ blood. You can receive blood from A+, A-, O+, and O-.'
  },
  'A-': {
    canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
    canReceiveFrom: ['A-', 'O-'],
    note: 'As an A- donor, you can give blood to all A and AB blood types. You can safely receive blood from A- and O-.'
  },
  'B+': {
    canDonateTo: ['B+', 'AB+'],
    canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
    note: 'As a B+ donor, you can give blood to B+ and AB+ recipients. You can receive blood from B+, B-, O+, and O-.'
  },
  'B-': {
    canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
    canReceiveFrom: ['B-', 'O-'],
    note: 'B- is a rare and precious blood type. You can give blood to all B and AB groups, and receive from B- and O-.'
  },
  'O+': {
    canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
    canReceiveFrom: ['O+', 'O-'],
    note: 'O+ is the most needed blood type in India. You can donate to all positive blood groups (O+, A+, B+, AB+).'
  },
  'O-': {
    canDonateTo: ['Everyone (Universal Red Cell Donor)'],
    canReceiveFrom: ['O-'],
    note: 'Universal Donor. Your red blood cells can save anyone in an emergency, especially when there is no time to test blood types.'
  },
  'AB+': {
    canDonateTo: ['AB+'],
    canReceiveFrom: ['Everyone (Universal Recipient)'],
    note: 'Universal Recipient. In an emergency, you can safely receive red blood cells from any blood type.'
  },
  'AB-': {
    canDonateTo: ['AB+', 'AB-'],
    canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
    note: 'AB- is one of the rarest blood groups. You can donate red blood cells to AB- and AB+ recipients. You can only receive from AB-, A-, B-, and O-.'
  },
  'Bombay (hh)': {
    canDonateTo: ['All ABO Blood Groups'],
    canReceiveFrom: ['Bombay (hh) Only'],
    note: 'Extremely rare blood type (1 in 10,000). You can donate to any ABO type, but can only safely receive blood from another Bombay (hh) donor.'
  },
  'Rh-null': {
    canDonateTo: ['All Rh Incompatible Patients'],
    canReceiveFrom: ['Rh-null Only'],
    note: 'The world\'s rarest blood ("Golden Blood"). Lacks all Rh antigens and can save patients with rare antibody incompatibilities.'
  }
};

function initBloodCalculator() {
  const chips = document.querySelectorAll('.chip-btn');
  const donateList = document.getElementById('matrix-donate-list');
  const receiveList = document.getElementById('matrix-receive-list');
  const noteBox = document.getElementById('calc-note-text');
  const currentSelectedLabel = document.getElementById('calc-selected-group');

  if (!chips.length || !donateList || !receiveList) return;

  const donateCountBadge = document.getElementById('donate-count-badge');
  const receiveCountBadge = document.getElementById('receive-count-badge');

  function renderCompatibility(bg) {
    const data = COMPATIBILITY_DATA[bg];
    if (!data) return;

    if (currentSelectedLabel) {
      currentSelectedLabel.textContent = bg;
    }

    // Render Donate To Count & Chips
    if (donateCountBadge) {
      const count = data.canDonateTo.length;
      donateCountBadge.textContent = `${count} ${count === 1 ? 'Group' : 'Groups'}`;
    }

    donateList.innerHTML = data.canDonateTo.map(item => {
      const isSpecial = item.includes('Universal') || item.includes('All');
      return `<span class="matrix-pill ${isSpecial ? 'highlight-emerald' : 'highlight-red'}">${item}</span>`;
    }).join('');

    // Render Receive From Count & Chips
    if (receiveCountBadge) {
      const count = data.canReceiveFrom.length;
      receiveCountBadge.textContent = `${count} ${count === 1 ? 'Group' : 'Groups'}`;
    }

    receiveList.innerHTML = data.canReceiveFrom.map(item => {
      const isSpecial = item.includes('Universal') || item.includes('Everyone');
      return `<span class="matrix-pill ${isSpecial ? 'highlight-emerald' : ''}">${item}</span>`;
    }).join('');

    // Render Note
    if (noteBox) {
      noteBox.textContent = data.note;
    }
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const bg = chip.getAttribute('data-bg');
      renderCompatibility(bg);
    });
  });

  // Initial render
  renderCompatibility('A+');
}

/* ==========================================================================
   Standard Native Anchor Scrolling with Fixed Header Compensation
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = 76;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}



/* ==========================================================================
   Active Navigation Link Highlighting via IntersectionObserver
   ========================================================================== */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else if (link.getAttribute('href').startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}
