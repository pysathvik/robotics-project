/* ============================================
   ROBOTICS WEBSITE - JAVASCRIPT
   Premium Interactivity & Animations
   ============================================ */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initThemeToggle();
  initMobileMenu();
  initScrollAnimations();
  initNavbarScroll();
  initMouseGlow();
  initTypingEffect();
  initScrollToTop();
  setActiveNavLink();
});

/* ============================================
   THEME TOGGLE (Dark/Light Mode)
   ============================================ */
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      
      // Add transition class for smooth theme change
      document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    });
  }
}

function updateThemeIcon(theme) {
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  if (sunIcon && moonIcon) {
    if (theme === 'dark') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Toggle hamburger to X
      const icon = mobileMenuBtn.querySelector('span');
      if (navLinks.classList.contains('active')) {
        icon.textContent = '✕';
      } else {
        icon.textContent = '☰';
      }
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('span').textContent = '☰';
      });
    });
  }
}

/* ============================================
   SCROLL ANIMATIONS (Fade-in Effects)
   ============================================ */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: stop observing after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => observer.observe(el));
}

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

/* ============================================
   MOUSE FOLLOW GLOW EFFECT
   ============================================ */
function initMouseGlow() {
  // Create glow element if it doesn't exist
  let glow = document.querySelector('.mouse-glow');
  if (!glow) {
    glow = document.createElement('div');
    glow.classList.add('mouse-glow');
    document.body.appendChild(glow);
  }
  
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth animation loop
  function animateGlow() {
    // Smooth interpolation
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    
    requestAnimationFrame(animateGlow);
  }
  
  animateGlow();
  
  // Reduce glow on mobile
  if (window.innerWidth < 768) {
    glow.style.opacity = '0.3';
    glow.style.width = '300px';
    glow.style.height = '300px';
  }
}

/* ============================================
   TYPING EFFECT (Non-editable)
   ============================================ */
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-text');
  
  if (!typingElement) return;
  
  // Ensure element is not editable
  typingElement.setAttribute('contenteditable', 'false');
  typingElement.style.userSelect = 'text';
  typingElement.style.cursor = 'default';
  
  const text = typingElement.getAttribute('data-text') || typingElement.textContent;
  typingElement.textContent = '';
  
  let charIndex = 0;
  const typingSpeed = 80;
  
  function typeChar() {
    if (charIndex < text.length) {
      typingElement.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, typingSpeed);
    }
  }
  
  // Start typing after a short delay
  setTimeout(typeChar, 500);
}

/* ============================================
   SCROLL TO TOP BUTTON
   ============================================ */
function initScrollToTop() {
  // Create scroll to top button if it doesn't exist
  let scrollBtn = document.querySelector('.scroll-top');
  if (!scrollBtn) {
    scrollBtn = document.createElement('button');
    scrollBtn.classList.add('scroll-top');
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);
  }
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ============================================
   SET ACTIVE NAV LINK
   ============================================ */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    
    // Start animation when element is in view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.disconnect();
      }
    });
    
    observer.observe(counter);
  });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
document.addEventListener('click', (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
});

/* ============================================
   IMAGE LAZY LOADING
   ============================================ */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', initLazyLoading);

/* ============================================
   PARALLAX EFFECT (Optional)
   ============================================ */
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-speed') || 0.5;
      const yPos = -(window.scrollY * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Uncomment to enable parallax
// document.addEventListener('DOMContentLoaded', initParallax);

/* ============================================
   CARD HOVER GLOW EFFECT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});

/* ============================================
   PRELOADER (Optional)
   ============================================ */
function hidePreloader() {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
}

window.addEventListener('load', hidePreloader);

/* ============================================
   CHATBOT FUNCTIONALITY
   ============================================ */
function initChatbot() {
  const chatbotHTML = `
    <div class="chatbot-container">
      <button class="chatbot-toggle" aria-label="Open chatbot">
        <svg class="chat-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L2 22l5.71-.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <svg class="close-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
      <div class="chatbot-window">
        <div class="chatbot-header">
          <div class="chatbot-avatar">🤖</div>
          <div class="chatbot-header-info">
            <h4>RoboAssist</h4>
            <span>Ask me about robotics!</span>
          </div>
        </div>
        <div class="chatbot-messages" id="chatMessages">
          <div class="chat-message bot">
            Hello! I'm RoboAssist, your guide to the world of robotics. Ask me anything about industrial robots, home automation, medical robotics, or the future of AI!
          </div>
        </div>
        <div class="chat-suggestions">
          <button class="suggestion-btn">What is robotics?</button>
          <button class="suggestion-btn">Industrial robots</button>
          <button class="suggestion-btn">Medical robots</button>
          <button class="suggestion-btn">Future of AI</button>
        </div>
        <div class="chatbot-input-area">
          <input type="text" id="chatInput" placeholder="Type your question..." autocomplete="off">
          <button class="chatbot-send" id="chatSend" aria-label="Send message">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  
  const toggle = document.querySelector('.chatbot-toggle');
  const window = document.querySelector('.chatbot-window');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');
  const messages = document.getElementById('chatMessages');
  const suggestions = document.querySelectorAll('.suggestion-btn');
  
  // Knowledge base for robotics FAQ
  const knowledgeBase = {
    'what is robotics': 'Robotics is a branch of engineering and science that encompasses mechanical engineering, electrical engineering, computer science, and others. It deals with the design, construction, operation, and use of robots. The field has grown enormously since the term "robot" was coined by Karel Čapek in 1920.',
    
    'industrial robots': 'Industrial robots are automated, programmable machines used in manufacturing. As of 2023, there are over 3.5 million industrial robots operating worldwide. Key applications include automotive assembly (38%), electronics manufacturing (25%), and metal/machinery (12%). Companies like FANUC, ABB, and KUKA lead the industry.',
    
    'medical robots': 'Medical robots are revolutionizing healthcare. The da Vinci Surgical System has performed over 12 million procedures since 1999. Robotic surgery offers 5x better precision, 50% less blood loss, and 70% faster recovery times. Rehabilitation robots help 60% of stroke patients regain mobility.',
    
    'home robots': 'Home robots are becoming increasingly common. Over 40 million robot vacuums (like Roomba) have been sold globally. Smart home assistants like Amazon Echo and Google Home are in 35% of US households. Social robots like Vector and Aibo provide companionship.',
    
    'future of ai': 'The future of AI in robotics is exciting! By 2030, the robotics market is expected to reach $275 billion. Autonomous vehicles could represent a $7 trillion market. Key developments include general AI, quantum computing integration, emotional intelligence, and human-robot collaboration.',
    
    'robot types': 'There are several main types of robots: Industrial robots (manufacturing), Service robots (healthcare, hospitality), Mobile robots (delivery, exploration), Collaborative robots (cobots that work alongside humans), Humanoid robots (like Atlas, Sophia), and Drones (aerial robotics).',
    
    'cobots': 'Collaborative robots, or cobots, are designed to work safely alongside humans. Unlike traditional industrial robots, cobots have force-limiting sensors and can be easily reprogrammed. The cobot market is growing at 23% annually and is expected to reach $12 billion by 2030.',
    
    'robot history': 'The history of robotics began with ancient automata, but modern robotics started in 1954 when George Devol invented Unimate, the first industrial robot. In 1961, Unimate was installed at GM. The 1970s-80s saw robot arms in manufacturing. The 2000s brought consumer robots like Roomba and advanced humanoids like ASIMO.',
    
    'autonomous vehicles': 'Autonomous vehicles use AI, sensors, and robotics for self-driving. There are 6 levels of autonomy (0-5). Companies like Waymo have logged over 20 million autonomous miles. By 2035, 12 million self-driving vehicles are expected on roads. They could reduce accidents by 90%.',
    
    'robot sensors': 'Robots use various sensors: cameras for vision, LiDAR for 3D mapping, ultrasonic sensors for proximity, force/torque sensors for touch, IMUs for balance, and encoders for position. Modern robots often use sensor fusion to combine data from multiple sources.',
    
    'programming robots': 'Robots can be programmed using various methods: teach pendants (manual guidance), offline programming (simulation), visual programming (block-based), and text-based coding (Python, C++, ROS). ROS (Robot Operating System) is the most popular framework.',
    
    'ai robotics': 'AI enables robots to learn and adapt. Machine learning helps robots recognize objects and navigate. Deep learning powers computer vision. Reinforcement learning teaches robots through trial and error. Natural language processing enables voice commands.',
    
    'robot jobs': 'While robots automate some jobs, they also create new ones. For every robot installed, 3.6 new jobs are created on average. Growing careers include robot technicians, AI engineers, robot trainers, and automation specialists. By 2025, 97 million new robot-related jobs are expected.',
    
    'robot ethics': 'Robot ethics addresses important questions: Should robots make life-or-death decisions? Who is responsible when robots cause harm? How do we prevent AI bias? Isaac Asimov\'s Three Laws of Robotics were early ethical guidelines, but modern robotics requires more nuanced frameworks.'
  };
  
  function findAnswer(question) {
    const q = question.toLowerCase().trim();
    
    // Direct matches
    for (const [key, answer] of Object.entries(knowledgeBase)) {
      if (q.includes(key) || key.split(' ').some(word => q.includes(word) && word.length > 4)) {
        return answer;
      }
    }
    
    // Keyword matching
    if (q.includes('industrial') || q.includes('factory') || q.includes('manufacturing')) {
      return knowledgeBase['industrial robots'];
    }
    if (q.includes('medical') || q.includes('surgery') || q.includes('hospital') || q.includes('health')) {
      return knowledgeBase['medical robots'];
    }
    if (q.includes('home') || q.includes('house') || q.includes('vacuum') || q.includes('roomba')) {
      return knowledgeBase['home robots'];
    }
    if (q.includes('future') || q.includes('2030') || q.includes('prediction')) {
      return knowledgeBase['future of ai'];
    }
    if (q.includes('type') || q.includes('kind') || q.includes('category')) {
      return knowledgeBase['robot types'];
    }
    if (q.includes('cobot') || q.includes('collaborative')) {
      return knowledgeBase['cobots'];
    }
    if (q.includes('history') || q.includes('first') || q.includes('invention') || q.includes('began')) {
      return knowledgeBase['robot history'];
    }
    if (q.includes('car') || q.includes('drive') || q.includes('autonomous') || q.includes('vehicle') || q.includes('tesla') || q.includes('waymo')) {
      return knowledgeBase['autonomous vehicles'];
    }
    if (q.includes('sensor') || q.includes('see') || q.includes('detect') || q.includes('lidar') || q.includes('camera')) {
      return knowledgeBase['robot sensors'];
    }
    if (q.includes('program') || q.includes('code') || q.includes('python') || q.includes('ros')) {
      return knowledgeBase['programming robots'];
    }
    if (q.includes('ai') || q.includes('artificial') || q.includes('machine learning') || q.includes('learn')) {
      return knowledgeBase['ai robotics'];
    }
    if (q.includes('job') || q.includes('work') || q.includes('career') || q.includes('employ')) {
      return knowledgeBase['robot jobs'];
    }
    if (q.includes('ethic') || q.includes('moral') || q.includes('asimov') || q.includes('law')) {
      return knowledgeBase['robot ethics'];
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return 'Hello! How can I help you learn about robotics today? You can ask me about industrial robots, medical robotics, home automation, the future of AI, and more!';
    }
    if (q.includes('thank')) {
      return 'You\'re welcome! Feel free to ask more questions about robotics anytime. I\'m here to help!';
    }
    if (q.includes('bye') || q.includes('goodbye')) {
      return 'Goodbye! Thank you for exploring the world of robotics with me. Come back anytime you have more questions!';
    }
    
    // Default response
    return 'That\'s an interesting question! While I don\'t have specific information on that topic, I can tell you about industrial robots, medical robotics, home automation, autonomous vehicles, the future of AI, robot types, or the history of robotics. What would you like to know?';
  }
  
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    messageDiv.textContent = text;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
  }
  
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
  }
  
  function hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }
  
  function handleUserInput() {
    const text = input.value.trim();
    if (!text) return;
    
    addMessage(text, true);
    input.value = '';
    
    showTyping();
    
    setTimeout(() => {
      hideTyping();
      const answer = findAnswer(text);
      addMessage(answer);
    }, 800 + Math.random() * 500);
  }
  
  // Event listeners
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    const chatWindow = document.querySelector('.chatbot-window');
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
      input.focus();
    }
  });
  
  sendBtn.addEventListener('click', handleUserInput);
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleUserInput();
    }
  });
  
  suggestions.forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.textContent;
      handleUserInput();
    });
  });
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', initChatbot);

console.log('Robotics Website initialized successfully!');
