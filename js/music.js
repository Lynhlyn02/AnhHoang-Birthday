// =====================================
// MUSIC CONTROLLER
// Chạy nhạc xuyên suốt website
// =====================================


document.addEventListener("DOMContentLoaded", () => {


    const bgMusic =
        document.getElementById("bgMusic");


    if (!bgMusic) return;



    // Không tự reset nhạc

    bgMusic.volume = 1;



    // Lấy thời gian trước đó

    const savedTime =
        localStorage.getItem("musicTime");



    const musicStatus =
        localStorage.getItem("musicPlaying");




    // Khi nhạc load xong mới set thời gian

    bgMusic.addEventListener(
        "loadedmetadata",
        () => {


            if (savedTime) {

                bgMusic.currentTime =
                    Number(savedTime);

            }


        }
    );

    // Khi bài hát kết thúc -> phát lại từ đầu

    bgMusic.addEventListener("ended", () => {

        // Quay về đầu bài
        bgMusic.currentTime = 0;

        // Cập nhật localStorage
        localStorage.setItem("musicTime", "0");
        localStorage.setItem("musicPlaying", "true");

        // Phát lại
        bgMusic.play().catch(() => { });

    });


    // Hàm chạy nhạc

    function startMusic() {


        bgMusic.play()

            .then(() => {


                localStorage.setItem(
                    "musicPlaying",
                    "true"
                );


            })


            .catch(() => {


                console.log(
                    "Chờ người dùng tương tác"
                );


            });


    }






    // Nếu trang trước đang phát

    if (musicStatus === "true") {


        startMusic();


    }






    // Click để mở quyền phát nhạc

    document.addEventListener(
        "click",
        () => {


            if (bgMusic.paused) {

                startMusic();

            }


        },
        {
            once: true
        }
    );






    // Lưu vị trí nhạc

    bgMusic.addEventListener(
        "timeupdate",
        () => {


            localStorage.setItem(
                "musicTime",
                bgMusic.currentTime
            );


        }
    );







    // Khi phát

    bgMusic.addEventListener(
        "play",
        () => {


            localStorage.setItem(
                "musicPlaying",
                "true"
            );


        }
    );







    /*
       QUAN TRỌNG:
       Không lưu pause khi chuyển trang
       vì reload trang sẽ gây pause event
    */

    window.addEventListener(
        "beforeunload",
        () => {


            localStorage.setItem(
                "musicPlaying",
                "true"
            );


        }
    );



});