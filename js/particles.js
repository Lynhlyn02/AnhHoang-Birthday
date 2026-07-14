/* ==========================================================
   Happy Birthday Website
   Particles Background
   Part 1
   Canvas + Stars
========================================================== */

const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

// =========================
// Canvas Size
// =========================

function resizeCanvas() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// =========================
// Mouse
// =========================

const mouse = {

    x: window.innerWidth / 2,

    y: window.innerHeight / 2

};

window.addEventListener("mousemove", (e) => {

    mouse.x = e.clientX;

    mouse.y = e.clientY;

});

// =========================
// Random
// =========================

function random(min, max) {

    return Math.random() * (max - min) + min;

}

// =========================
// Star Class
// =========================

class Star {

    constructor() {

        this.reset();

    }

    reset() {

        this.baseX = random(0, canvas.width);

        this.baseY = random(0, canvas.height);

        this.x = this.baseX;

        this.y = this.baseY;

        this.radius = random(0.5, 2.8);

        this.alpha = random(0.2, 1);

        this.twinkleSpeed = random(0.01, 0.04);

        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;

        this.dx = random(-0.03, 0.03);

        this.dy = random(-0.03, 0.03);

        this.depth = random(10, 80);

    }

    update() {

        // chuyển động rất nhẹ

        this.baseX += this.dx;

        this.baseY += this.dy;

        if (this.baseX < 0) this.baseX = canvas.width;
        if (this.baseX > canvas.width) this.baseX = 0;

        if (this.baseY < 0) this.baseY = canvas.height;
        if (this.baseY > canvas.height) this.baseY = 0;

        // hiệu ứng nhấp nháy

        this.alpha += this.twinkleSpeed * this.twinkleDirection;

        if (this.alpha >= 1) {

            this.alpha = 1;

            this.twinkleDirection = -1;

        }

        if (this.alpha <= 0.2) {

            this.alpha = 0.2;

            this.twinkleDirection = 1;

        }

        // Parallax

        const offsetX =
            (mouse.x - canvas.width / 2) / this.depth;

        const offsetY =
            (mouse.y - canvas.height / 2) / this.depth;

        this.x = this.baseX + offsetX;

        this.y = this.baseY + offsetY;

    }

    draw() {

        ctx.save();

        ctx.beginPath();

        ctx.arc(

            this.x,

            this.y,

            this.radius,

            0,

            Math.PI * 2

        );

        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;

        ctx.shadowBlur = this.radius * 10;

        ctx.shadowColor = "#ffffff";

        ctx.fill();

        ctx.restore();

    }

}

// =========================
// Create Stars
// =========================

/* ===========================================
   Shooting Star
=========================================== */

class ShootingStar {

    constructor() {

        this.reset(true);

    }

    reset(firstTime = false) {

        this.x = random(0, canvas.width);

        this.y = random(0, canvas.height * 0.35);

        this.length = random(180, 320);

        this.speed = random(12, 20);

        this.size = random(2, 3);

        this.opacity = random(0.7, 1);

        this.active = !firstTime;

        this.wait = random(1000, 6000);

        if (firstTime) {

            setTimeout(() => {

                this.active = true;

            }, this.wait);

        }

    }

    update() {

        if (!this.active) return;

        this.x += this.speed;

        this.y += this.speed * 0.35;

        if (

            this.x > canvas.width + this.length ||

            this.y > canvas.height * 0.8

        ) {

            this.active = false;

            setTimeout(() => {

                this.reset();

                this.active = true;

            }, random(2000, 7000));

        }

    }

    draw() {

        if (!this.active) return;

        ctx.save();

        const gradient = ctx.createLinearGradient(

            this.x,

            this.y,

            this.x - this.length,

            this.y - this.length * 0.35

        );

        gradient.addColorStop(0, `rgba(255,255,255,${this.opacity})`);

        gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");

        gradient.addColorStop(0.6, "rgba(150,200,255,0.3)");

        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = gradient;

        ctx.lineWidth = this.size;

        ctx.shadowBlur = 25;

        ctx.shadowColor = "white";

        ctx.beginPath();

        ctx.moveTo(this.x, this.y);

        ctx.lineTo(

            this.x - this.length,

            this.y - this.length * 0.35

        );

        ctx.stroke();

        ctx.restore();

    }

}

const stars = [];

const shootingStars = [];

for (let i = 0; i < 3; i++) {

    shootingStars.push(new ShootingStar());

}

const STAR_COUNT =
    window.innerWidth < 768 ? 120 : 280;

for (let i = 0; i < STAR_COUNT; i++) {

    stars.push(new Star());

}

// =========================
// Draw Background
// =========================

function drawSky() {

    const gradient = ctx.createLinearGradient(

        0,

        0,

        0,

        canvas.height

    );

    gradient.addColorStop(0, "#1f2d63");

    gradient.addColorStop(0.35, "#10162f");

    gradient.addColorStop(0.7, "#050814");

    gradient.addColorStop(1, "#000000");

    ctx.fillStyle = gradient;

    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

}

function drawNebula() {

    const g = ctx.createRadialGradient(

        canvas.width / 2,

        canvas.height / 2,

        100,

        canvas.width / 2,

        canvas.height / 2,

        canvas.width

    );

    g.addColorStop(0,

        "rgba(255,120,220,0.06)");

    g.addColorStop(0.5,

        "rgba(120,150,255,0.03)");

    g.addColorStop(1,

        "rgba(0,0,0,0)");

    ctx.fillStyle = g;

    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

}

// =========================
// Animation
// =========================

function animate() {

    drawSky();

    drawNebula();

    // Stars

    for (const star of stars) {

        star.update();

        star.draw();

    }

    // Shooting Stars

    for (const shootingStar of shootingStars) {

        shootingStar.update();

        shootingStar.draw();

    }

    requestAnimationFrame(animate);

}

animate();

let animationId;

function startAnimation() {

    cancelAnimationFrame(animationId);

    function loop() {

        drawSky();

        drawNebula();

        for (const star of stars) {

            star.update();

            star.draw();

        }

        for (const shootingStar of shootingStars) {

            shootingStar.update();

            shootingStar.draw();

        }

        animationId = requestAnimationFrame(loop);

    }

    loop();

}

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        cancelAnimationFrame(animationId);

    } else {

        startAnimation();

    }

});

startAnimation();
