class playerShip {
    #x
    #y
    #hp;
    #element;
    #container;
    #speed;

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
            this.move_up(event.key)
            this.move_down(event.key)
            this.move_left(event.key)
            this.move_right(event.key)


            this.#element.style.top = this.#y + "px";
            this.#element.style.left = this.#x + "px";



        });

    }


    move_up(key) {
        if (key == "w" || key == "ArrowUp") {
            if ((this.#y - this.#speed) > (this.#container.offsetHeight / 2)) {
                this.#y -= this.#speed;
            }
        }
    }
    move_down(key) {
        if (key == "s" || key == "ArrowDown") {
            if ((this.#y + this.#speed) < (this.#container.offsetHeight - 150)) {
                this.#y += this.#speed;
            }
        }
    }
    move_left(key) {
        if (key == "a" || key == "ArrowLeft") {
            if ((this.#x - this.#speed) > 0) {
                this.#x -= this.#speed;
            }
        }
    }
    move_right(key) {
        if (key == "d" || key == "ArrowRight") {
            if ((this.#x + this.#speed) < (this.#container.offsetWidth - 150)) {
                this.#x += this.#speed;
            }
        }
    }

    destroy() {
        this.#element.remove()
        this.#element.classList.remove("player")
        this.#element.classList.add("boom")
    }


}