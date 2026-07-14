/*================================================

    HAPPY BIRTHDAY WEBSITE
    MAIN.JS

================================================*/


document.addEventListener("DOMContentLoaded", () => {


    /*====================================
        ELEMENT
    ====================================*/


    const loadingScreen =
        document.getElementById(
            "loading-screen"
        );


    const progress =
        document.querySelector(
            ".progress"
        );


    const loadingText =
        document.getElementById(
            "loading-text"
        );


    const mainContent =
        document.getElementById(
            "main-content"
        );


    const startButton =
        document.getElementById(
            "startButton"
        );


    const music =
        document.getElementById(
            "bgMusic"
        );



    /*====================================
        CHECK PARTICLES
    ====================================*/


    function checkParticles() {


        const canvas =
            document.getElementById(
                "starCanvas"
            );


        if (canvas) {

            console.log(
                "✨ Particle background loaded"
            );


        } else {


            console.warn(
                "⚠ Không tìm thấy starCanvas"
            );


        }


    }


    checkParticles();





    /*====================================
        LOADING MESSAGE
    ====================================*/


    const messages = [

        "Đang chuẩn bị điều bất ngờ... ❤️",

        "Đang thắp sáng bầu trời sao... ✨",

        "Đang tạo những vì sao lung linh... 🌌",

        "Đang gửi những yêu thương... 💖",

        "Hoàn thành món quà rồi... 🎁"

    ];



    let percent = 0;

    let messageIndex = 0;




    /*====================================
        LOADING PROCESS
    ====================================*/


    const loadingTimer = setInterval(() => {


        percent++;


        if (progress) {

            progress.style.width =
                percent + "%";

        }



        if (

            percent % 20 === 0
            &&
            messageIndex < messages.length - 1

        ) {


            messageIndex++;


            loadingText.innerHTML =
                messages[messageIndex];


        }




        if (percent >= 100) {


            clearInterval(
                loadingTimer
            );


            finishLoading();


        }



    }, 40);





    /*====================================
        FINISH LOADING
    ====================================*/


    function finishLoading() {



        loadingScreen.style.opacity = "0";



        setTimeout(() => {


            loadingScreen.style.display = "none";



            document.body.style.overflow =
                "auto";



            mainContent.style.display =
                "flex";



            mainContent.classList.add(
                "show"
            );



        }, 1200);



    }





    /*====================================
        START BUTTON
    ====================================*/


    let clicked = false;



    if (startButton) {


        startButton.addEventListener(
            "click",

            () => {


                if (clicked)
                    return;


                clicked = true;




                // phát nhạc


                if (music) {


                    music.volume = 0.5;


                    music.play()
                        .catch(() => { });


                }




                // hiệu ứng chuyển trang


                document.body.classList.add(
                    "page-leave"
                );



                setTimeout(() => {


                    window.location.href =
                        "album.html";


                }, 1200);



            });


    }





    /*====================================
        ENTER KEY
    ====================================*/


    document.addEventListener(
        "keydown",

        (e) => {


            if (e.key === "Enter") {


                if (startButton) {

                    startButton.click();

                }


            }



        });



});