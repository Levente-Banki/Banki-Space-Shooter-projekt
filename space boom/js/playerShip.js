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
    #shootInterval;
    #keydownHandler;
    #keyupHandler;
    #blurHandler;

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

    getElement() {
        return this.#element;
    }

    shoot() {
        new Bullet(
            this.#x + this.#element.offsetWidth / 2 - 5,
            this.#y,
            10, 25, -1, "enemy", this.#container
        );
        var sound = document.querySelector(".s_laser");
        sound.currentTime = 0;
        sound.play();
    }

    takeDamage(dmg) {
        this.#hp -= dmg;

        if (this.#hp <= 0) {
            if (try_revive()) {
                document.querySelector(".s_revive").play()
                this.#hp = 5;
                this.updateLives();
                return;
            }
            this.#hp = 0;
            this.updateLives();
            this.destroy();
            gameOver();
            return;
        }
        this.updateLives();
    }

    createShip() {
        this.#element = document.createElement("div");
        this.#element.style.top = this.#y + "px"
        this.#element.style.left = this.#x + "px"

        this.#element.classList.add("player")
        this.#container.appendChild(this.#element)

        this.#keydownHandler = (event) => {
            this.#keys[event.key] = true;
        };
        this.#keyupHandler = (event) => {
            this.#keys[event.key] = false;
        };
        this.#blurHandler = () => {
            this.#keys = {};
        };

        document.addEventListener("keydown", this.#keydownHandler);
        document.addEventListener("keyup", this.#keyupHandler);
        window.addEventListener("blur", this.#blurHandler);

        this.#moveInterval = setInterval(() => {
            this.move();
            this.updateLives();
        }, 20);

        this.#shootInterval = setInterval(() => this.shoot(), 500);
    }

    updateLives() {
        document.querySelector(".hud_lives").innerHTML = "";

        for (let i = 0; i < this.#hp; i++) {
            document.querySelector(".hud_lives").innerHTML += "♥ ";
        }
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
        clearInterval(this.#shootInterval);
        document.removeEventListener("keydown", this.#keydownHandler);
        document.removeEventListener("keyup", this.#keyupHandler);
        window.removeEventListener("blur", this.#blurHandler);

        this.#element.classList.add("boom");
        setTimeout(() => this.#element.remove(), 500);
    }


}