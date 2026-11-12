class enemyShip {
    #x
    #y
    #hp;
    #element;
    #container;
    #speed;
    #moveInterval;
    #moveDirection

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

    createShip() {
        this.#element = document.createElement("div");
        this.#element.style.top = this.#y + "px"
        this.#element.style.left = this.#x + "px"

        this.#element.classList.add("enemy")
        this.#container.appendChild(this.#element)
        this.move_down()
    }

    move() {
        this.#moveInterval = setInterval(() => {
            if (!this.#moveDirection) {
                if (this.#x > (this.#container.offsetWidth * 0.1)) {
                    this.#x -= this.#speed
                } else {
                    this.#moveDirection = true;
                }
            }
            if (this.#moveDirection) {
                if (this.#x < (this.#container.offsetWidth * 0.9)) {
                    this.#x += this.#speed
                }
                else {
                    this.#moveDirection = false;
                }
            }
            this.#element.style.left = this.#x + "px"
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
        this.#element.remove();
        clearInterval(this.#moveInterval);
        this.#element.classList.remove("enemy")
        this.#element.classList.add("boom")
    }


}