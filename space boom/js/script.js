var current_score = 0;
var money = 0;
var gameArea = document.querySelector(".gameArea");
var gameOnInterval = null;
var difficulty;
var enemy_spawn_cord_y = [50, 150, 250]
var enemies = [];
var player = null;
var wave_count = 0;
var difficulty_icons = ["asset/difficulti_img_easy.png", "asset/difficulti_img_medium.png", "asset/difficulti_img_hard.png"]

var revive_armed = false;

if (localStorage.getItem("best_score") == null) {
    localStorage.setItem("best_score", 0);
}
if (localStorage.getItem("money") == null) {
    localStorage.setItem("money", 0);
}
if (localStorage.getItem("extra_life") == null) {
    localStorage.setItem("extra_life", 0);
}
if (localStorage.getItem("bomb_power") == null) {
    localStorage.setItem("bomb_power", 0);
}


function refresh_web() {
    let best_score = localStorage.getItem("best_score");;

    document.querySelector(".best_score").innerHTML = best_score;
    document.querySelector(".money_value").innerHTML = money_calc();
    document.querySelector(".heart_cost").innerHTML = cost_calc()[0];
    document.querySelector(".bomb_cost").innerHTML = cost_calc()[1];

    document.querySelector(".background_music").volume = 0.3;

    document.querySelector(".s_click").volume = 0.25;
    document.querySelector(".s_expload").volume = 0.25;
    document.querySelector(".s_buy").volume = 0.25;
    document.querySelector(".s_error").volume = 0.25;
    document.querySelector(".s_laser").volume = 0.25;
    document.querySelector(".s_revive").volume = 0.25;



}

function money_calc() {
    money = Math.floor(Number(localStorage.getItem("money")));
    return money;
}
function cost_calc() {
    var heart_cost = Math.floor(100 * ((parseInt(localStorage.getItem("extra_life")) / 10) == 0 ? 1 : (1 + parseInt(localStorage.getItem("extra_life")) / 10)));
    var bomb_cost = Math.floor(50 * ((parseInt(localStorage.getItem("bomb_power")) / 10) == 0 ? 1 : (1 + parseInt(localStorage.getItem("bomb_power")) / 10)));
    var costs = [heart_cost, bomb_cost];
    return costs;
}


document.querySelectorAll(".click").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".s_click").play()
    });
});

document.querySelector(".extra_heart").addEventListener("click", () => {
    var h_cost = cost_calc()[0];
    var moneyRn = Math.floor(Number(localStorage.getItem("money")))
    if (moneyRn >= h_cost) {
        document.querySelector(".s_buy").play()
        localStorage.setItem("money", (moneyRn - h_cost))
        localStorage.setItem("extra_life", (parseInt(localStorage.getItem("extra_life")) + 1))
    } else {
        document.querySelector(".s_error").play()
    }
    refresh_web()

})
document.querySelector(".atom_bomb").addEventListener("click", () => {
    var b_cost = cost_calc()[1];
    var moneyRn = Math.floor(Number(localStorage.getItem("money")))
    if (moneyRn >= b_cost) {
        document.querySelector(".s_buy").play()
        localStorage.setItem("money", (moneyRn - b_cost))
        localStorage.setItem("bomb_power", (parseInt(localStorage.getItem("bomb_power")) + 1))
    } else {
        document.querySelector(".s_error").play()
    }
    refresh_web()
})


document.querySelector(".play").addEventListener("click", () => {
    document.querySelector(".main_menu").classList.add("no_show")
    gameOn()
})
document.querySelector(".difficulty").addEventListener("click", () => {
    difficulty_show_up()
})
document.querySelector(".shop").addEventListener("click", () => {
    shop_show_up()
})
document.querySelector(".rules").addEventListener("click", () => {
    rule_show_up()
})
document.querySelector(".credits").addEventListener("click", () => {
    credits_show_up()
})
document.querySelector(".settings").addEventListener("click", () => {
    settings_show_up()
})

document.querySelector(".revive_ability").addEventListener("click", () => {
    activate_revive()
});
document.querySelector(".bomb_ability").addEventListener("click", () => {
    use_bomb()
});

document.querySelector(".sidebar .rules").addEventListener("click", () => {
    rule_show_up()
})
document.querySelector(".sidebar .credits").addEventListener("click", () => {
    credits_show_up()
})
document.querySelector(".sidebar .settings").addEventListener("click", () => {
    settings_show_up()
})


document.querySelector(".rules_difficulty").addEventListener("click", () => {
    rule_show_up_from_difficulty()
})
document.querySelector(".credits_difficulty").addEventListener("click", () => {
    credits_show_up_from_difficulty()
})
document.querySelector(".settings_difficulty").addEventListener("click", () => {
    settings_show_up_from_difficulty()
})

document.querySelector(".rules_shop").addEventListener("click", () => {
    rule_show_up_from_shop()
})
document.querySelector(".credits_shop").addEventListener("click", () => {
    credits_show_up_from_shop()
})
document.querySelector(".settings_shop").addEventListener("click", () => {
    settings_show_up_from_shop()
})


document.querySelector(".back_to_menu_from_shop").addEventListener("click", () => {
    shop_close()
})
document.querySelector(".back_to_menu_from_difficulty").addEventListener("click", () => {
    difficulty_close()
})
document.querySelector(".back_to_menu_from_settings").addEventListener("click", () => {
    settings_close()

    document.querySelector(".background_music").volume = document.querySelector(".bg_music input").value;

    document.querySelector(".s_click").volume = document.querySelector(".sound_effects input").value;
    document.querySelector(".s_expload").volume = document.querySelector(".sound_effects input").value;
    document.querySelector(".s_buy").volume = document.querySelector(".sound_effects input").value;
    document.querySelector(".s_error").volume = document.querySelector(".sound_effects input").value;
    document.querySelector(".s_laser").volume = document.querySelector(".sound_effects input").value;
    document.querySelector(".s_revive").volume = document.querySelector(".sound_effects input").value;

})
document.querySelector(".back_to_menu_from_credits").addEventListener("click", () => {
    credits_close()
})
document.querySelector(".back_to_menu_from_rules").addEventListener("click", () => {
    rule_close()
})

function shop_show_up() {
    document.querySelector(".main_menu").classList.add("no_show")
    document.querySelector(".shop_menu").classList.remove("no_show")
}
function shop_close() {
    document.querySelector(".main_menu").classList.remove("no_show")
    document.querySelector(".shop_menu").classList.add("no_show")
}
function difficulty_show_up() {
    document.querySelector(".main_menu").classList.add("no_show")
    document.querySelector(".difficulty_menu").classList.remove("no_show")
}
function difficulty_close() {
    document.querySelector(".main_menu").classList.remove("no_show")
    document.querySelector(".difficulty_menu").classList.add("no_show")
}
function settings_show_up() {
    document.querySelector(".main_menu").classList.add("no_show")
    document.querySelector(".settings_menu").classList.remove("no_show")
}
function settings_show_up_from_shop() {
    document.querySelector(".shop_menu").classList.add("no_show")
    document.querySelector(".settings_menu").classList.remove("no_show")
}
function settings_show_up_from_difficulty() {
    document.querySelector(".difficulty_menu").classList.add("no_show")
    document.querySelector(".settings_menu").classList.remove("no_show")
}
function settings_close() {
    document.querySelector(".main_menu").classList.remove("no_show")
    document.querySelector(".settings_menu").classList.add("no_show")
}
function credits_show_up() {
    document.querySelector(".main_menu").classList.add("no_show")
    document.querySelector(".credits_menu").classList.remove("no_show")
}
function credits_show_up_from_shop() {
    document.querySelector(".shop_menu").classList.add("no_show")
    document.querySelector(".credits_menu").classList.remove("no_show")
}
function credits_show_up_from_difficulty() {
    document.querySelector(".difficulty_menu").classList.add("no_show")
    document.querySelector(".credits_menu").classList.remove("no_show")
}
function credits_close() {
    document.querySelector(".main_menu").classList.remove("no_show")
    document.querySelector(".credits_menu").classList.add("no_show")
}
function rule_show_up() {
    document.querySelector(".main_menu").classList.add("no_show")
    document.querySelector(".rule_menu").classList.remove("no_show")
}
function rule_show_up_from_shop() {
    document.querySelector(".shop_menu").classList.add("no_show")
    document.querySelector(".rule_menu").classList.remove("no_show")
}
function rule_show_up_from_difficulty() {
    document.querySelector(".difficulty_menu").classList.add("no_show")
    document.querySelector(".rule_menu").classList.remove("no_show")
}
function rule_close() {
    document.querySelector(".main_menu").classList.remove("no_show")
    document.querySelector(".rule_menu").classList.add("no_show")
}

function isColliding(el1, el2) {
    const a = el1.getBoundingClientRect();
    const b = el2.getBoundingClientRect();

    return a.left < b.right &&
        a.right > b.left &&
        a.top < b.bottom &&
        a.bottom > b.top;
}


function update_revive_hud() {
    var lives = parseInt(localStorage.getItem("extra_life"));
    var bombs = parseInt(localStorage.getItem("bomb_power"));

    document.querySelector(".revive_count").innerHTML = "x" + lives;
    document.querySelector(".bomb_count").innerHTML = "x" + bombs;
    document.querySelector(".revive_ability").classList.toggle("armed", revive_armed);
}

function activate_revive() {
    if (player == null || revive_armed) return;

    var charges = parseInt(localStorage.getItem("extra_life"));
    if (charges > 0) {
        revive_armed = true; 
        player.getElement().classList.add("revive_active");
        document.querySelector(".s_holy").play();
    } else {
        document.querySelector(".s_error").play();
    }
    update_revive_hud();
}

function use_bomb() {
    if (player == null) return;

    var bombs = parseInt(localStorage.getItem("bomb_power"));
    if (bombs <= 0) {
        document.querySelector(".s_error").play();
        return;
    }

    localStorage.setItem("bomb_power", bombs - 1);

    [...enemies].forEach(e => e.takeDamage(99999));
    [...bullets].forEach(b => b.destroy());

    gameArea.classList.add("bomb_flash");
    setTimeout(() => gameArea.classList.remove("bomb_flash"), 500);

    update_revive_hud();
}

function try_revive() {
    if (!revive_armed) return false;

    revive_armed = false;
    localStorage.setItem("extra_life", parseInt(localStorage.getItem("extra_life")) - 1);
    player.getElement().classList.remove("revive_active");
    update_revive_hud();
    return true;
}


function addScore(points) {
    current_score += points;
    document.querySelector(".hud_score").innerHTML = current_score;
}

function gameOver() {
    clearInterval(gameOnInterval);
    gameOnInterval = null;
    document.querySelectorAll(".ability").forEach(a => a.classList.add("no_show"));
    [...enemies].forEach(e => e.destroy());
    [...bullets].forEach(b => b.destroy());
    player = null;
    revive_armed = false;
    localStorage.setItem("money", money_calc() + Math.floor(current_score / 100))
    if (current_score > parseInt(localStorage.getItem("best_score"))) {
        localStorage.setItem("best_score", current_score);
    }
    current_score = 0;

    document.querySelector(".hud").classList.add("no_show");
    document.querySelector(".game_over_menu").classList.remove("no_show")
    refresh_web();
}
document.querySelector(".retry").addEventListener("click", () => {
    document.querySelector(".game_over_menu").classList.add("no_show")
    gameOn()
})
document.querySelector(".back_to_menu_from_game_over").addEventListener("click", () => {
    document.querySelector(".game_over_menu").classList.add("no_show")
    document.querySelector(".main_menu").classList.remove("no_show")
})

function gameOn() {
    wave_count = 0;
    difficulty = document.querySelector(".difficulty_manager .active").getAttribute("value");
    document.querySelectorAll(".ability").forEach(a => a.classList.remove("no_show"));
    document.querySelector(".hud").classList.remove("no_show")
    document.querySelector(".hud_wave").innerHTML = wave_count;
    document.querySelector(".hud_difficulty").innerHTML = `<img src="${difficulty_icons[difficulty - 1]}" class="dif_mini_icon" alt=""></img>`;
    var x_cord = (gameArea.offsetWidth / 2) - (150 / 2);
    var y_cord = (gameArea.offsetHeight * 0.8);
    current_score = 0;
    document.querySelector(".hud_score").innerHTML = 0;
    player = new playerShip(x_cord, y_cord, 5, 10, gameArea)
    revive_armed = false;
    update_revive_hud();
    if (gameOnInterval == null) {
        gameOnInterval = setInterval(() => {
            if (enemies.length == 0) {
                wave_count++;
                document.querySelector(".hud_wave").innerHTML = wave_count;
                enemy_wave()
            }
        }, 20);
    }

}


function enemy_wave() {
    for (let i = 0; i < difficulty; i++) {
        var x_cord = Math.floor(Math.random() * ((gameArea.offsetWidth * 0.75) - (gameArea.offsetWidth * 0.25) + 1)) + (gameArea.offsetWidth * 0.25);;
        var direction = (Math.floor(Math.random() * 2) < 1 ? true : false);
        enemies.push(new enemyShip(x_cord, (enemy_spawn_cord_y[i] - 500), 100, 3, direction, gameArea));
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key == " ") {
        [...enemies].forEach(e => e.destroy());
    }
});
document.addEventListener("keydown", (event) => {
    if (event.repeat) return;   
    var key = event.key.toLowerCase();

    if (key == "q"){
        activate_revive();
    }
    if (key == "e"){
        use_bomb();
    } 
});
document.querySelectorAll(".side_toggle").forEach(button => {
    button.addEventListener("click", () => {
        button.parentElement.querySelector(".sidebar").classList.toggle("sidebar_open")
    })
})

document.querySelectorAll(".sidebar .click").forEach(item => {
    item.addEventListener("click", () => {
        item.parentElement.classList.remove("sidebar_open")
    })
})



refresh_web()