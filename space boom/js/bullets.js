var bullets = [];

class Bullet {
    #x;
    #y;
    #speed;
    #damage;
    #direction; 
    #target;    
    #element;
    #container;
    #interval;

    constructor(x, y, speed, damage, direction, target, container) {
        this.#x = x;
        this.#y = y;
        this.#speed = speed;
        this.#damage = damage;
        this.#direction = direction;
        this.#target = target;
        this.#container = container;
        this.createBullet();
    }

    createBullet() {
        this.#element = document.createElement("div");
        this.#element.classList.add("bullet");
        this.#element.classList.add(this.#target == "enemy" ? "player_bullet" : "enemy_bullet");
        this.#element.style.left = this.#x + "px";
        this.#element.style.top = this.#y + "px";
        this.#container.appendChild(this.#element);

        bullets.push(this);
        this.#interval = setInterval(() => this.move(), 20);
    }

    move() {
        this.#y += this.#speed * this.#direction;
        this.#element.style.top = this.#y + "px";

        if (this.#y < -50 || this.#y > this.#container.offsetHeight - 50) {
            this.destroy();
            return;
        }

        if (this.#target == "enemy") {
            for (const enemy of [...enemies]) {
                if (isColliding(this.#element, enemy.getElement())) {
                    enemy.takeDamage(this.#damage);
                    this.destroy();
                    return;
                }
            }
        } else {
            if (player != null && isColliding(this.#element, player.getElement())) {
                player.takeDamage(this.#damage);
                this.destroy();
            }
        }
    }

    destroy() {
        clearInterval(this.#interval);
        this.#element.remove();
        var i = bullets.indexOf(this);
        if (i !== -1) {
            bullets.splice(i, 1);
        }
    }
}