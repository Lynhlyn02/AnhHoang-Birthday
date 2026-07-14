/*
=========================================
    Floating Hearts
=========================================
*/

const heartContainer = document.getElementById("heart-container");

const HEART_SYMBOLS = [
    "❤",
    "♥",
    "💖",
    "💕",
    "💗",
    "💓",
    "💞"
];

const HEART_COLORS = [
    "#ff4d6d",
    "#ff5fa2",
    "#ff80bf",
    "#ff99cc",
    "#ff66b3",
    "#ff1493",
    "#ff69b4"
];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function createHeart() {

    const heart = document.createElement("span");

    heart.className = "floating-heart";

    heart.innerHTML = randomItem(HEART_SYMBOLS);

    const size = random(16, 42);

    const left = random(0, window.innerWidth);

    const duration = random(8, 15);

    const delay = random(0, 2);

    const rotate = random(-40, 40);

    const opacity = random(.4, 1);

    heart.style.left = left + "px";

    heart.style.bottom = "-60px";

    heart.style.fontSize = size + "px";

    heart.style.color = randomItem(HEART_COLORS);

    heart.style.opacity = opacity;

    heart.style.animationDuration = duration + "s";

    heart.style.animationDelay = delay + "s";

    heart.style.setProperty("--rotate", rotate + "deg");

    heart.style.setProperty("--drift", random(-120, 120) + "px");

    heartContainer.appendChild(heart);

    heart.addEventListener("animationend", () => {

        heart.remove();

    });

}

/*
=========================================
    Spawn Hearts
=========================================
*/

setInterval(() => {

    createHeart();

}, 350);

/*
=========================================
    First Hearts
=========================================
*/

for (let i = 0; i < 20; i++) {

    setTimeout(createHeart, i * 150);

}