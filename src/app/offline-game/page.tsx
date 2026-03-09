"use client";

import { useEffect, useRef } from "react";

export default function HomePage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        const canvas = canvasRef.current!;
        const ohmaImg = new Image();
        ohmaImg.src = "/ohma.png";
        const togImg = new Image();
        togImg.src = "/tog1.webp";

        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d")!;
        let n = 1;
        const ball = {
            x: 150,
            y: 100,
            vx: 12,
            vy: 4,
            hitbox: 0,
            life: 3,
            radius: 25,
            time: 0,
            color: "blue",
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();
            },
        };


        const square1 = {
            vx: 12,
            vy: 0,
            height: 50,
            width: 50,
            x: 0,
            y: innerHeight - 50,
            color: "red",
            draw() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
        };

        const square2 = {
            vx: 10,
            vy: 0,
            height: 50,
            width: 50,
            x: -30,
            y: innerHeight - 750,
            color: "green",
            draw() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
        };

        const square3 = {
            vx: 0,
            vy: 10,
            height: 50,
            width: 50,
            x: innerWidth / 3,
            y: 0,
            color: "cyan",
            draw() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
        };
        const square4 = {
            vx: 0,
            vy: 10,
            height: 50,
            width: 50,
            x: 2 * innerWidth / 3,
            y: 0,
            color: "pink",
            draw() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
        };

        let raf = window.requestAnimationFrame(draw);

        function circleRectCollision(circle, rect) {
            const nearestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
            const nearestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

            const dx = circle.x - nearestX;
            const dy = circle.y - nearestY;
            return (dx * dx + dy * dy) <= (circle.radius * circle.radius);
        }



        function draw() {
            ctx.fillStyle = "rgb(255 255 255 / 30%)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //ctx.clearRect(0,0,canvas.width,canvas.height)
            square1.draw();
            square1.x += square1.vx;
            if (square1.x > canvas.width) {
                square1.x = -square1.width;
            }
            /* if ((ball.x+ball.vx)<=(square1.x+square1.vx)) {
                 ball.vx-=ball.vx;
                 ball.vy-ball.vy;
             }*/
            square2.draw();
            square2.x += square2.vx;
            if (square2.x > canvas.width) {
                square2.x = -square2.width;
                n += 1;
                if (n > 7) {
                    n = 1;
                }
                square2.y = n * innerHeight / 8;
            }
            square3.draw();
            square3.y += square3.vy;
            if (square3.y > canvas.height) {
                square3.y = -square3.height;
            }
            square4.draw();
            square4.y += square4.vy;
            if (square4.y > canvas.height) {
                square4.y = -square4.height;
                n += 1;
                if (n > 7) {
                    n = 1;
                }
                square4.x = n * canvas.width / 8;
            }



            ball.draw();
            ctx.font = "bold 64px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(`Time: ${ball.time.toFixed(1)}s`, canvas.width / 2, 20);
            ball.time += 0.016;
            /* ball.ax=0;
             ball.ay=0;*/

            ball.x += ball.vx;
            ball.y += ball.vy;
            ball.vx *= 0.98;
            ball.vy *= 0.98;
            ball.vy += 0.35;
            raf = window.requestAnimationFrame(draw);
            if (
                ball.y + ball.vy > canvas.height - ball.radius ||       //dersom ball går treffer toppen/taket
                ball.y + ball.vy < ball.radius
            ) {
                ball.vy = -ball.vy;                                     //snu retning
            }
            if (
                ball.x + ball.vx > canvas.width - ball.radius ||        //dersom ball treffer siden, snu vegg. hva skjer hvis posisjon+hastighet er mindre enn radius??
                ball.x + ball.vx < ball.radius

            ) {
                ball.vx = -ball.vx;                                     //snu retning
            }
            // Legg til i draw()-funksjonen din:
            if (circleRectCollision(ball, square1)) {
                ball.vx = -ball.vx;
                ball.vy = -ball.vy;
                ball.color = "orange";
                ball.life -= 1;
            }

            if (circleRectCollision(ball, square2)) {
                ball.vx = -ball.vx;
                ball.vy = -ball.vy;
                ball.color = "orange";
                ball.life -= 1;
            }
            if (circleRectCollision(ball, square3)) {
                ball.vx = -ball.vx;
                ball.vy = -ball.vy;
                ball.color = "orange";
                ball.life -= 1;
            }
            if (circleRectCollision(ball, square4)) {
                ball.vx = -ball.vx;
                ball.vy = -ball.vy;
                ball.color = "orange";
                ball.life -= 1;
            }

            if (ball.y + ball.radius >= canvas.height) {            //dersom ball treffer bakken
                ball.y = canvas.height - ball.radius;            // hindrer at ballen går gjennom bakken
                //ball.vy = -ball.vy * 0.8;
                //ball.vx = ball.vx * 0.1;

            }
            if (ball.life <= 0) {
                ball.color = "red";
                window.cancelAnimationFrame(raf);
                ctx.fillStyle = "black";
                ctx.font = "bold 64px Arial";
                ctx.textAlign = "center";
                ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2)
                return;
            }
            /*if ((ball.y + ball.radius >= canvas.height) && Math.abs(ball.vy) < 3) {
                ball.vy=0;
                ball.y=innerHeight;
            }*/
        }
        let pause = false;


        raf = window.requestAnimationFrame(draw);

        /*     window.addEventListener("keydown", (e) => {
                 if (e.key === "p") {
                     pause = !pause
                 }
                 if (pause) {
                     window.cancelAnimationFrame(raf);
                     ball.vy = 0;
                     ball.vx = 0;
                 }
         })*/

        window.addEventListener("keydown", (e) => {
            if (e.key === "w") {
                ball.vy -= 20;
                if (ball.x<600) {
                    ball.vx += 5;
            } else {
                ball.vx -=5;
            }
        }
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "s") {
                ball.vy += 20;
            }
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "d") {
                ball.vx += 15;
                ball.vy -= 5;
            }
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "a") {
                ball.vx -= 15;
                ball.vy -= 5;
            }
        });

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        ball.draw();

    }, []);

    return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0 }} />;
}