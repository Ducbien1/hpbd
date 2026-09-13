/**
 * Romantic Ambient Canvas Background
 * Starfield, soft glowing bokeh lights, and shooting stars
 */

class RomanticBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.bokehs = [];
    this.shootingStars = [];
    this.numStars = 85;
    this.numBokehs = 25;
    this.lastShootingStarTime = 0;
    this.shootingStarInterval = 4000 + Math.random() * 3000;
    this.mouse = { x: null, y: null, targetX: 0, targetY: 0 };
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.isRunning = true;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Gentle touch / mouse parallax
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 20;
      this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 20;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 15;
        this.mouse.targetY = (e.touches[0].clientY / window.innerHeight - 0.5) * 15;
      }
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      this.isRunning = !document.hidden;
      if (this.isRunning) this.animate(performance.now());
    });

    this.createElements();
    this.animate(performance.now());
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.pixelRatio;
    this.canvas.height = this.height * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  createElements() {
    this.stars = [];
    this.bokehs = [];

    // Twinkling stars
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
        color: ['#ffffff', '#ffd1dc', '#fff0b3', '#d8b4fe'][Math.floor(Math.random() * 4)]
      });
    }

    // Soft glowing bokeh particles
    for (let i = 0; i < this.numBokehs; i++) {
      this.bokehs.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 25 + 10,
        vy: -(Math.random() * 0.35 + 0.15),
        vx: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.25 + 0.08,
        color: ['rgba(255, 117, 143, ', 'rgba(255, 190, 11, ', 'rgba(168, 85, 247, ', 'rgba(247, 215, 148, '][Math.floor(Math.random() * 4)],
        pulse: Math.random() * Math.PI,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }
  }

  spawnShootingStar() {
    const startX = Math.random() * (this.width * 0.8) + (this.width * 0.1);
    const startY = Math.random() * (this.height * 0.3);
    const length = Math.random() * 120 + 80;
    const speed = Math.random() * 10 + 12;
    const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3; // roughly 45 degrees down-right

    this.shootingStars.push({
      x: startX,
      y: startY,
      len: length,
      speed: speed,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      alpha: 1,
      decay: Math.random() * 0.02 + 0.015,
      trail: []
    });
  }

  animate(now) {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Subtle parallax easing
    const currentMouseX = (this.mouse.x || 0) + (this.mouse.targetX - (this.mouse.x || 0)) * 0.05;
    const currentMouseY = (this.mouse.y || 0) + (this.mouse.targetY - (this.mouse.y || 0)) * 0.05;
    this.mouse.x = currentMouseX;
    this.mouse.y = currentMouseY;

    // 1. Draw Stars
    for (let star of this.stars) {
      star.alpha += star.twinkleSpeed * star.twinkleDir;
      if (star.alpha > 0.95) {
        star.alpha = 0.95;
        star.twinkleDir = -1;
      } else if (star.alpha < 0.15) {
        star.alpha = 0.15;
        star.twinkleDir = 1;
      }

      this.ctx.save();
      this.ctx.globalAlpha = star.alpha;
      this.ctx.fillStyle = star.color;
      this.ctx.shadowColor = star.color;
      this.ctx.shadowBlur = 4;
      this.ctx.beginPath();
      this.ctx.arc(star.x + currentMouseX * 0.2, star.y + currentMouseY * 0.2, star.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Draw Bokeh Lights
    for (let b of this.bokehs) {
      b.y += b.vy;
      b.x += b.vx;
      b.pulse += b.pulseSpeed;

      if (b.y < -b.radius * 2) {
        b.y = this.height + b.radius * 2;
        b.x = Math.random() * this.width;
      }

      const dynamicAlpha = b.alpha * (0.8 + 0.2 * Math.sin(b.pulse));
      const grad = this.ctx.createRadialGradient(
        b.x + currentMouseX * 0.5, b.y + currentMouseY * 0.5, 0,
        b.x + currentMouseX * 0.5, b.y + currentMouseY * 0.5, b.radius
      );
      grad.addColorStop(0, `${b.color}${dynamicAlpha})`);
      grad.addColorStop(0.6, `${b.color}${dynamicAlpha * 0.4})`);
      grad.addColorStop(1, `${b.color}0)`);

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(b.x + currentMouseX * 0.5, b.y + currentMouseY * 0.5, b.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // 3. Draw & update Shooting Stars
    if (now - this.lastShootingStarTime > this.shootingStarInterval) {
      this.spawnShootingStar();
      this.lastShootingStarTime = now;
      this.shootingStarInterval = 4000 + Math.random() * 4000;
    }

    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const ss = this.shootingStars[i];
      ss.x += ss.dx;
      ss.y += ss.dy;
      ss.alpha -= ss.decay;

      if (ss.alpha <= 0 || ss.x > this.width || ss.y > this.height) {
        this.shootingStars.splice(i, 1);
        continue;
      }

      const tailX = ss.x - ss.dx * 3;
      const tailY = ss.y - ss.dy * 3;

      const grad = this.ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${ss.alpha})`);
      grad.addColorStop(0.3, `rgba(255, 215, 140, ${ss.alpha * 0.7})`);
      grad.addColorStop(1, 'rgba(255, 182, 193, 0)');

      this.ctx.save();
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      this.ctx.beginPath();
      this.ctx.moveTo(ss.x, ss.y);
      this.ctx.lineTo(tailX, tailY);
      this.ctx.stroke();

      // Head glow
      this.ctx.fillStyle = `rgba(255, 255, 255, ${ss.alpha})`;
      this.ctx.shadowColor = '#fff';
      this.ctx.shadowBlur = 6;
      this.ctx.beginPath();
      this.ctx.arc(ss.x, ss.y, 1.5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame((t) => this.animate(t));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new RomanticBackground('bg-canvas');
});
