/* ==========================================================
   HAPPY BIRTHDAY
   letter.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const envelope = document.getElementById("envelope");
    const envelopeTop = document.querySelector(".envelope-top");
    const paper = document.getElementById("letterPaper");
    const openBtn = document.getElementById("openLetter");
    const typingBox = document.getElementById("typingText");
    const nextBtn = document.getElementById("nextPage");

    // Ẩn nút tiếp tục
    if (nextBtn) {
        nextBtn.style.opacity = "0";
        nextBtn.style.pointerEvents = "none";
        nextBtn.style.transition = "0.8s";
    }

    const letterLines = [

        "Chúc mừng sinh nhật anh yêu ❤️",

        "Hôm nay là một ngày thật đặc biệt đối với anh và cũng là một ngày rất ý nghĩa đối với em.",

        "Cảm ơn anh vì đã xuất hiện trong cuộc đời em.",

        "Cảm ơn anh vì luôn yêu thương, quan tâm và ở bên em mỗi ngày.",

        "Anh chính là món quà đẹp nhất mà cuộc sống đã dành tặng cho em.",

        "Ở bên anh, em luôn cảm thấy bình yên, hạnh phúc và được yêu thương.",

        "Tuổi mới em chỉ mong anh luôn mạnh khỏe, vui vẻ và gặp thật nhiều may mắn.",

        "Chúc anh đạt được mọi ước mơ, mọi dự định và luôn giữ nụ cười trên môi.",

        "Hy vọng chúng ta sẽ luôn nắm tay nhau thật lâu, cùng nhau đi qua mọi chặng đường phía trước.",

        "Em yêu anh rất nhiều ❤️",

        "Happy Birthday 🎂"

    ];

    async function write(box, lines) {

        for (const text of lines) {

            const div = document.createElement("div");

            div.className = "line";

            div.textContent = text || " ";

            box.appendChild(div);

            await new Promise(r => setTimeout(r, 30));

            div.classList.add("show");

            await new Promise(r => setTimeout(r, 700));

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

            await write(typingBox, letterLines);

            nextBtn.style.opacity = "1";

            nextBtn.style.pointerEvents = "auto";

        }, 800);

    });

});