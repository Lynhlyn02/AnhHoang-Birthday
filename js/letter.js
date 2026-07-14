/* ==========================================================
   HAPPY BIRTHDAY
   letter.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const envelope = document.getElementById("envelope");
    const envelopeTop = document.querySelector(".envelope-top");
    const paper = document.getElementById("letterPaper");
    const openBtn = document.getElementById("openLetter");
    const leftBox = document.getElementById("typingLeft");
    const rightBox = document.getElementById("typingRight");
    const nextBtn = document.getElementById("nextPage");

    // Ẩn nút tiếp tục
    if (nextBtn) {
        nextBtn.style.opacity = "0";
        nextBtn.style.pointerEvents = "none";
        nextBtn.style.transition = "0.8s";
    }

    const leftLines = [

        "Chúc mừng sinh nhật anh yêu ❤️",


        "Hôm nay là một ngày thật đặc biệt.",


        "Cảm ơn anh vì đã luôn ở bên em.",

        "Cảm ơn anh vì luôn yêu thương em.",


        "Anh là điều tuyệt vời",

        "mà cuộc sống đã mang đến.",


        "Em luôn trân trọng",

        "mọi khoảnh khắc của chúng ta."

    ];

    const rightLines = [

        "Em mong tuổi mới",

        "sẽ mang đến cho anh thật nhiều sức khỏe.",


        "Thật nhiều thành công.",


        "Thật nhiều niềm vui.",


        "Hy vọng chúng ta",

        "sẽ luôn nắm tay nhau đi thật xa.",


        "Em yêu anh rất nhiều ❤️",


        "Happy Birthday 🎂"

    ];

    async function write(box, lines) {

        for (const text of lines) {

            const div = document.createElement("div");

            div.className = "line";

            div.textContent = text || " ";

            box.appendChild(div);

            await new Promise(r => setTimeout(r, 100));

            div.classList.add("show");

            await new Promise(r => setTimeout(r, 2300));

            div.classList.add("finish");

        }

    }

    let opened = false;

    openBtn.addEventListener("click", async () => {

        if (opened) return;

        opened = true;

        // Mở nắp

        envelopeTop.style.transform = "rotateX(180deg)";

        // Sau 0.8s phong bì biến mất

        setTimeout(() => {

            envelope.style.opacity = "0";

            envelope.style.transform = "translateY(-120px) scale(.6)";

            envelope.style.pointerEvents = "none";

        }, 800);

        // Hiện lá thư

        setTimeout(async () => {

            paper.classList.add("show");

            await write(leftBox, leftLines);

            await write(rightBox, rightLines);

            nextBtn.style.opacity = "1";

            nextBtn.style.pointerEvents = "auto";

        }, 800);

    });

});