class playerShip {
    #x
    #y
    #hp;
    #element;
    #container;
    #speed;
    #velX = 0;         
    #velY = 0;       
    #friction = 0.9;  
    #keys = {};         
    #moveInterval;

    constructor(x, y, hp, speed, container) {
        this.setX(x);
        this.setY(y);
        this.setHp(hp);
        this.setContainer(container);
        this.setSpeed(speed);
        this.createShip()
    }

    setHp(hp) {
        this.#hp = hp;
    }
    getHp() {
        return this.#hp;
    }
    setX(x) {
        this.#x = x;
    }
    setY(y) {
        this.#y = y;
    }
    setContainer(container) {
        this.#container = container;
    }
    setSpeed(speed) {
        this.#speed = speed;
    }

    createShip() {
        this.#element = document.createElement("div");
        this.#element.style.top = this.#y + "px"
        this.#element.style.left = this.#x + "px"

        this.#element.classList.add("player")
        this.#container.appendChild(this.#element)

        document.addEventListener("keydown", (event) => {
            this.#keys[event.key] = true;
        });
        document.addEventListener("keyup", (event) => {
            this.#keys[event.key] = false;
        });

        window.addEventListener("blur", () => {
            this.#keys = {};
        });

        // left click = shoot
        this.#container.addEventListener("click", () => {
            if (this.#element.isConnected) {   
                this.shoot()
            }
        });

        this.#moveInterval = setInterval(() => {
            this.move()
        }, 20);
    }

    shoot() {
        var bullet = document.createElement("div");
        var bulletX = this.#x + 75 - 48;  
        var bulletY = this.#y - 60;        

        bullet.classList.add("projectile");
        bullet.style.left = bulletX + "px";
        bullet.style.top = bulletY + "px";
        this.#container.appendChild(bullet);

        var sound = document.querySelector(".s_laser");
        sound.currentTime = 0;
        sound.play();

        var bulletInterval = setInterval(() => {
            bulletY -= 15;
            bullet.style.top = bulletY + "px";
            if (bulletY < -96) {
                bullet.remove();
                clearInterval(bulletInterval);
            }
        }, 20);
    }

    move() {
        Object.keys(this.#keys).forEach(key => {
            if (this.#keys[key]) {
                this.move_up(key)
                this.move_down(key)
                this.move_left(key)
                this.move_right(key)
            }
        });

        this.#velX *= this.#friction;
        this.#velY *= this.#friction;

        this.#x += this.#velX;
        this.#y += this.#velY;
        this.stop_at_edges()

        this.#element.style.top = this.#y + "px";
        this.#element.style.left = this.#x + "px";
    }

    move_up(key) {
        if (key == "w" || key == "ArrowUp") {
            this.#velY -= this.#speed / 10;
        }
    }
    move_down(key) {
        if (key == "s" || key == "ArrowDown") {
            this.#velY += this.#speed / 10;
        }
    }
    move_left(key) {
        if (key == "a" || key == "ArrowLeft") {
            this.#velX -= this.#speed / 10;
        }
    }
    move_right(key) {
        if (key == "d" || key == "ArrowRight") {
            this.#velX += this.#speed / 10;
        }
    }

    stop_at_edges() {
        var top = this.#container.offsetHeight / 2;
        var bottom = this.#container.offsetHeight - 150;
        var left = 0;
        var right = this.#container.offsetWidth - 150;

        if (this.#y < top) {
            this.#y = top;
            this.#velY = 0;
        }
        if (this.#y > bottom) {
            this.#y = bottom;
            this.#velY = 0;
        }
        if (this.#x < left) {
            this.#x = left;
            this.#velX = 0;
        }
        if (this.#x > right) {
            this.#x = right;
            this.#velX = 0;
        }
    }

    destroy() {
        clearInterval(this.#moveInterval);
        this.#element.remove()
        this.#element.classList.remove("player")
        this.#element.classList.add("boom")
    }


}