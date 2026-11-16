class enemyShip {
    #x
    #y
    #hp;
    #element;
    #container;
    #speed;
    #moveInterval;
    #moveDirection
    #shootInterval;
    #death = false;

    constructor(x, y, hp, speed, direction, container) {
        this.setX(x);
        this.setY(y);
        this.setHp(hp);
        this.setContainer(container);
        this.setSpeed(speed);
        this.setDirection(direction);
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
    setDirection(direction) {
        this.#moveDirection = direction;
    }

    getElement() {
        return this.#element;
    }

    takeDamage(dmg) {
        this.#hp -= dmg;
        if (this.#hp <= 0 && !this.#death) {
            if (difficulty == 1) {
                addScore(100);
            } else if (difficulty == 2) {
                addScore(125);
            } else if (difficulty == 3) {
                addScore(150);
            }
            this.destroy();
        }
    }

    shoot() {
        new Bullet(
            this.#x + this.#element.offsetWidth / 2 - 5,
            this.#y + this.#element.offsetHeight,
            6, 1, 1, "player", this.#container
        );
    }


    createShip() {
        this.#element = document.createElement("div");
        this.#element.style.top = this.#y + "px"
        this.#element.style.left = this.#x + "px"

        this.#element.classList.add("enemy")
        this.#container.appendChild(this.#element)
        this.move_down()
    }

    move() {
        this.#shootInterval = setInterval(() => this.shoot(), 1000);
        this.#moveInterval = setInterval(() => {
            var maxX = (this.#container.offsetWidth * 0.95) - (this.#element.offsetWidth);

            if (this.#x > maxX) {
                this.#x = maxX;
            }

            if (!this.#moveDirection) {
                if (this.#x > (this.#container.offsetWidth * 0.05)) {
                    this.#x -= this.#speed;
                } else {
                    this.#moveDirection = true;
                }
            }
            if (this.#moveDirection) {
                if (this.#x < maxX) {
                    this.#x += this.#speed;
                } else {
                    this.#moveDirection = false;
                }
            }
            this.#element.style.left = this.#x + "px";
        }, 20);
    }

    move_down() {
        var i = 0;
        this.#moveInterval = setInterval(() => {
            this.#y++;
            this.#element.style.top = this.#y + "px";
            i++;
            if (i >= 500) {
                clearInterval(this.#moveInterval);
                this.move()
            }
        }, 5);

    }

    destroy() {
        if (this.#death) {
            return;
        }
        this.#death = true;

        clearInterval(this.#moveInterval);
        clearInterval(this.#shootInterval);

        var i = enemies.indexOf(this);
        if (i !== -1) {
            enemies.splice(i, 1);
        }

        this.#element.classList.add("boom");
        document.querySelector(".s_expload").play();

        setTimeout(() => this.#element.remove(), 500);
    }

}