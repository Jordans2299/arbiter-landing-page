document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".fade-section").forEach((section) => {
    observer.observe(section);
  });
});

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_NQG1V-DbXHnhQqGBW5N19qsJDXakun0",
  authDomain: "arbiter-landing-page.firebaseapp.com",
  databaseURL: "https://arbiter-landing-page-default-rtdb.firebaseio.com",
  projectId: "arbiter-landing-page",
  storageBucket: "arbiter-landing-page.firebasestorage.app",
  messagingSenderId: "1081695267625",
  appId: "1:1081695267625:web:69972b1a5a29d90674e538",
  measurementId: "G-ME5YHRHJ0J"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Enhanced team member data
const teamData = {
    jordan: {
        name: "Jordan Stone",
        role: "Founder (CEO/CTO)",
        photo: "./assets/jordan-stone.jpg",
        bio: "Jordan is a full-stack software engineer with a strong foundation in mobile and backend development, holding a Computer Science degree from Washington University in St. Louis. He has experience building and optimizing production-grade iOS applications and scalable backend systems. Jordan is deeply passionate about building AI technologies that prioritize user privacy and long-term sustainability.",
        social: {
            linkedin: "https://www.linkedin.com/in/jordan-stone-051a25142/",
            email: "jordan@askarbiter.ai",
            github: "https://github.com/Jordans2299",
            website: "https://jordanstoneportfolio.com"
        }
    },
    yousef: {
        name: "Yousef Abu Salah",
        role: "Chief Design Officer (CDO)",
        photo: "./assets/yousef-abu-salah.jpg",
        bio: "Yousef leads design at Arbiter, bringing a passion for creating intuitive, accessible user experiences. His vision ensures that powerful AI capabilities remain approachable and human-centered, making advanced technology accessible to users regardless of their technical background.",
        social: {
            linkedin: "https://www.linkedin.com/in/ykabusalah",
            email: "yousef@askarbiter.ai",
            github: "https://github.com/ykabusalah",
            website: "https://ykabusalah.me"
        }
    },
    harpreet: {
        name: "Harpreet Singh",
        role: "Chief Financial Officer (CFO)",
        photo: "./assets/harpreet-singh.jpg",
        bio: "Harpreet is a Harvard graduate who brings consulting expertise and diverse perspectives to Arbiter's financial strategy. His background in consulting provides valuable insights that help guide our business decisions and ensure sustainable growth while maintaining our commitment to user privacy and data ownership.",
        social: {
            linkedin: "https://www.linkedin.com/in/harpreet-singh-4937b3163/",
            email: "harpreet@askarbiter.ai"
        }
    },
    smith: {
        name: "Smith Patel",
        role: "Chief Operating Officer (COO)",
        photo: "./assets/smith-patel.jpg",
        bio: "Smith brings operational excellence and strategic insight to Arbiter. With an engineering background from Mississippi State and a passion for technology and innovation, Smith ensures that our vision translates into practical, scalable solutions that serve our users effectively.",
        social: {
            linkedin: "https://www.linkedin.com/in/smith-patel-eit-a-m-asce-0b955714a/",
            email: "smith@askarbiter.ai"
        }
    }
};

// Slideshow data
const slideData = [
    {
        title: "Learn Something New",
        text: "Ask Arbiter about any topic, from history to science, and get detailed explanations and insights.",
    },
    {
        title: "Creative AI Conversations", 
        text: "Engage in creative writing, poetry, and artistic projects with AI models running locally on your device."
    },
    {
        title: "Save Chats Locally On Device",
        text: "All conversations are stored on your device, ensuring privacy and ownership. Search and export your chats anytime."
    },
    {
        title: "Code Generation & Learning",
        text: "Generate, review, and learn from code examples in multiple programming languages."
    },
    {
        title: "Flexible Model Management", 
        text: "Easily switch between AI models and adjust settings like temperature for different conversation styles."
    },
];

let currentSlideIndex = 0;
let slideshowInterval = null;

// Beta Modal Functions
function openBetaModal() {
    console.log('Opening beta modal');
    try {
        const modal = document.getElementById('beta-modal');
        const backdrop = document.querySelector('.modal-backdrop');
        
        if (modal && backdrop) {
            modal.classList.add('open');
            backdrop.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            
            setTimeout(function() {
                const emailInput = document.getElementById('email');
                if (emailInput) emailInput.focus();
            }, 100);
            
            console.log('Beta modal opened successfully');
        } else {
            console.error('Beta modal elements not found');
        }
    } catch (error) {
        console.error('Error opening beta modal:', error);
    }
}

function closeBetaModal() {
    console.log('Closing beta modal');
    try {
        const modal = document.getElementById('beta-modal');
        const backdrop = document.querySelector('.modal-backdrop');
        
        if (modal && backdrop) {
            modal.classList.remove('open');
            backdrop.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            console.log('Beta modal closed successfully');
        }
    } catch (error) {
        console.error('Error closing beta modal:', error);
    }
}

// Team Modal Functions
function openTeamModal(memberKey) {
    console.log('Opening team modal for:', memberKey);
    try {
        const member = teamData[memberKey];
        if (!member) {
            console.error('Team member not found:', memberKey);
            return;
        }

        const modal = document.getElementById('team-modal');
        const backdrop = document.querySelector('.modal-backdrop');
        const modalBody = document.getElementById('team-modal-body');
        
        if (modal && backdrop && modalBody) {
            // Build social links HTML
            let socialLinksHTML = '<div class="team-social-links">';
            
            if (member.social.linkedin) {
                socialLinksHTML += `
                    <a href="${member.social.linkedin}" class="social-link linkedin" target="_blank" onclick="event.stopPropagation()">
                        <div class="social-icon">💼</div>
                        <span class="social-label">LinkedIn</span>
                    </a>
                `;
            }
            
            if (member.social.email) {
                socialLinksHTML += `
                    <a href="mailto:${member.social.email}" class="social-link email" onclick="event.stopPropagation()">
                        <div class="social-icon">✉️</div>
                        <span class="social-label">Email</span>
                    </a>
                `;
            }
            
            if (member.social.github) {
                socialLinksHTML += `
                    <a href="${member.social.github}" class="social-link github" target="_blank" onclick="event.stopPropagation()">
                        <div class="social-icon">💻</div>
                        <span class="social-label">GitHub</span>
                    </a>
                `;
            }
            
            if (member.social.website) {
                socialLinksHTML += `
                    <a href="${member.social.website}" class="social-link website" target="_blank" onclick="event.stopPropagation()">
                        <div class="social-icon">🌐</div>
                        <span class="social-label">Website</span>
                    </a>
                `;
            }
            
            socialLinksHTML += '</div>';
            
            modalBody.innerHTML = `
                <img class="team-modal-photo" src="${member.photo}" alt="${member.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjYwIiBmaWxsPSIjRkFGNUZGIi8+CjxzdmcgeD0iMzYiIHk9IjM2IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJtMjAgMjEtdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+Cjwvc3ZnPgo8L3N2Zz4K';">
                <h3 class="team-modal-name">${member.name}</h3>
                <p class="team-modal-role">${member.role}</p>
                ${socialLinksHTML}
                <p class="team-modal-bio">${member.bio}</p>
            `;
            
            modal.classList.add('open');
            backdrop.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            
            console.log('Team modal opened successfully');
        } else {
            console.error('Team modal elements not found');
        }
    } catch (error) {
        console.error('Error opening team modal:', error);
    }
}

function closeTeamModal() {
    console.log('Closing team modal');
    try {
        const modal = document.getElementById('team-modal');
        const backdrop = document.querySelector('.modal-backdrop');
        
        if (modal && backdrop) {
            modal.classList.remove('open');
            backdrop.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            console.log('Team modal closed successfully');
        }
    } catch (error) {
        console.error('Error closing team modal:', error);
    }
}

function closeAllModals() {
    closeBetaModal();
    closeTeamModal();
}

// Slideshow Functions
function updateSlideshow() {
    try {
        const slides = document.getElementById('slides');
        const dots = document.querySelectorAll('.dot');
        
        if (slides) {
            const offset = -currentSlideIndex * 100;
            slides.style.transform = `translateX(${offset}%)`;
        }
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
        
        // Update caption
        const slideInfo = slideData[currentSlideIndex];
        const titleEl = document.getElementById('caption-title');
        const textEl = document.getElementById('caption-text');
        if (titleEl) titleEl.textContent = slideInfo.title;
        if (textEl) textEl.textContent = slideInfo.text;
        
    } catch (error) {
        console.error('Error updating slideshow:', error);
    }
}

function changeSlide(direction) {
    console.log('Changing slide by:', direction);
    try {
        currentSlideIndex += direction;
        
        if (currentSlideIndex >= slideData.length) {
            currentSlideIndex = 0;
        } else if (currentSlideIndex < 0) {
            currentSlideIndex = slideData.length - 1;
        }
        
        updateSlideshow();
        
        // Reset the auto-advance timer
        resetSlideshowTimer();
    } catch (error) {
        console.error('Error changing slide:', error);
    }
}

function goToSlide(index) {
    console.log('Going to slide:', index);
    try {
        currentSlideIndex = index;
        updateSlideshow();
        
        // Reset the auto-advance timer
        resetSlideshowTimer();
    } catch (error) {
        console.error('Error going to slide:', error);
    }
}

function startSlideshowTimer() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
    slideshowInterval = setInterval(function() {
        changeSlide(1);
    }, 5000);
}

function resetSlideshowTimer() {
    startSlideshowTimer();
}

function stopSlideshowTimer() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

// Firebase form submission
async function handleFormSubmit(event) {
    console.log('Form submitted');
    event.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('beta-success');
    const errorMsg = document.getElementById('beta-error');
    
    // Reset messages
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';
    
    // Disable submit button and show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
    }
    
    try {
        const formData = new FormData(event.target);
        
        // Add to Firestore
        await db.collection('beta_signups').add({
            name: formData.get('full_name'),
            email: formData.get('email'),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct'
        });
        
        // Show success message
        if (successMsg) {
            successMsg.innerHTML = '<div style="display:flex;align-items:center;gap:12px;color:#218838"><span>✓</span><span>Thank you! Your invite request has been submitted successfully. We\'ll be in touch soon!</span></div>';
            successMsg.style.display = 'block';
        }
        
        // Reset form after short delay
        setTimeout(() => {
            closeBetaModal();
            const form = document.getElementById('beta-form');
            if (form) form.reset();
        }, 2000);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        
        // Show error message
        if (errorMsg) {
            errorMsg.innerHTML = '<div style="color:#dc3545">Sorry, there was an error submitting your request. Please try again or email us directly at hello@askarbiter.ai</div>';
            errorMsg.style.display = 'block';
        }
        
        // Re-enable submit button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Request Invite';
        }
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize slideshow
    updateSlideshow();
    
    // Start auto-advance slideshow
    startSlideshowTimer();

    // Add hover listeners to pause/resume slideshow
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopSlideshowTimer);
        slideshowContainer.addEventListener('mouseleave', startSlideshowTimer);
    }

    // Parallax effect for sketches
    const sketches = document.querySelectorAll('.sketch');
    
    let ticking = false;
    
    function updateParallax() {
        try {
            const scrolled = window.pageYOffset;
            
            sketches.forEach(function(sketch, index) {
                const speed = index % 2 === 0 ? 0.15 : 0.25;
                const yPos = -(scrolled * speed);
                sketch.style.transform = `translateY(${yPos}px)`;
            });
        } catch (error) {
            console.error('Error in parallax effect:', error);
        }
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

    console.log('All functionality initialized successfully!');
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAllModals();
    }
});

// Stop slideshow when page is hidden
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopSlideshowTimer();
    } else {
        startSlideshowTimer();
    }
});

document.addEventListener('DOMContentLoaded', function() {
  try {
    var cards = document.querySelectorAll('.team-member');
    cards.forEach(function(card) {
      if (!card.querySelector('.expand-icon')) {
        var span = document.createElement('span');
        span.className = 'expand-icon';
        span.setAttribute('aria-hidden', 'true');
        span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M408 64L552 64C565.3 64 576 74.7 576 88L576 232C576 241.7 570.2 250.5 561.2 254.2C552.2 257.9 541.9 255.9 535 249L496 210L409 297C399.6 306.4 384.4 306.4 375.1 297L343.1 265C333.7 255.6 333.7 240.4 343.1 231.1L430.1 144.1L391.1 105.1C384.2 98.2 382.2 87.9 385.9 78.9C389.6 69.9 398.3 64 408 64zM232 576L88 576C74.7 576 64 565.3 64 552L64 408C64 398.3 69.8 389.5 78.8 385.8C87.8 382.1 98.1 384.2 105 391L144 430L231 343C240.4 333.6 255.6 333.6 264.9 343L296.9 375C306.3 384.4 306.3 399.6 296.9 408.9L209.9 495.9L248.9 534.9C255.8 541.8 257.8 552.1 254.1 561.1C250.4 570.1 241.7 576 232 576z"/></svg>`;
        card.appendChild(span);
      }
      // Make the whole card feel interactive
      card.style.cursor = 'pointer';
    });
  } catch (e) {
    console.error('Expand icon injection failed:', e);
  }
});

console.log('JavaScript loaded successfully!');