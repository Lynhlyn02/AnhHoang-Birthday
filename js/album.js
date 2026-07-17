/* ==========================================================
   HAPPY BIRTHDAY
   album.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
        ELEMENTS
    ==============================*/

    const photos = document.querySelectorAll(".photo img");

    const lightbox = document.getElementById("lightbox");

    const lightboxImg = document.getElementById("lightboxImg");

    const closeBtn = document.getElementById("close");

    const nextButton = document.getElementById("nextPage");

    let currentIndex = 0;

    /*==============================
        PRELOAD
    ==============================*/

    photos.forEach(img => {
        img.loading = "lazy";
    });

    /*==============================
        OPEN LIGHTBOX
    ==============================*/

    function openLightbox(index) {

        currentIndex = index;

        lightbox.style.display = "flex";

        lightbox.style.opacity = "0";

        lightboxImg.src = photos[index].src;

        lightboxImg.style.transform = "scale(.85)";

        requestAnimationFrame(() => {

            lightbox.style.transition = "opacity .35s";

            lightbox.style.opacity = "1";

            lightboxImg.style.transition = ".35s";

            lightboxImg.style.transform = "scale(1)";

        });

        document.body.style.overflow = "hidden";

    }

    /*==============================
        CLOSE
    ==============================*/

    function closeLightbox() {

        lightbox.style.opacity = "0";

        lightboxImg.style.transform = "scale(.85)";

        setTimeout(() => {

            lightbox.style.display = "none";

            document.body.style.overflow = "auto";

        }, 300);

    }

    /*==============================
        NEXT
    ==============================*/

    function nextImage() {

        currentIndex++;

        if (currentIndex >= photos.length) {

            currentIndex = 0;

        }

        lightboxImg.style.opacity = "0";

        setTimeout(() => {

            lightboxImg.src = photos[currentIndex].src;

            lightboxImg.style.opacity = "1";

        }, 150);

    }

    /*==============================
        PREVIOUS
    ==============================*/

    function previousImage() {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex = photos.length - 1;

        }

        lightboxImg.style.opacity = "0";

        setTimeout(() => {

            lightboxImg.src = photos[currentIndex].src;

            lightboxImg.style.opacity = "1";

        }, 150);

    }

    /*==============================
        CLICK IMAGE
    ==============================*/

    photos.forEach((img, index) => {

        img.addEventListener("click", () => {

            openLightbox(index);

        });

    });

    /*==============================
        CLOSE BUTTON
    ==============================*/

    closeBtn.addEventListener("click", closeLightbox);

    /*==============================
        CLICK BACKGROUND
    ==============================*/

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            closeLightbox();

        }

    });

    /*==============================
        KEYBOARD
    ==============================*/

    document.addEventListener("keydown", (e) => {

        if (lightbox.style.display !== "flex") return;

        switch (e.key) {

            case "Escape":
                closeLightbox();
                break;

            case "ArrowRight":
                nextImage();
                break;

            case "ArrowLeft":
                previousImage();
                break;

        }

    });

    /*==============================
        PRELOAD NEXT IMAGE
    ==============================*/

    function preload(index) {

        const image = new Image();

        image.src = photos[index].src;

    }

    photos.forEach((_, i) => {

        preload(i);

    });

    /*==============================
        CARD 3D
    ==============================*/

    document.querySelectorAll(".photo").forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - .5) * 12;

            const rotateX = ((y / rect.height) - .5) * -12;

            card.style.transform =

                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.04)
                `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

    /*==============================
        NEXT PAGE
    ==============================*/

    nextButton.addEventListener("click", () => {

        document.body.animate([

            {

                opacity: 1,

                transform: "scale(1)"

            },

            {

                opacity: 0,

                transform: "scale(.95)"

            }

        ], {

            duration: 800,

            fill: "forwards",

            easing: "ease"

        });

        setTimeout(() => {

            window.location.href = "memories.html";

        }, 800);

    });

});

/*==============================
    SLIDESHOW
==============================*/

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index) {

    slides.forEach(slide => {

        slide.classList.remove("active");

    });

    slides[index].classList.add("active");

}

setInterval(() => {

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    showSlide(currentSlide);

}, 1000);

