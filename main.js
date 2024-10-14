// score, upgrades, and buildings variables
let score = 0;
let buildings = [0, 0, 0, 0, 0];
let cps = 0;
// Cost variables with their initial values
let cursor_cost = 10;
let tree_cost = 100;
let shed_cost = 1000;
let farm_cost = 10000;
let orange_orchard_cost = 100000;

// Extra variables
const h3 = $(".scorenum");
const building_cost = [ "cursor-cost", "tree-cost", "shed-cost", "farm-cost", "orange-orchard-cost", ];
const building_owned = [ "cursor-owned", "tree-owned", "shed-owned", "farm-owned", "orange-orchard-owned", ];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* Cookie functions (import, and export) */

function getCookies(neededCookie) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (neededCookie === "score" && cookie.startsWith("score=")) {
      return parseInt(cookie.substring("score=".length)) || 0;
    }
    if (neededCookie === "buildings" && cookie.startsWith("buildings=")) {
      try {
        return JSON.parse(cookie.substring("buildings=".length).trim());
      } catch (e) {
        console.error("Failed to parse buildings cookie:", e);
        return null;
      }
    }
    if (neededCookie === "cps" && cookie.startsWith("cps=")) {
      return parseInt(cookie.substring("cps=".length)) || 0;
    }
  }
  return null;
}

function setCookies(score, buildings, cps) {
  document.cookie = `score=${score}; path=/`;
  document.cookie = `buildings=${JSON.stringify(buildings)}; path=/`;
  document.cookie = `cps=${JSON.stringify(cps)}; path=/`;
}

/* Load cookie values on page (re)load */

const savedScore = getCookies("score");
if (savedScore !== null) {
  score = savedScore;
  $(".scorenum").text(score);
}

const savedBuildings = getCookies("buildings");
if (savedBuildings && Array.isArray(savedBuildings)) {
  buildings = savedBuildings;
} else {
  buildings = [0, 0, 0, 0, 0];
}

const savedCps = getCookies("cps");
if (savedCps !== null) {
  cps = savedCps;
}

// Update costs and UI on page load
function updateCostsAndUI() {
  cursor_cost = 10 * 2 ** buildings[0];
  tree_cost = 100 * 2 ** buildings[1];
  shed_cost = 1000 * 2 ** buildings[2];
  farm_cost = 10000 * 2 ** buildings[3];
  orange_orchard_cost = 100000 * 2 ** buildings[4];

  const cost_list = [ cursor_cost, tree_cost, shed_cost, farm_cost, orange_orchard_cost, ];

  for (let i = 0; i < 5; i++) {
    $(`.${building_owned[i]}`).text(`You Own: ${buildings[i]}`);
    $(`.${building_cost[i]}`).text(`Cost: ${cost_list[i]}`);
  }
}

updateCostsAndUI(); // Initial UI update

/* Save Menu functions */
function opensavemenus(menu) {
  const diag = document.getElementById(menu);
  diag.showModal();
}

function generatesavecode() {
  const diag = document.getElementById("save-code-made");
  const savecodetxt = document.getElementById("savecode");
  const savecode = `${buildings.join(".")}-${score}-${cps}`;
  savecodetxt.innerHTML = savecode;
  diag.showModal();
}

function importsavecode() {
  const input = document.getElementById("imported-save-code").value;
  if (!input) return;

  const [buildingsArray, scoreCode, cpsCode] = input.split("-").slice(0, 3);
  if (scoreCode) score = parseInt(scoreCode.trim());
  if (cpsCode) cps = parseInt(cpsCode.trim());

  if (buildingsArray.includes(".")) {
    buildings = buildingsArray.split(".").map(Number);
  } else {
    buildings = buildingsArray.split("").map(Number);
  }

  updateCostsAndUI(); // Update UI after importing
}

async function scoreupdate() {
  score++;
  if (buildings[0] > 0) {
    score += buildings[0]; 
  }
  $(".scorenum").text(score);
  h3.addClass("scoreupd");
  await sleep(51);
  h3.removeClass("scoreupd");
  setCookies(score, buildings, cps);
}

function purchase(building) {
  const buildingIndex = [0,1,2,3,4];
  let buildingOC;
  let costOB;
  if (building == "cursor") {buildingOC = 0; costOB = cursor_cost}
  if (building == "tree") {buildingOC = 1; costOB = tree_cost;}
  if (building == "shed") {buildingOC = 2; costOB = shed_cost;}
  if (building == "farm") {buildingOC = 3; costOB = farm_cost;}
  if (building == "orange-orchard") {buildingOC = 4; costOB = orange_orchard_cost;}
  console.log(building);
  let array = ["cursor", "tree", "shed", "farm", "orange-orchard"]

  if (score >= costOB) {
    score -= costOB;
    if (buildingOC == 1) {cps += 1;}
    if (buildingOC == 2) {cps += 10;}
    if (buildingOC == 3) {cps += 100;}
    if (buildingOC == 4) {cps += 1000;}
    costOB *= 2;
    buildings[buildingOC]++;
    setCookies(score, buildings, cps); 
    updateCostsAndUI(); 
  } else {
    alert("Not enough points");
  }
}

async function updateCounter() {
  const h3text = parseInt($(".scorenum").text());

  if (h3text !== score) {
    $(".scorenum").text(score);
    h3.addClass("scoreupd");
    await sleep(51);
    h3.removeClass("scoreupd");
  }

  updateCostsAndUI();
  setCookies(score, buildings, cps);
}

function updateScore() { score += cps; }

setInterval(updateCounter, 1); 
setInterval(updateScore, 1000);