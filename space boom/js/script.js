var current_score = 0;
var alltime_score = 0;
var money = 0;
var extra_life = 0;
var bomb_power = 0;
localStorage.setItem("best_score", 0);

function refresh_web(){
    let best_score = localStorage.getItem("best_score");;

    document.querySelector(".best_score").innerHTML = best_score;
    document.querySelector(".money_value").innerHTML = money_calc();
    document.querySelector(".heart_cost").innerHTML = cost_calc()[0];
    document.querySelector(".bomb_cost").innerHTML = cost_calc()[1];
    
    
    
    
}

function money_calc(){
    money = (alltime_score / 100);
    return money;
}
function cost_calc(){
    var moneyRn = money_calc()
    var heart_cost = (moneyRn<=0?400:(moneyRn>2000?moneyRn*0.4:500+(moneyRn*0.2)));
    var bomb_cost = (moneyRn<=0?200:(moneyRn>1000?moneyRn*0.4:300+(moneyRn*0.2)));
    var costs = [heart_cost,bomb_cost];
    return costs;
}

document.querySelector(".play").addEventListener("click", () => {
    
})
document.querySelector(".difficulty").addEventListener("click", () => {
    difficulty_show_up()
})
document.querySelector(".shop").addEventListener("click", () => {
    shop_show_up()
})
document.querySelector(".rules").addEventListener("click", () => {
    
})
document.querySelector(".credits").addEventListener("click", () => {
    
})
document.querySelector(".settings").addEventListener("click", () => {
    
})

document.querySelector(".back_to_menu_from_shop").addEventListener("click", () => {
    shop_close()
})
document.querySelector(".back_to_menu_from_difficulty").addEventListener("click", () => {
    difficulty_close()
})

function shop_show_up(){
    document.querySelector(".main_menu").classList.add("no_show")
    document.querySelector(".shop_menu").classList.remove("no_show")
}
function shop_close(){
    document.querySelector(".main_menu").classList.remove("no_show")
    document.querySelector(".shop_menu").classList.add("no_show")
}
function difficulty_show_up(){
    document.querySelector(".main_menu").classList.add("no_show")
    document.querySelector(".difficulty_menu").classList.remove("no_show")
}
function difficulty_close(){
    document.querySelector(".main_menu").classList.remove("no_show")
    document.querySelector(".difficulty_menu").classList.add("no_show")
}

refresh_web()