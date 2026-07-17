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

        "🎂 Chúc mừng sinh nhật tuổi 22 của anh yêu! ❤️",

        "18/07 là một ngày thật đặc biệt, vì đó là ngày chàng trai em yêu nhất được sinh ra.",

        "Cảm ơn anh đã đến, yêu thương và mang đến cho em thật nhiều hạnh phúc.",

        "Ở bên anh, mỗi ngày đều trở nên ý nghĩa và tràn ngập những điều ấm áp.",

        "Tuổi mới, em chỉ mong anh luôn mạnh khỏe, bình an và gặp thật nhiều may mắn.",

        "Chúc mọi ước mơ, dự định của anh đều thành hiện thực và nụ cười sẽ luôn ở trên môi.",

        "Dù sau này có chuyện gì xảy ra, em vẫn mong chúng mình sẽ luôn nắm chặt tay nhau.",

        "Cảm ơn anh vì đã là món quà tuyệt vời nhất mà cuộc sống dành tặng cho em.",

        "Yêu anh hôm nay, ngày mai và cả những ngày sau nữa. ❤️",

        "Chúc mừng sinh nhật anh yêu! Happy Birthday! 🎉🎂❤️"

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