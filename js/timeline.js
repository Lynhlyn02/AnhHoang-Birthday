/*=========================================================
    HAPPY BIRTHDAY
    timeline.js
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================================
        DOM
    =====================================================*/

    const timelineItems = document.querySelectorAll(".timeline-item");
    const cards = document.querySelectorAll(".timeline-card");

    const dayBox = document.getElementById("days");
    const hourBox = document.getElementById("hours");
    const minuteBox = document.getElementById("minutes");
    const secondBox = document.getElementById("seconds");

    /*=====================================================
        COUNTDOWN
    =====================================================*/

    // Đổi thành ngày hai bạn bắt đầu quen nhau
    const loveDay = new Date("2026-05-14T00:00:00");

    function updateCounter() {

        const now = new Date();

        let diff = now - loveDay;

        if (diff < 0) diff = 0;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (diff % (1000 * 60 * 60))
            / (1000 * 60)
        );

        const seconds = Math.floor(
            (diff % (1000 * 60))
            / 1000
        );

        if (dayBox) dayBox.textContent = days;
        if (hourBox) hourBox.textContent = hours;
        if (minuteBox) minuteBox.textContent = minutes;
        if (secondBox) secondBox.textContent = seconds;

    }

    updateCounter();

    setInterval(updateCounter, 1000);

    /*=====================================================
        SCROLL REVEAL
    =====================================================*/

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {

        threshold: 0.2

    });

    timelineItems.forEach(item => {

        item.classList.add("reveal");

        observer.observe(item);

    });

    /*=====================================================
        PARALLAX
    =====================================================*/

    document.addEventListener("mousemove", (e) => {

        const x = (e.clientX / window.innerWidth - 0.5) * 20;

        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        cards.forEach(card => {

            card.style.transform = `
                perspective(1200px)
                rotateY(${x * 0.45}deg)
                rotateX(${-y * 0.45}deg)
            `;

        });

    });

    document.addEventListener("mouseleave", () => {

        cards.forEach(card => {

            card.style.transform = "";

        });

    });

    /*=====================================================
        FLOATING
    =====================================================*/

    cards.forEach((card, index) => {

        let direction = index % 2 === 0 ? 1 : -1;

        let offset = 0;

        function floating() {

            offset += 0.03;

            card.style.translate =
                `0 ${Math.sin(offset) * 5 * direction}px`;

            requestAnimationFrame(floating);

        }

        floating();

    });

});

/*=========================================================
    TIMELINE GLOW
=========================================================*/

const timeline = document.querySelector(".timeline");

const dots = document.querySelectorAll(".timeline-dot");

window.addEventListener("scroll", () => {

    if (!timeline) return;

    const rect = timeline.getBoundingClientRect();

    const total = timeline.offsetHeight;

    const visible = Math.min(
        total,
        Math.max(0, window.innerHeight - rect.top)
    );

    const percent = visible / total;

    timeline.style.setProperty(
        "--line-progress",
        `${percent * 100}%`
    );

    dots.forEach(dot => {

        const r = dot.getBoundingClientRect();

        if (r.top < window.innerHeight * 0.75) {

            dot.classList.add("active");

        }

    });

});


/*=========================================================
    ACTIVE CARD
=========================================================*/

window.addEventListener("scroll", () => {

    cards.forEach(card => {

        const rect = card.getBoundingClientRect();

        if (
            rect.top < window.innerHeight * 0.75 &&
            rect.bottom > 100
        ) {

            card.classList.add("show");

        }

    });

});


/*=========================================================
    AUTO GLOW CARD
=========================================================*/

setInterval(() => {

    cards.forEach(card => {

        card.classList.toggle("glow");

        setTimeout(() => {

            card.classList.remove("glow");

        }, 1200);

    });

}, 6000);


/*=========================================================
    NEXT PAGE
=========================================================*/

const nextBtn = document.getElementById("nextPage");


if(nextBtn){

    nextBtn.addEventListener("click",()=>{


        document.body.classList.add("fade-out");


        // giữ nhạc tiếp tục


        localStorage.setItem(
            "musicPlaying",
            "true"
        );


        setTimeout(()=>{


            window.location.href =
            "final.html";


        },700);


    });

}


/*=========================================================
    FLOATING PARTICLES
=========================================================*/

function createSparkle() {

    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.style.left = Math.random() * innerWidth + "px";

    sparkle.style.top = Math.random() * innerHeight + "px";

    sparkle.style.animationDuration =
        2 + Math.random() * 3 + "s";

    document.body.appendChild(sparkle);

    setTimeout(() => {

        sparkle.remove();

    }, 5000);

}

setInterval(createSparkle, 500);


/*=========================================================
    BUTTON PULSE
=========================================================*/

if (nextBtn) {

    setInterval(() => {

        nextBtn.classList.add("pulse");

        setTimeout(() => {

            nextBtn.classList.remove("pulse");

        }, 1200);

    }, 3500);

}


/*=========================================================
    PAGE LOADED
=========================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/*=========================================================
    PERFORMANCE
=========================================================*/

window.addEventListener("blur", () => {

    document.body.classList.add("pause-animation");

});

window.addEventListener("focus", () => {

    document.body.classList.remove("pause-animation");

});

