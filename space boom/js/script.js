var current_score = 0;
var alltime_score = 0;
var money = 0;
var extra_life = 0;
var bomb_power = 0;
var gameArea = document.querySelector(".gameArea");
var gameOnInterval = null;
var difficulty;
var enemy_spawn_cord_y = [50, 150, 250]
var enemy;


localStorage.setItem("best_score", 0);

function refresh_web() {
    let best_score = localStorage.getItem("best_score");;

    document.querySelector(".best_score").innerHTML = best_score;
    document.querySelector(".money_value").innerHTML = money_calc();
    document.querySelector(".heart_cost").innerHTML = cost_calc()[0];
    document.querySelector(".bomb_cost").innerHTML = cost_calc()[1];

    document.querySelector(".background_music").volume = 0.3;

    document.querySelector(".s_click").volume = 0.3;
    document.querySelector(".s_expload").volume = 0.3;
    document.querySelector(".s_buy").volume = 0.3;
    document.querySelector(".s_error").volume = 0.3;
    document.querySelector(".s_laser").volume = 0.3;



}

function money_calc() {
    money = (alltime_score / 100);
    return money;
}
function cost_calc() {
    var moneyRn = money_calc()
    var heart_cost = (moneyRn <= 0 ? 400 : (moneyRn > 2000 ? moneyRn * 0.4 : 500 + (moneyRn * 0.2)));
    var bomb_cost = (moneyRn <= 0 ? 200 : (moneyRn > 1000 ? moneyRn * 0.4 : 300 + (moneyRn * 0.2)));
    var costs = [heart_cost, bomb_cost];
    return costs;
}


document.querySelectorAll(".click").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".s_click").play()
    });
});


document.querySelector(".play").addEventListener("click", () => {
    gameOn()
})
document.querySelector(".difficulty").addEventListener("click", () => {
    difficulty_show_up()
})
document.querySelector(".shop").addEventListener("click", () => {
    shop_show_up()
})
document.querySelectorAll(".rules").forEach(button => {
    button.addEventListener("click", () => {
        rule_show_up()
    })
})
document.querySelectorAll(".credits").forEach(button => {
    button.addEventListener("click", () => {
        credits_show_up()
    })
})
document.querySelectorAll(".settings").forEach(button => {
    button.addEventListener("click", () => {
        settings_show_up()
    })
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
var menu_before = ".main_menu";

function remember_menu() {
    if (!document.querySelector(".main_menu").classList.contains("no_show")) {
        menu_before = ".main_menu";
    }
    if (!document.querySelector(".shop_menu").classList.contains("no_show")) {
        menu_before = ".shop_menu";
    }
    if (!document.querySelector(".difficulty_menu").classList.contains("no_show")) {
        menu_before = ".difficulty_menu";
    }
}

function hide_sub_menus() {
    document.querySelector(".settings_menu").classList.add("no_show")
    document.querySelector(".credits_menu").classList.add("no_show")
    document.querySelector(".rule_menu").classList.add("no_show")
}

function settings_show_up() {
    remember_menu()
    document.querySelector(menu_before).classList.add("no_show")
    hide_sub_menus()
    document.querySelector(".settings_menu").classList.remove("no_show")
}
function settings_close() {
    document.querySelector(menu_before).classList.remove("no_show")
    document.querySelector(".settings_menu").classList.add("no_show")
}
function credits_show_up() {
    remember_menu()
    document.querySelector(menu_before).classList.add("no_show")
    hide_sub_menus()
    document.querySelector(".credits_menu").classList.remove("no_show")
}
function credits_close() {
    document.querySelector(menu_before).classList.remove("no_show")
    document.querySelector(".credits_menu").classList.add("no_show")
}
function rule_show_up() {
    remember_menu()
    document.querySelector(menu_before).classList.add("no_show")
    hide_sub_menus()
    document.querySelector(".rule_menu").classList.remove("no_show")
}
function rule_close() {
    document.querySelector(menu_before).classList.remove("no_show")
    document.querySelector(".rule_menu").classList.add("no_show")
}

function gameOn() {
    difficulty = document.querySelector(".difficulty_manager .active").getAttribute("value");
    document.querySelector(".main_menu").classList.add("no_show")
    var x_cord = (gameArea.offsetWidth / 2) - (150 / 2);
    var y_cord = (gameArea.offsetHeight * 0.8);
    var player = new playerShip(x_cord, y_cord, 50, 10, gameArea)

    if (gameOnInterval == null) {
        gameOnInterval = setInterval(() => {
            var enemyCount = gameArea.children.length - 1;
            if (enemyCount == 0) {
                enemy_wave()
            }
        }, 20);
    }

}


function enemy_wave() {
    for (let i = 0; i < difficulty; i++) {
        var x_cord = Math.floor(Math.random() * ((gameArea.offsetWidth * 0.75) - (gameArea.offsetWidth * 0.25) + 1)) + (gameArea.offsetWidth * 0.25);;
        var direction = (Math.floor(Math.random() * 2) < 1 ? true : false);
        enemy = new enemyShip(x_cord, (enemy_spawn_cord_y[i] - 500), 100, 3, direction, gameArea);
    }
}

document.addEventListener("keydown", (event) => {

    if (event.key == " ") {
        document.querySelectorAll(".enemy").forEach(enemy => {
            enemy.classList.add("boom");
        });
        var i = 0;
        var animationInterval = setInterval(() => {
            i++;
            if (i == 1) {
                document.querySelectorAll(".enemy").forEach(enemy => enemy.remove())
                clearInterval(animationInterval)
            }
        }, 500);

    }
});




refresh_web()


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