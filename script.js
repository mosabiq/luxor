/**
 * LUXOR - Monochrome Travel Booking Widget & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. Top Navbar Link Switching & Smooth Scroll
  // ----------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
          const y = targetEl.getBoundingClientRect().top + window.pageYOffset - 24;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }
    });
  });

  // ----------------------------------------------------
  // 2. Booking Mode Selector ( [ Room ] [ Vehicle ] )
  // ----------------------------------------------------
  const tabRoom = document.getElementById('tabRoom');
  const tabVehicle = document.getElementById('tabVehicle');
  const roomPanel = document.getElementById('roomModePanel');
  const vehiclePanel = document.getElementById('vehicleModePanel');

  function setBookingMode(mode) {
    if (mode === 'room') {
      tabRoom.classList.add('active');
      tabRoom.setAttribute('aria-selected', 'true');
      tabVehicle.classList.remove('active');
      tabVehicle.setAttribute('aria-selected', 'false');

      roomPanel.classList.add('active');
      vehiclePanel.classList.remove('active');
    } else {
      tabVehicle.classList.add('active');
      tabVehicle.setAttribute('aria-selected', 'true');
      tabRoom.classList.remove('active');
      tabRoom.setAttribute('aria-selected', 'false');

      vehiclePanel.classList.add('active');
      roomPanel.classList.remove('active');
    }
  }

  if (tabRoom && tabVehicle) {
    tabRoom.addEventListener('click', () => setBookingMode('room'));
    tabVehicle.addEventListener('click', () => setBookingMode('vehicle'));
  }

  // ----------------------------------------------------
  // 3. Location Autocomplete Suggestions
  // ----------------------------------------------------
  const pickupInput = document.getElementById('pickupLoc');
  const pickupSuggestions = document.getElementById('pickupSuggestions');
  const dropoffInput = document.getElementById('dropoffLoc');
  const dropoffSuggestions = document.getElementById('dropoffSuggestions');

  function setupAutocomplete(input, box) {
    if (!input || !box) return;

    input.addEventListener('focus', () => {
      box.classList.add('open');
    });

    box.querySelectorAll('.suggestion-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        input.value = item.textContent.replace('📍 ', '').trim();
        box.classList.remove('open');
      });
    });
  }

  setupAutocomplete(pickupInput, pickupSuggestions);
  setupAutocomplete(dropoffInput, dropoffSuggestions);

  // Close suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (pickupSuggestions && !pickupInput.contains(e.target) && !pickupSuggestions.contains(e.target)) {
      pickupSuggestions.classList.remove('open');
    }
    if (dropoffSuggestions && !dropoffInput.contains(e.target) && !dropoffSuggestions.contains(e.target)) {
      dropoffSuggestions.classList.remove('open');
    }
  });

  // ----------------------------------------------------
  // 4. Date Pickers & Min-Date Validation
  // ----------------------------------------------------
  const pickupDateInput = document.getElementById('pickupDate');
  const pickupDateText = document.getElementById('pickupDateText');
  const dropoffDateInput = document.getElementById('dropoffDate');
  const dropoffDateText = document.getElementById('dropoffDateText');

  // Format YYYY-MM-DD to "MMM DD, YYYY"
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
  }

  // Set today as min date for pickup
  const today = new Date().toISOString().split('T')[0];
  if (pickupDateInput) {
    pickupDateInput.min = today;
    pickupDateInput.addEventListener('change', () => {
      if (pickupDateInput.value) {
        pickupDateText.textContent = formatDate(pickupDateInput.value);
        // Set drop-off min date to selected pickup date
        if (dropoffDateInput) {
          dropoffDateInput.min = pickupDateInput.value;
          // If dropoff date is before pickup date, update it
          if (dropoffDateInput.value && dropoffDateInput.value < pickupDateInput.value) {
            dropoffDateInput.value = pickupDateInput.value;
            dropoffDateText.textContent = formatDate(pickupDateInput.value);
          }
        }
      }
    });
  }

  if (dropoffDateInput) {
    dropoffDateInput.min = today;
    dropoffDateInput.addEventListener('change', () => {
      if (dropoffDateInput.value) {
        dropoffDateText.textContent = formatDate(dropoffDateInput.value);
      }
    });
  }

  // ----------------------------------------------------
  // 5. Vehicle Type Dropdown
  // ----------------------------------------------------
  const vehicleTypeBtn = document.getElementById('vehicleTypeBtn');
  const vehicleTypeMenu = document.getElementById('vehicleTypeMenu');
  const vehicleTypeLabel = document.getElementById('vehicleTypeLabel');

  if (vehicleTypeBtn && vehicleTypeMenu) {
    vehicleTypeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = vehicleTypeMenu.classList.toggle('open');
      vehicleTypeBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    vehicleTypeMenu.querySelectorAll('.veh-menu-option').forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedType = option.getAttribute('data-type');
        vehicleTypeLabel.textContent = selectedType;

        // Update active checkmarks
        vehicleTypeMenu.querySelectorAll('.veh-menu-option').forEach((opt) => {
          opt.classList.remove('selected');
          opt.setAttribute('aria-selected', 'false');
        });
        option.classList.add('selected');
        option.setAttribute('aria-selected', 'true');

        vehicleTypeMenu.classList.remove('open');
        vehicleTypeBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!vehicleTypeBtn.contains(e.target) && !vehicleTypeMenu.contains(e.target)) {
        vehicleTypeMenu.classList.remove('open');
        vehicleTypeBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ----------------------------------------------------
  // 6. Find Vehicle Submit Action
  // ----------------------------------------------------
  const findVehicleSubmitBtn = document.getElementById('findVehicleSubmitBtn');
  if (findVehicleSubmitBtn) {
    findVehicleSubmitBtn.addEventListener('click', () => {
      const pLoc = pickupInput ? pickupInput.value : '';
      const dLoc = dropoffInput ? dropoffInput.value : '';
      const pDate = pickupDateText ? pickupDateText.textContent : '';
      const dDate = dropoffDateText ? dropoffDateText.textContent : '';
      const vType = vehicleTypeLabel ? vehicleTypeLabel.textContent : '';

      alert(`🚗 Searching available ${vType} fleet:\n\n• Pickup: ${pLoc} (${pDate})\n• Drop-off: ${dLoc} (${dDate})\n\nFetching luxury vehicles...`);
    });
  }

  // ----------------------------------------------------
  // 7. Room Search Submit
  // ----------------------------------------------------
  const roomSearchBtn = document.getElementById('roomSearchBtn');
  if (roomSearchBtn) {
    roomSearchBtn.addEventListener('click', () => {
      const dest = document.getElementById('roomDestInput')?.value || 'Any Destination';
      alert(`🛏 Searching premium rooms & suites in "${dest}"...`);
    });
  }

  // ----------------------------------------------------
  // 8. Reference Vehicle Showcase Card (Exact 476x412 Interaction)
  // ----------------------------------------------------
  const refHotspots = document.querySelectorAll('.ref-hotspot-bubble');
  refHotspots.forEach((hotspot) => {
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      hotspot.style.transform = 'translate(-50%, -50%) scale(1.15)';
      setTimeout(() => {
        hotspot.style.transform = '';
      }, 200);
    });
  });

  // Carousel Controls (← / →)
  const prevCarBtn = document.getElementById('prevCarBtn') || document.getElementById('prevSlideBtn');
  const nextCarBtn = document.getElementById('nextCarBtn') || document.getElementById('nextSlideBtn');
  const carSlides = document.querySelectorAll('.car-slide, .vehicle-slide');
  let currentCarSlideIdx = 0;

  function setCarSlide(newIdx) {
    if (carSlides.length === 0) return;
    currentCarSlideIdx = (newIdx + carSlides.length) % carSlides.length;

    carSlides.forEach((slide, i) => {
      if (i === currentCarSlideIdx) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    if (prevCarBtn && nextCarBtn) {
      if (currentCarSlideIdx === 0) {
        prevCarBtn.className = 'ref-nav-btn active-left';
        nextCarBtn.className = 'ref-nav-btn inactive-right';
      } else {
        prevCarBtn.className = 'ref-nav-btn inactive-right';
        nextCarBtn.className = 'ref-nav-btn active-left';
      }
    }
  }

  if (prevCarBtn) {
    prevCarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setCarSlide(currentCarSlideIdx - 1);
    });
  }

  // ----------------------------------------------------
  // 9. Floating Hero Vehicle Hotspot (Exact Reference Bubble)
  // ----------------------------------------------------
  const heroPorscheHotspot = document.getElementById('heroPorscheHotspot');
  if (heroPorscheHotspot) {
    heroPorscheHotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      heroPorscheHotspot.style.transform = 'translate(-50%, -50%) scale(1.18)';
      setTimeout(() => {
        heroPorscheHotspot.style.transform = '';
      }, 200);
    });
  }

  // ----------------------------------------------------
  // 10. Car Catalogue Card Selection & Interactive Rent Modal
  // ----------------------------------------------------
  const catalogueCards = document.querySelectorAll('.catalogue-card');
  const rentModalOverlay = document.getElementById('rentModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  const modalCarName = document.getElementById('modalCarName');
  const modalCarImg = document.getElementById('modalCarImg');
  const modalSpecTrans = document.getElementById('modalSpecTrans');
  const modalSpecSeats = document.getElementById('modalSpecSeats');
  const modalSpecFuel = document.getElementById('modalSpecFuel');

  catalogueCards.forEach((card) => {
    card.addEventListener('click', () => {
      catalogueCards.forEach((c) => c.classList.remove('active-card'));
      card.classList.add('active-card');
    });

    const rentBtn = card.querySelector('.card-rent-btn');
    if (rentBtn) {
      rentBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const carName = card.querySelector('.card-car-name')?.textContent || 'Luxury Vehicle';
        const carImgSrc = card.querySelector('.card-car-img')?.getAttribute('src') || 'assets/car/toyota van.png';
        const specs = card.querySelectorAll('.spec-item span');
        
        if (modalCarName) modalCarName.textContent = carName;
        if (modalCarImg) modalCarImg.src = carImgSrc;
        if (modalSpecTrans && specs[0]) modalSpecTrans.textContent = specs[0].textContent;
        if (modalSpecSeats && specs[1]) modalSpecSeats.textContent = specs[1].textContent;
        if (modalSpecFuel && specs[2]) modalSpecFuel.textContent = specs[2].textContent;

        if (rentModalOverlay) rentModalOverlay.classList.add('open');
      });
    }
  });

  if (modalCloseBtn && rentModalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      rentModalOverlay.classList.remove('open');
    });

    rentModalOverlay.addEventListener('click', (e) => {
      if (e.target === rentModalOverlay) {
        rentModalOverlay.classList.remove('open');
      }
    });
  }

  if (modalConfirmBtn && rentModalOverlay) {
    modalConfirmBtn.addEventListener('click', () => {
      const car = modalCarName?.textContent || 'Vehicle';
      alert(`✨ Reservation Confirmed for ${car}!\nA confirmation email and trip itinerary have been sent.`);
      rentModalOverlay.classList.remove('open');
    });
  }

  // ----------------------------------------------------
  // 11. Car Catalogue Filtering & Sorting
  // ----------------------------------------------------
  const filterWrappers = document.querySelectorAll('.cat-filter-wrapper');
  filterWrappers.forEach((wrapper) => {
    const btn = wrapper.querySelector('.cat-filter-btn');
    const menu = wrapper.querySelector('.filter-dropdown-menu');
    
    if (btn && menu) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains('open');
        // Close others
        document.querySelectorAll('.filter-dropdown-menu').forEach((m) => m.classList.remove('open'));
        if (!isOpen) {
          menu.classList.add('open');
        }
      });

      const options = menu.querySelectorAll('.filter-option');
      options.forEach((opt) => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          options.forEach((o) => o.classList.remove('selected'));
          opt.classList.add('selected');
          menu.classList.remove('open');

          applyCatalogueFilters();
        });
      });
    }
  });

  // Close menus on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.filter-dropdown-menu').forEach((m) => m.classList.remove('open'));
  });

  function applyCatalogueFilters() {
    const selectedMakeOpt = document.querySelector('#filterManufactureMenu .filter-option.selected');
    const selectedTypeOpt = document.querySelector('#filterTypeMenu .filter-option.selected');
    const selectedSortOpt = document.querySelector('#filterPriceMenu .filter-option.selected');
    const searchInput = document.getElementById('catSearchInput');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    const makeFilter = selectedMakeOpt ? selectedMakeOpt.getAttribute('data-make') : 'all';
    const typeFilter = selectedTypeOpt ? selectedTypeOpt.getAttribute('data-type') : 'all';
    const sortFilter = selectedSortOpt ? selectedSortOpt.getAttribute('data-sort') : 'default';

    const cardsArray = Array.from(catalogueCards);

    cardsArray.forEach((card) => {
      const cardMake = card.getAttribute('data-make') || '';
      const cardType = card.getAttribute('data-type') || '';
      const carName = (card.querySelector('.card-car-name')?.textContent || '').toLowerCase();

      const matchMake = makeFilter === 'all' || cardMake === makeFilter;
      const matchType = typeFilter === 'all' || cardType === typeFilter;
      const matchSearch = !query || carName.includes(query);

      if (matchMake && matchType && matchSearch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    // Sorting by price
    const grid = document.getElementById('catalogueGrid');
    if (grid && sortFilter !== 'default') {
      const visibleCards = cardsArray.filter((c) => !c.classList.contains('hidden'));
      visibleCards.sort((a, b) => {
        const pA = parseInt(a.getAttribute('data-price') || '0', 10);
        const pB = parseInt(b.getAttribute('data-price') || '0', 10);
        return sortFilter === 'low-high' ? pA - pB : pB - pA;
      });
      visibleCards.forEach((c) => grid.appendChild(c));
    }
  }

  // Live Car Search Input listener
  const catSearchInput = document.getElementById('catSearchInput');
  if (catSearchInput) {
    catSearchInput.addEventListener('input', applyCatalogueFilters);
  }

  // ----------------------------------------------------
  // 12. Bottom Floating Navigation (Mobile Only: Dynamic Expanding Active Tabs)
  // ----------------------------------------------------
  const mobileBottomNav = document.getElementById('mobileBottomNav');
  if (mobileBottomNav) {
    const bnavLinks = mobileBottomNav.querySelectorAll('a[href^="#"]');
    const sections = [
      { id: 'home', el: document.getElementById('home') },
      { id: 'vehicles', el: document.getElementById('vehicles') },
      { id: 'campsites', el: document.getElementById('campsites') },
      { id: 'blog', el: document.getElementById('blog') },
      { id: 'stories', el: document.getElementById('stories') }
    ];

    const setActiveTab = (targetId) => {
      bnavLinks.forEach((link) => {
        const href = link.getAttribute('href').replace('#', '');
        if (href === targetId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };

    let isManualClick = false;
    let manualTimeout = null;

    const handleScroll = () => {
      if (window.scrollY > 80) {
        mobileBottomNav.classList.add('scrolled-visible');
      } else {
        mobileBottomNav.classList.remove('scrolled-visible');
      }

      if (isManualClick) return;

      const scrollPosition = window.scrollY + 250;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.el && sec.el.offsetTop <= scrollPosition) {
          setActiveTab(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    bnavLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').replace('#', '');
        const targetEl = document.getElementById(targetId);
        
        isManualClick = true;
        clearTimeout(manualTimeout);
        manualTimeout = setTimeout(() => {
          isManualClick = false;
        }, 1200);

        setActiveTab(targetId);

        if (targetEl) {
          const navOffset = 24;
          const y = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      });
    });
  }

  // Explore more button directly navigates/scrolls to campsites section
  const exploreBtn = document.getElementById('exploreBtn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      const campsiteSection = document.getElementById('campsites');
      if (campsiteSection) {
        e.preventDefault();
        const y = campsiteSection.getBoundingClientRect().top + window.pageYOffset - 24;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    });
  }

  // ----------------------------------------------------
  // 13. Campsite Heart / Favorite Button Interactive Toggle
  // ----------------------------------------------------
  const heartButtons = document.querySelectorAll('.campsite-heart-btn');
  heartButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('liked');
      const svg = btn.querySelector('svg');
      if (btn.classList.contains('liked')) {
        svg.setAttribute('fill', '#EF4444');
        svg.setAttribute('stroke', '#EF4444');
      } else {
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
      }
    });
  });

  // ----------------------------------------------------
  // 14. Kerala Stories & Client Reel Video Carousel & Modal
  // ----------------------------------------------------
  const keralaContainer = document.querySelector('.kerala-showcase-container');
  const keralaPrevBtn = document.getElementById('keralaPrevBtn');
  const keralaNextBtn = document.getElementById('keralaNextBtn');

  if (keralaContainer && keralaPrevBtn && keralaNextBtn) {
    keralaPrevBtn.addEventListener('click', () => {
      keralaPrevBtn.classList.add('active');
      keralaNextBtn.classList.remove('active');
      keralaContainer.scrollBy({
        left: -290,
        behavior: 'smooth'
      });
    });

    keralaNextBtn.addEventListener('click', () => {
      keralaNextBtn.classList.add('active');
      keralaPrevBtn.classList.remove('active');
      keralaContainer.scrollBy({
        left: 290,
        behavior: 'smooth'
      });
    });
  }

  // ----------------------------------------------------
  // Scroll-to-Play Video Controller (Plays videos when scrolled into view)
  // ----------------------------------------------------
  const reelVideos = document.querySelectorAll('.reel-video-element');
  
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          // Play video when card is visible in viewport / scrolled into view
          video.muted = true;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              video.muted = true;
              video.play().catch(() => {});
            });
          }
        } else {
          // Pause when scrolled out of view to save battery and performance
          video.pause();
        }
      });
    }, {
      threshold: 0.25,
      rootMargin: '0px 0px 50px 0px'
    });

    reelVideos.forEach((vid) => videoObserver.observe(vid));
  } else {
    // Fallback if IntersectionObserver not supported: autoplay all muted
    reelVideos.forEach((vid) => {
      vid.muted = true;
      vid.play().catch(() => {});
    });
  }

  // Also play on card hover
  document.querySelectorAll('.kerala-reel-card').forEach((card) => {
    const video = card.querySelector('.reel-video-element');
    if (video) {
      card.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
      });
    }
  });

  // Direct In-Card Reel Video Play/Pause & Sound Toggle (No Popup)
  const reelCards = document.querySelectorAll('.kerala-reel-card');

  reelCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const video = card.querySelector('.reel-video-element');
      if (video) {
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          // If already playing, toggle mute or pause
          if (video.muted) {
            video.muted = false;
          } else {
            video.pause();
          }
        }
      }
    });
  });

  // ----------------------------------------------------
  // 15. Luxor Footer Scroll to Top Button
  // ----------------------------------------------------
  const luxorScrollTopBtn = document.getElementById('luxorScrollTopBtn');
  if (luxorScrollTopBtn) {
    luxorScrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  console.log('LUXOR Kerala Stays, Client Reel Experiences & Modern Minimalist Dark Footer Loaded Successfully.');
});

