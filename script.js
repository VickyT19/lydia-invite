document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. BACKGROUND PARTICLES CANVAS
     ========================================================================== */
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }

    draw() {
      ctx.fillStyle = `rgba(255, 101, 163, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize Particles
  const particleCount = Math.min(Math.floor(window.innerWidth / 15), 60);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  /* ==========================================================================
     2. SCROLL REVEAL OBSERVER
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     3. ANIMATED WHATSAPP CHAT SEQUENCE
     ========================================================================== */
  const chatMessages = document.querySelectorAll('.reveal-msg');
  const storySection = document.getElementById('story');
  let chatAnimated = false;

  const chatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !chatAnimated) {
        chatAnimated = true;
        chatMessages.forEach((msg, index) => {
          setTimeout(() => {
            msg.classList.add('visible');
          }, index * 600); // 600ms gap between messages
        });
      }
    });
  }, { threshold: 0.3 });

  if (storySection) {
    chatObserver.observe(storySection);
  }

  /* ==========================================================================
     4. PLAYFUL "CONVINCE ME" INTERACTION
     ========================================================================== */
  const noBtn = document.getElementById('noBtn');
  const convinceContainer = document.getElementById('convinceContainer');
  const convinceText = document.getElementById('convinceText');
  const declineNotice = document.getElementById('declineNotice');

  const convinceSteps = [
    "Wait… already? 😭",
    "Lydia, hear me out 😌",
    "Final argument… 🎤😂"
  ];

  let clickCount = 0;

  noBtn.addEventListener('click', () => {
    if (clickCount < convinceSteps.length) {
      convinceContainer.classList.remove('hidden');
      convinceText.textContent = convinceSteps[clickCount];
      
      // Shake effect
      noBtn.style.transform = 'translateX(5px)';
      setTimeout(() => noBtn.style.transform = 'translateX(-5px)', 50);
      setTimeout(() => noBtn.style.transform = 'translateX(0)', 100);

      clickCount++;

      if (clickCount === convinceSteps.length) {
        noBtn.textContent = "Okay fine, tell me more 😂";
      }
    } else {
      // Respectful decline option after playful teasing
      convinceContainer.classList.add('hidden');
      noBtn.classList.add('hidden');
      declineNotice.classList.remove('hidden');
    }
  });

  /* ==========================================================================
     5. YES BUTTON & CONFETTI MODAL
     ========================================================================== */
  const yesBtn = document.getElementById('yesBtn');
  const successModal = document.getElementById('successModal');
  const closeModal = document.getElementById('closeModal');

  yesBtn.addEventListener('click', () => {
    successModal.classList.remove('hidden');
    triggerConfetti();
  });

  closeModal.addEventListener('click', () => {
    successModal.classList.add('hidden');
  });

  /* Simple Canvas Confetti */
  const confettiCanvas = document.getElementById('confettiCanvas');
  const cCtx = confettiCanvas.getContext('2d');
  let confettiPieces = [];

  function triggerConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    confettiPieces = [];

    for (let i = 0; i < 80; i++) {
      confettiPieces.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height - confettiCanvas.height,
        color: ['#ff65a3', '#9d4edd', '#4ea8de', '#ffd166'][Math.floor(Math.random() * 4)],
        size: Math.random() * 8 + 4,
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1
      });
    }
    animateConfetti();
  }

  function animateConfetti() {
    cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let active = false;

    confettiPieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      cCtx.fillStyle = p.color;
      cCtx.fillRect(p.x, p.y, p.size, p.size);

      if (p.y < confettiCanvas.height) active = true;
    });

    if (active) {
      requestAnimationFrame(animateConfetti);
    }
  }

  /* ==========================================================================
     6. AMBIENT BACKGROUND MUSIC CONTROLLER
     ========================================================================== */
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const bgAudio = document.getElementById('bgAudio');
  let isPlaying = false;
  let synthAudioCtx = null;
  let synthOscillators = [];

  // Dual approach: Try audio file first, fallback to synthesized calm chord generator
  musicToggleBtn.addEventListener('click', () => {
    if (!isPlaying) {
      bgAudio.play().then(() => {
        isPlaying = true;
        musicToggleBtn.classList.add('playing');
        musicToggleBtn.querySelector('.music-text').textContent = 'Playing ♫';
      }).catch(() => {
        // Audio file missing or failed -> fallback to Web Audio API ambient synth
        startSynthesizedAmbient();
        isPlaying = true;
        musicToggleBtn.classList.add('playing');
        musicToggleBtn.querySelector('.music-text').textContent = 'Playing ♫';
      });
    } else {
      bgAudio.pause();
      stopSynthesizedAmbient();
      isPlaying = false;
      musicToggleBtn.classList.remove('playing');
      musicToggleBtn.querySelector('.music-text').textContent = 'Music';
    }
  });

  function startSynthesizedAmbient() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    synthAudioCtx = new AudioContext();

    // Calm ambient Fmaj7 / Cmaj7 chord frequencies
    const freqs = [174.61, 220.00, 261.63, 329.63]; 
    
    freqs.forEach(freq => {
      const osc = synthAudioCtx.createOscillator();
      const gain = synthAudioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, synthAudioCtx.currentTime);

      gain.gain.setValueAtTime(0.02, synthAudioCtx.currentTime);

      osc.connect(gain);
      gain.connect(synthAudioCtx.destination);

      osc.start();
      synthOscillators.push(osc);
    });
  }

  function stopSynthesizedAmbient() {
    synthOscillators.forEach(osc => {
      try { osc.stop(); } catch(e) {}
    });
    synthOscillators = [];
    if (synthAudioCtx) {
      synthAudioCtx.close();
      synthAudioCtx = null;
    }
  }
});
