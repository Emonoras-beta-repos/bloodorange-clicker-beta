var total = 0;
var upgrade = 0;
var cs1 = 10;
var cs2 = 100;
var uppower = 1;
var uppower2 = 0;
function update() {
    var counter = document.getElementById("counter");
    counter.innerHTML = "Total currency: " + total;
    var bttn1 = document.getElementById("clickup");
    bttn1.innerHTML = "This click upgrade costs: " + cs1;
    var bttn2 = document.getElementById("clickup2");
    bttn2.innerHTML = "This click upgrade costs and adds 10 instead of 1: " + cs2;

}
function click() {
    total += uppower;
    update()
}
function upgrade() {
    update()
    if (total <= cs1) {
        return alert("not enough currency");
    }
    if (total == cs1 || total >= cs1) {
        total -= cs1;
        cs1 += 10;
        uppower++;
        update()
    }
}
function upgrade2() {
    if(total <=cs2) {
        return alert("not enough currency");
    }
    if (total == cs2 || total >= cs2) {
        total -= cs2;
        cs2 += 50;
        uppower2 += 10;
        update();
    }
}
document.getElementById("plusone").onclick = click();
document.getElementById("clickup").onclick = upgrade();
document.getElementById("clickup2").onclick = upgrade2();