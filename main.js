var total = 0;
var upgrade = 0;
var cs1 = 10;
var cs2 = 100;
var uppower = 1;
function update() {
    var counter = document.getElementById("counter");
    counter.innerHTML = "Total currency: " + total;
    var bttn1 = document.getElementById("clickup");
    bttn1.innerHTML = "This click upgrade costs: " + cs1;

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
document.getElementById("plusone").onclick = click();
document.getElementById("clickup").onclick = upgrade();