var total = 0;
var upgrade = 0;
var cs1 = 10;
var cs2 = 100;
var uppower = 1;
var uppower2 = 0;
function update() {
    $("plusone").text("Total Currecy is: " + total)
    $("clickup").text("This click upgrade costs: " + cs1 + " currency")
    $("clickup2").text("This click upgrade that adds 10 costs: " + cs2 + " currency")
}
function click() {
    total += uppower;
    $("plusone").text("Total Currecy is: " + total)
    update()
}
function upgrade() {
    update()
    if (total <= cs1) {
        return alert("not enough currency");
    }
    if (total == cs1 || total >= cs1) {
        total -= cs1;
        $("plusone").text("Total Currecy is: " + total)
        cs1 += 10;
        uppower++;
        $("clickup").text("This click upgrade costs: " + cs1 + " currency")
        update()
    }
}
function upgrade2() {
    if(total <= cs2) {
        return alert("not enough currency");
    }
    if (total == cs2 || total >= cs2) {
        total -= cs2;
        cs2 += 50;
        uppower2 += 10;
        update();
    }
}