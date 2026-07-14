/* ==========================================================
   HAPPY BIRTHDAY
   memories.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /*==================================
        ELEMENTS
    ==================================*/

    const cards = document.querySelectorAll(".memory-card");
    const nextButton = document.getElementById("nextPage");
    const overlay = document.querySelector(".overlay");

    /*==================================
        SCROLL REVEAL
    ==================================*/

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.style.transition =
                    "all .9s cubic-bezier(.22,.61,.36,1)";

            }

        });

    }, {
        threshold: 0.15
    });

    cards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(80px)";

        observer.observe(card);

    });

    /*==================================
        3D TILT
    ==================================*/

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 14;
            const rotateX = ((y / rect.height) - 0.5) * -14;

            card.style.transform = `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)
                scale(1.03)
            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

    /*==================================
        IMAGE HOVER
    ==================================*/

    document.querySelectorAll(".memory-image img").forEach(img => {

        img.addEventListener("mouseenter", () => {

            img.style.transform = "scale(1.08)";

        });

        img.addEventListener("mouseleave", () => {

            img.style.transform = "";

        });

    });

    /*==================================
        PARALLAX
    ==================================*/

    window.addEventListener("scroll", () => {

        const y = window.scrollY;

        if (overlay) {

            overlay.style.transform =
                `translateY(${y * 0.12}px)`;

        }

    });

    /*==================================
        BUTTON GLOW
    ==================================*/

    if (nextButton) {

        setInterval(() => {

            nextButton.animate([
                {
                    transform: "scale(1)"
                },
                {
                    transform: "scale(1.05)"
                },
                {
                    transform: "scale(1)"
                }

            ], {

                duration: 1800

            });

        }, 2500);

    }

    /*==================================
        NEXT PAGE
    ==================================*/

    if (nextButton) {

        nextButton.addEventListener("click", () => {

            document.body.animate([

                {
                    opacity: 1,
                    transform: "scale(1)"
                },

                {
                    opacity: 0,
                    transform: "scale(.96)"
                }

            ], {

                duration: 700,
                easing: "ease",
                fill: "forwards"

            });

            setTimeout(() => {

                window.location.href = "letter.html";

            }, 700);

        });

    }

});