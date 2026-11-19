/**
 * LUXOR CHATBOT ENGINE (Luxor AI)
 * Provides intelligent, project-specific AI assistant capabilities for Luxor Travel & Fleet.
 */

(function () {
  'use strict';

  // Knowledge Base & Custom Logic for Luxor Project
  const LUXOR_KB = {
    fleet: [
      { name: 'Porsche 911 GT3 RS', type: 'Supercar', price: '₹14,999/day', rating: '5.0', features: 'Track aerodynamic kit, 518 HP, PDK auto, dual exhaust' },
      { name: 'Toyota New Yaris', type: 'Compact SUV/Cross', price: '$42/day (₹4,200)', rating: '4.7', features: 'Automatic, 5 seats, 38 MPG, high ground clearance' },
      { name: 'Pajero Sport 4x4', type: 'Rugged SUV', price: '$46/day (₹4,600)', rating: '4.8', features: 'Terrain response 4WD, 7 seats, hill descent control' },
      { name: 'Honda Civic', type: 'Sedan', price: '$52/day (₹5,200)', rating: '4.9', features: 'Sport mode, premium leather seats, 36 MPG, Apple CarPlay' },
      { name: 'Innova Crysta', type: 'Luxury MPV', price: '$54/day (₹5,400)', rating: '4.9', features: 'Captain seats, 7-8 passenger capacity, rear AC, touring comfort' },
      { name: 'Toyota HiAce Campervan', type: 'Custom Campervan', price: '$56/day (₹5,600)', rating: '4.8', features: 'Sleeping bunks, mini-kitchenette, solar backup, camping gear kit' },
      { name: 'Honda Jazz RS', type: 'Hatchback', price: '$58/day (₹5,800)', rating: '4.9', features: 'Paddle shifters, Magic seats, nimble city handling' },
      { name: 'BMW 3 Series Sedan', type: 'Luxury Sedan', price: '$60/day (₹6,000)', rating: '5.0', features: 'TwinPower turbo, ambient lighting, executive comfort' },
      { name: 'Toyota Urban Cross', type: 'Hybrid SUV', price: '$63/day (₹6,300)', rating: '4.8', features: 'Hybrid fuel efficiency, panoramic sunroof, 360 camera' }
    ],
    campsites: [
      { name: 'Alleppey Backwater Luxury Retreat', loc: 'Alleppey, Kerala', rating: '4.9', capacity: '4 guests per luxury dome / 2 bath / 2 bedrooms', highlights: 'Private canal deck, traditional kettuvallam sunset cruise, fresh lake catch' },
      { name: 'Munnar Misty Hills Glamping Dome', loc: 'Munnar, Kerala', rating: '4.8', capacity: '2-4 guests per geodesic dome', highlights: 'Tea estate panoramic view, campfire, cooler mountain altitude, stargazing' },
      { name: 'Wayanad Rainforest Treehouse', loc: 'Wayanad, Kerala', rating: '4.9', capacity: 'Family suites & canopy cabins', highlights: 'Surrounded by wild foliage, private jacuzzi, waterfall trek guides' },
      { name: 'Varkala Cliffside Beachfront Campsite', loc: 'Varkala, Kerala', rating: '4.7', capacity: 'Tented sea-facing retreats', highlights: 'Arabian sea views, surfing lessons, cliff walks, bonfire barbecues' },
      { name: 'Coorg Heritage Plantation Villa', loc: 'Coorg, Karnataka', rating: '4.8', capacity: 'Colonial style estate bungalows', highlights: 'Aromatic coffee trail tours, birdwatching, bespoke Kodava cuisine' }
    ],
    locations: ['Kochi International Airport (COK)', 'Trivandrum Airport (TRV)', 'Calicut (CCJ)', 'Bengaluru Downtown Hub', 'Munnar Base', 'Alleppey Jetty', 'Doorstep delivery available across South India'],
    discounts: '10% off for 7+ days rentals, 20% off for 14+ days extended expeditions. Comprehensive zero-deductible insurance & 24/7 roadside assistance included on all vehicles.'
  };

  // Pre-configured Intelligent Responses
  function generateLuxorResponse(input) {
    const q = input.trim().toLowerCase();

    // 1. Exact Match to Reference Image Prompt: "Create an event with attendee registration, allowing up to 20 attendees."
    if (q.includes('event') && (q.includes('20') || q.includes('attendee') || q.includes('registration'))) {
      return `
        <p>I would be delighted to set up a seamless <strong>20-attendee corporate retreat or group expedition</strong> tailored specifically to the <strong>Luxor Travel & Fleet</strong> ecosystem!</p>
        
        <p><strong>1. Fleet Logistics (Convoy Plan):</strong></p>
        <ul>
          <li><strong>Recommended:</strong> 3x <em>Toyota Innova Crystas</em> (7 seats each = 21 seats) OR 2x <em>Toyota HiAce Luxury Campervans</em> + 1x <em>Pajero Sport</em>.</li>
          <li><strong>Airport Pickup:</strong> Coordinated group pickup from Kochi International Airport (COK) or Trivandrum (TRV) with professional chauffeurs.</li>
        </ul>

        <p><strong>2. Private Stays & Exclusive Venue:</strong></p>
        <ul>
          <li><strong>Venue:</strong> Exclusive buyout of the <em>Alleppey Backwater Luxury Retreat</em> or <em>Munnar Misty Hills Glamping Domes</em>.</li>
          <li>Accommodates up to 20 attendees across private glamping domes & luxury cottage suites.</li>
          <li>Includes open-air briefing deck, bonfire networking area, and evening backwater houseboat cruise.</li>
        </ul>

        <p><strong>3. Attendee Registration Framework:</strong></p>
        <ul>
          <li>Digital RSVP portal collecting attendee details, dietary choices, and flight schedules.</li>
          <li>Automated digital boarding passes with designated vehicle convoy assignments.</li>
          <li>All-inclusive package: Zero-dep insurance, fuel & toll allowances, camping gear, and catered meals.</li>
        </ul>

        <p>Would you like me to initiate the reservation hold or connect you directly with our group events specialist at <strong>hello@luxorkerala.com</strong>?</p>
      `;
    }

    // 2. Cars / Vehicles / Fleet
    if (q.includes('car') || q.includes('vehicle') || q.includes('fleet') || q.includes('porsche') || q.includes('toyota') || q.includes('bmw') || q.includes('honda') || q.includes('suv')) {
      return `
        <p>Here is a snapshot of our <strong>Luxor Premium Fleet</strong> available for self-drive or chauffeur service:</p>
        <ul>
          <li><strong>Toyota New Yaris (SUV):</strong> $42/day (₹4,200) · 4.7★ · Auto · 5 Seats</li>
          <li><strong>Pajero Sport (4x4 SUV):</strong> $46/day (₹4,600) · 4.8★ · Auto · 7 Seats</li>
          <li><strong>Honda Civic (Sedan):</strong> $52/day (₹5,200) · 4.9★ · Auto · Sport mode</li>
          <li><strong>Innova Crysta (MPV):</strong> $54/day (₹5,400) · 4.9★ · Auto · 7 Seats</li>
          <li><strong>Toyota HiAce Campervan:</strong> $56/day (₹5,600) · 4.8★ · Sleeping bunks & Kitchenette</li>
          <li><strong>BMW 3 Series (Sedan):</strong> $60/day (₹6,000) · 5.0★ · TwinPower Turbo</li>
          <li><strong>Porsche 911 GT3 RS:</strong> Exclusive Track & Luxury Experience</li>
        </ul>
        <p><em>All rentals include zero-deductible insurance and 24/7 roadside assistance. 10% discount on 7+ days, 20% on 14+ days.</em></p>
      `;
    }

    // 3. Campsite / Stays / Glamping
    if (q.includes('campsite') || q.includes('camp') || q.includes('stay') || q.includes('munnar') || q.includes('alleppey') || q.includes('glamping') || q.includes('room')) {
      return `
        <p>Luxor offers handpicked, high-luxury nature stays across Kerala:</p>
        <ul>
          <li><strong>Alleppey Backwater Luxury Retreat:</strong> 4.9★ · Water canal front, sunset houseboat cruise, luxury waterfront tents.</li>
          <li><strong>Munnar Misty Hills Glamping Dome:</strong> 4.8★ · Geodesic glass domes amidst sprawling tea gardens, outdoor bonfire & BBQ.</li>
          <li><strong>Wayanad Rainforest Treehouse:</strong> 4.9★ · Canopy treehouses with private heated jacuzzi & guided forest trekking.</li>
          <li><strong>Varkala Beachfront Camp:</strong> 4.7★ · Cliffside ocean view retreats with private beach access and surfing lessons.</li>
        </ul>
        <p>You can reserve rooms directly through our booking widget on the homepage!</p>
      `;
    }

    // 4. Campervan & RV Travel
    if (q.includes('campervan') || q.includes('rv') || q.includes('van') || q.includes('hiace') || q.includes('camping')) {
      return `
        <p>Our <strong>Toyota HiAce Luxury Campervan</strong> ($56/day) is customized specifically for off-grid Kerala road adventures:</p>
        <ul>
          <li><strong>Interior:</strong> Cozy double bed bunks, modular dining table, compact kitchenette with gas burner & mini-fridge.</li>
          <li><strong>Power:</strong> Rooftop solar panel system & auxiliary battery for uninterrupted lighting and gadget charging.</li>
          <li><strong>Camping Gear Included:</strong> 2 outdoor folding chairs, portable camping stove, campfire grill, and waterproof awning.</li>
        </ul>
        <p>Perfect for scenic mountain routes through Munnar, Wagamon, and the tea valleys!</p>
      `;
    }

    // 5. Pricing / Discounts / Offers
    if (q.includes('price') || q.includes('rate') || q.includes('cost') || q.includes('discount') || q.includes('offer')) {
      return `
        <p><strong>Luxor Transparent Pricing Structure:</strong></p>
        <ul>
          <li><strong>Compact & City SUVs:</strong> Starting at $42/day (₹4,200)</li>
          <li><strong>Luxury Sedans & Large MPVs:</strong> $52 - $54/day (₹5,200 - ₹5,400)</li>
          <li><strong>Campervans & Executive BMW:</strong> $56 - $60/day (₹5,600 - ₹6,000)</li>
          <li><strong>Campsites & Glamping Domes:</strong> Starting from ₹3,500/night</li>
        </ul>
        <p><strong>Special Long-term Discounts:</strong><br>
        • 7+ Days: <strong>10% OFF</strong> applied at checkout<br>
        • 14+ Days: <strong>20% OFF</strong> applied at checkout</p>
      `;
    }

    // 6. Blog & Article questions
    if (q.includes('blog') || q.includes('article') || q.includes('kerala') || q.includes('lifestyle') || q.includes('meeting') || q.includes('cities') || q.includes('ryan')) {
      return `
        <p>Our featured editorial <strong>"The New Way People Are Meeting Across Kerala — And It's Not Dating Apps"</strong> by Ryan Calloway is live in our <em>Stories & Insights</em> section!</p>
        <p>It explores how modern travelers and explorers across South India are replacing shallow swipe-based apps with <strong>activity-first connection</strong> in God's Own Country. Shared experiences like group campervan road trips through Munnar, backwater glamping in Alleppey, and scenic ghat drives forge authentic, natural bonds.</p>
        <p>You can read the full full-page article on our <a href="blog.html" style="color: #00D26A; font-weight: 700; text-decoration: underline;">Blog Page here</a>!</p>
      `;
    }

    // 7. Booking / License Requirements
    if (q.includes('book') || q.includes('license') || q.includes('deposit') || q.includes('requirement') || q.includes('driver') || q.includes('chauffeur')) {
      return `
        <p><strong>Booking Requirements for Luxor:</strong></p>
        <ul>
          <li><strong>Self-Drive:</strong> Minimum age 21 years with a valid government driving license (Indian or International Driving Permit).</li>
          <li><strong>Security Deposit:</strong> 100% refundable security deposit authorized at pickup.</li>
          <li><strong>Chauffeur Service:</strong> Professional English, Malayalam & Hindi speaking drivers are available upon request for ₹1,200/day.</li>
          <li><strong>Pickup Hubs:</strong> Kochi Airport, Trivandrum Airport, Calicut, or direct delivery to your resort.</li>
        </ul>
      `;
    }

    // 8. Default Context-Rich Response for Luxor
    return `
      <p>Thanks for reaching out! At <strong>Luxor</strong>, we provide India's finest luxury travel experiences across Kerala and South India.</p>
      <p>I can help you with:</p>
      <ul>
        <li>Reserving luxury vehicles (Porsche, BMW, Innova Crysta, Pajero, Yaris)</li>
        <li>Booking our customized Toyota HiAce Campervans</li>
        <li>Reserving nature glamping stays in Alleppey, Munnar, and Wayanad</li>
        <li>Planning custom group itineraries and corporate events</li>
      </ul>
      <p>What specific vehicle or travel dates are you planning for?</p>
    `;
  }

  // Build and Inject Chatbot HTML into DOM
  function initChatbotUI() {
    if (document.getElementById('luxorChatbotRoot')) return;

    const root = document.createElement('div');
    root.id = 'luxorChatbotRoot';
    root.innerHTML = `
      <!-- Floating Trigger Button (Bottom-Right) -->
      <div class="luxor-chat-launcher" id="luxorChatLauncher">
        <div class="luxor-chat-greeting-pill" id="luxorChatGreetingPill">
          <span>Chat with Luxor AI 👋</span>
          <span class="close-pill" id="closeGreetingPill">×</span>
        </div>
        <button class="luxor-chat-trigger-btn" id="luxorChatTriggerBtn" aria-label="Open Chat with Luxor AI">
          <img src="assets/chatbot-icon-transparent.png" alt="Luxor AI" class="luxor-chat-trigger-icon" />
          <span class="luxor-chat-badge"></span>
        </button>
      </div>

      <!-- Main Chat Popup Window (Matches Reference Image) -->
      <div class="luxor-chat-popup chat-hidden" id="luxorChatPopup" role="dialog" aria-modal="true" aria-label="Luxor AI Chat">
        <!-- Header Bar -->
        <div class="luxor-chat-header-bar">
          <div class="luxor-chat-header-left">
            <img src="assets/chatbot-icon-transparent.png" alt="Luxor AI" class="luxor-chat-header-avatar" />
            <span class="luxor-chat-header-title">Luxor AI</span>
            <div class="luxor-chat-header-status">
              <span class="luxor-chat-header-status-dot"></span>
              <span>Online</span>
            </div>
          </div>
          <div class="luxor-chat-header-actions">
            <button class="luxor-chat-icon-btn" id="luxorChatResetBtn" title="Clear Conversation">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>
            </button>
            <button class="luxor-chat-icon-btn" id="luxorChatCloseBtn" title="Close Window">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="luxor-chat-messages-container" id="luxorChatMessages">
          <!-- Initial Greeting from Luxor AI -->
          <div class="chat-bot-message-row">
            <div class="chat-sender-header">
              <img src="assets/chatbot-icon-transparent.png" class="chat-sender-avatar" alt="Luxor AI" />
              <span class="chat-sender-name">Luxor AI</span>
            </div>
            <div class="chat-bot-text-block">
              Hey, I'm Luxor AI. What do you want me to help you with?
            </div>
          </div>
        </div>

        <!-- Quick Starter Chips -->
        <div class="luxor-chat-chips-wrap" id="luxorChatChips">
          <button class="luxor-chat-chip" data-query="Create an event with attendee registration, allowing up to 20 attendees.">
            ✨ 20-Person Event Plan
          </button>
          <button class="luxor-chat-chip" data-query="What luxury cars and campervans do you have in your fleet?">
            🚗 Luxury Fleet & Rates
          </button>
          <button class="luxor-chat-chip" data-query="Tell me about your campsites in Munnar and Alleppey">
            🏕️ Stays & Glamping
          </button>
          <button class="luxor-chat-chip" data-query="What are the rental requirements and discounts?">
            💳 Booking & Discounts
          </button>
        </div>

        <!-- Input Container (Exact match to Reference Image) -->
        <div class="luxor-chat-input-container">
          <input 
            type="text" 
            class="luxor-chat-text-input" 
            id="luxorChatInput" 
            placeholder="Reply...." 
            autocomplete="off"
          />
          <div class="luxor-chat-input-actions-row">
            <div class="luxor-chat-left-actions">
              <button class="luxor-chat-action-btn" id="luxorChatPlusBtn" title="Quick Options">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
              <button class="luxor-chat-action-btn" id="luxorChatMicBtn" title="Voice Input">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
              </button>
            </div>
            <button class="luxor-chat-send-btn" id="luxorChatSendBtn" aria-label="Send Message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Disclaimer (Exact match to Reference Image) -->
        <div class="luxor-chat-disclaimer">
          Luxor AI may make mistakes. Verify info
        </div>
      </div>
    `;

    document.body.appendChild(root);

    attachChatEvents();
  }

  // Attach Event Handlers
  function attachChatEvents() {
    const triggerBtn = document.getElementById('luxorChatTriggerBtn');
    const popup = document.getElementById('luxorChatPopup');
    const closeBtn = document.getElementById('luxorChatCloseBtn');
    const resetBtn = document.getElementById('luxorChatResetBtn');
    const input = document.getElementById('luxorChatInput');
    const sendBtn = document.getElementById('luxorChatSendBtn');
    const messages = document.getElementById('luxorChatMessages');
    const greetingPill = document.getElementById('luxorChatGreetingPill');
    const closeGreetingPill = document.getElementById('closeGreetingPill');
    const micBtn = document.getElementById('luxorChatMicBtn');
    const plusBtn = document.getElementById('luxorChatPlusBtn');
    const chips = document.querySelectorAll('.luxor-chat-chip');

    // Toggle chat popup
    function toggleChat(open) {
      const isHidden = popup.classList.contains('chat-hidden');
      const shouldOpen = open !== undefined ? open : isHidden;

      if (shouldOpen) {
        popup.classList.remove('chat-hidden');
        if (greetingPill) greetingPill.style.display = 'none';
        setTimeout(() => input.focus(), 200);
      } else {
        popup.classList.add('chat-hidden');
      }
    }

    triggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleChat();
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleChat(false);
    });

    if (closeGreetingPill) {
      closeGreetingPill.addEventListener('click', (e) => {
        e.stopPropagation();
        greetingPill.style.display = 'none';
      });
    }

    if (greetingPill) {
      greetingPill.addEventListener('click', () => {
        toggleChat(true);
      });
      // Auto-hide greeting pill after 10 seconds
      setTimeout(() => {
        if (greetingPill) greetingPill.style.display = 'none';
      }, 10000);
    }

    // Reset Chat
    resetBtn.addEventListener('click', () => {
      messages.innerHTML = `
        <div class="chat-bot-message-row">
          <div class="chat-sender-header">
            <img src="assets/chatbot-icon-transparent.png" class="chat-sender-avatar" alt="Luxor AI" />
            <span class="chat-sender-name">Luxor AI</span>
          </div>
          <div class="chat-bot-text-block">
            Hey, I'm Luxor AI. What do you want me to help you with?
          </div>
        </div>
      `;
    });

    // Send User Message
    function handleSendMessage(text) {
      const msg = (text || input.value || '').trim();
      if (!msg) return;

      input.value = '';

      // 1. Render User Bubble (with tail on bottom right)
      const userRow = document.createElement('div');
      userRow.className = 'chat-user-message-row';
      userRow.innerHTML = `
        <div class="chat-user-bubble">
          ${escapeHTML(msg)}
        </div>
      `;
      messages.appendChild(userRow);
      scrollToBottom();

      // 2. Render Typing Indicator (matches screenshot)
      const typingRow = document.createElement('div');
      typingRow.className = 'chat-typing-row';
      typingRow.id = 'chatActiveTyping';
      typingRow.innerHTML = `
        <div class="chat-sender-header">
          <img src="assets/chatbot-icon-transparent.png" class="chat-sender-avatar" alt="Luxor AI" />
          <span class="chat-sender-name">Luxor AI</span>
        </div>
        <div class="chat-typing-dots">
          <span></span><span></span><span></span>
        </div>
      `;
      messages.appendChild(typingRow);
      scrollToBottom();

      // 3. Generate response after brief typing pause (natural feel)
      setTimeout(() => {
        const activeTyping = document.getElementById('chatActiveTyping');
        if (activeTyping) activeTyping.remove();

        const botRow = document.createElement('div');
        botRow.className = 'chat-bot-message-row';
        botRow.innerHTML = `
          <div class="chat-sender-header">
            <img src="assets/chatbot-icon-transparent.png" class="chat-sender-avatar" alt="Luxor AI" />
            <span class="chat-sender-name">Luxor AI</span>
          </div>
          <div class="chat-bot-text-block">
            ${generateLuxorResponse(msg)}
          </div>
        `;
        messages.appendChild(botRow);
        scrollToBottom();
      }, 750);
    }

    sendBtn.addEventListener('click', () => handleSendMessage());

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSendMessage();
      }
    });

    // Quick suggestion chips
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        handleSendMessage(query);
      });
    });

    // Plus button action (quick options popup)
    plusBtn.addEventListener('click', () => {
      input.value = 'Can I get a personalized travel quote for Kerala?';
      input.focus();
    });

    // Speech-to-text / Microphone support (Web Speech API)
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      micBtn.addEventListener('click', () => {
        try {
          micBtn.classList.add('active-mic');
          recognition.start();
        } catch (err) {
          micBtn.classList.remove('active-mic');
        }
      });

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        input.value = transcript;
        micBtn.classList.remove('active-mic');
        handleSendMessage(transcript);
      };

      recognition.onerror = () => {
        micBtn.classList.remove('active-mic');
      };

      recognition.onend = () => {
        micBtn.classList.remove('active-mic');
      };
    } else {
      micBtn.addEventListener('click', () => {
        input.value = 'Create an event with attendee registration, allowing up to 20 attendees.';
        input.focus();
      });
    }

    function scrollToBottom() {
      messages.scrollTop = messages.scrollHeight;
    }

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, 
        tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
      );
    }
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbotUI);
  } else {
    initChatbotUI();
  }
})();
