/*==========================================================
    HAPPY BIRTHDAY
    FIREWORKS EFFECT
    fireworks.js
==========================================================*/


document.addEventListener("DOMContentLoaded", () => {


    const canvas = document.getElementById("fireworksCanvas");


    if (!canvas) return;



    const ctx = canvas.getContext("2d");



    let width;

    let height;



    function resize() {


        width = canvas.width = window.innerWidth;


        height = canvas.height = window.innerHeight;


    }


    resize();



    window.addEventListener(
        "resize",
        resize
    );



    /*==========================================================
        CONFIG
    ==========================================================*/


    const fireworks = [];

    const particles = [];



    const colors = [

        "#ff4da6",

        "#ff80d8",

        "#ffffff",

        "#ffd700",

        "#00ffff",

        "#9b5cff",

        "#ff5f5f"

    ];



    function random(min, max) {

        return Math.random() * (max - min) + min;

    }



    function randomColor() {

        return colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];

    }



    /*==========================================================
        ROCKET
    ==========================================================*/


    class Firework {


        constructor() {


            this.x = random(
                width * .15,
                width * .85
            );


            this.y = height;


            this.targetY = random(
                height * .15,
                height * .45
            );


            this.speed = random(
                6,
                10
            );


            this.color = randomColor();


            this.radius = 3;


            this.exploded = false;


        }



        update() {


            this.y -= this.speed;



            if (this.y <= this.targetY) {


                this.explode();


                this.exploded = true;


            }


        }



        draw() {


            ctx.beginPath();


            ctx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle = this.color;


            ctx.shadowBlur = 20;


            ctx.shadowColor = this.color;


            ctx.fill();



        }



        explode() {


            const count =
                window.innerWidth < 600
                    ? 40
                    : 80;



            for (let i = 0; i < count; i++) {


                particles.push(
                    new Particle(
                        this.x,
                        this.y,
                        this.color
                    )
                );


            }


        }


    }



    /*==========================================================
        PARTICLE
    ==========================================================*/


    class Particle {


        constructor(x, y, color) {


            this.x = x;


            this.y = y;


            this.color = color;



            const angle =
                Math.random() * Math.PI * 2;



            const speed =
                random(
                    2,
                    7
                );



            this.velocity = {

                x:
                    Math.cos(angle) * speed,


                y:
                    Math.sin(angle) * speed

            };



            this.alpha = 1;


            this.gravity = .05;


            this.friction = .98;


            this.size = random(
                1,
                3
            );

        }




        update() {



            this.velocity.x *= this.friction;


            this.velocity.y *= this.friction;



            this.velocity.y += this.gravity;



            this.x += this.velocity.x;


            this.y += this.velocity.y;



            this.alpha -= .015;



        }





        draw() {



            ctx.save();



            ctx.globalAlpha = this.alpha;



            ctx.beginPath();



            ctx.arc(

                this.x,

                this.y,

                this.size,

                0,

                Math.PI * 2

            );



            ctx.fillStyle = this.color;



            ctx.shadowBlur = 15;


            ctx.shadowColor = this.color;



            ctx.fill();



            ctx.restore();



        }


    }



    /*==========================================================
        CREATE FIREWORK
    ==========================================================*/


    function createFirework() {


        fireworks.push(
            new Firework()
        );


    }



    /*==========================================================
        LOOP
    ==========================================================*/


    function animate() {



        requestAnimationFrame(
            animate
        );



        ctx.fillStyle =
            "rgba(2,4,13,.25)";



        ctx.fillRect(
            0,
            0,
            width,
            height
        );



        fireworks.forEach(
            (firework, index) => {


                firework.update();


                firework.draw();



                if (firework.exploded) {


                    fireworks.splice(
                        index,
                        1
                    );


                }


            });



        particles.forEach(
            (particle, index) => {


                particle.update();


                particle.draw();



                if (particle.alpha <= 0) {


                    particles.splice(
                        index,
                        1
                    );


                }


            });



    }



    animate();



    /*==========================================================
        AUTO FIREWORK LOOP
    ==========================================================*/


    setInterval(() => {


        createFirework();



    }, 900);



    /*==========================================================
        FIRST SHOW
    ==========================================================*/


    for (let i = 0; i < 5; i++) {


        setTimeout(
            createFirework,
            i * 400
        );


    }



    /*==========================================================
        PERFORMANCE
    ==========================================================*/


    document.addEventListener(
        "visibilitychange",
        () => {


            if (document.hidden) {


                canvas.style.display = "none";


            }
            else {


                canvas.style.display = "block";


            }



        });



});