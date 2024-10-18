import { achievements } from "./achievements.js";

// score, upgrades, and buildings variables
let score = 0;
export let buildings = [0, 0, 0, 0, 0];
let cps = 0;

// Cost variables with their initial values
let cursor_cost = 10;
let tree_cost = 100;
let shed_cost = 1000;
let farm_cost = 10000;
let orange_orchard_cost = 100000;

// Achivement variables
let clicks = 0;
let shown = false;
let achieves = achievements;
console.log(achieves)


// Upgrade variables
let cursor_upgrade_bonus = 0;
let tree_upgrade_bonus = 0;
let shed_upgrade_bonus = 0;
let farm_upgrade_bonus = 0;
let orange_orchard_upgrade_bonus = 0;

// Extra variables
const h3 = $(".scorenum");
const building_cost = [ "cursor-cost", "tree-cost", "shed-cost", "farm-cost", "orange-orchard-cost", ];
const building_owned = [ "cursor-owned", "tree-owned", "shed-owned", "farm-owned", "orange-orchard-owned", ];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
    if (neededCookie === "cursor_cost" && cookie.startsWith("cursor_cost=")) {
      return parseInt(cookie.substring("cursor_cost=".length)) || 10;
    }
    if (neededCookie === "tree_cost" && cookie.startsWith("tree_cost=")) {
      return parseInt(cookie.substring("tree_cost=".length)) || 100;
    }
    if (neededCookie === "shed_cost" && cookie.startsWith("shed_cost=")) {
      return parseInt(cookie.substring("shed_cost=".length)) || 1000;
    }
    if (neededCookie === "farm_cost" && cookie.startsWith("farm_cost=")) {
      return parseInt(cookie.substring("farm_cost=".length)) || 10000;
    }
    if (neededCookie === "orange_orchard_cost" && cookie.startsWith("orange_orchard_cost=")) {
      return parseInt(cookie.substring("orange_orchard_cost=".length)) || 100000;
    }
  }
  return null;
}

function setCookies(score, buildings, cps, ccost, tcost, scost, fcost, oocost) {
  document.cookie = `score=${score}; path=/`;
  document.cookie = `buildings=${JSON.stringify(buildings)}; path=/`;
  document.cookie = `cps=${JSON.stringify(cps)}; path=/`;
  document.cookie = `cursor_cost=${JSON.stringify(ccost)}; path=/`;
  document.cookie = `tree_cost=${JSON.stringify(tcost)}; path=/`;
  document.cookie = `shed_cost=${JSON.stringify(scost)}; path=/`;
  document.cookie = `farm_cost=${JSON.stringify(fcost)}; path=/`;
  document.cookie = `orange_orchard_cost=${JSON.stringify(oocost)}; path=/`;
}

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

const savedCCost = getCookies("cursor_cost");
if (savedCCost !== null) {
  cursor_cost = savedCCost;
}

const savedTCost = getCookies("tree_cost");
if (savedTCost !== null) {
  tree_cost = savedTCost;
}

const savedSCost = getCookies("shed_cost");
if (savedSCost !== null) {
  shed_cost = savedSCost;
}

const savedFCost = getCookies("farm_cost");
if (savedFCost !== null) {
  farm_cost = savedFCost;
}

const savedOOCost = getCookies("orange_orchard_cost");
if (savedOOCost !== null) {
  orange_orchard_cost = savedOOCost;
}

// Update UI 

function updateUI() {
  const cost_list = [ cursor_cost, tree_cost, shed_cost, farm_cost, orange_orchard_cost, ];

  for (let i = 0; i < 5; i++) {
    $(`.${building_owned[i]}`).text(`You Own: ${buildings[i]}`);
    $(`.${building_cost[i]}`).text(`Cost: ${cost_list[i]}`);
  }
}

updateUI(); // Initial UI update

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

  updateUI(); // Update UI after importing
}

export async function scoreUpdate() {
  clicks++;
  score++;
  if (buildings[0] > 0) {
    score += buildings[0]; 
  }
  $(".scorenum").text(score);
  h3.addClass("scoreupd");
  await sleep(51);
  h3.removeClass("scoreupd");
  setCookies(score, buildings, cps, cursor_cost, tree_cost, shed_cost, farm_cost, orange_orchard_cost);
}

export function purchase(building) {
  console.log("working...");
  let buildingOC;
  let costOB;
  if (building == "cursor") {
    buildingOC = 0; 
    costOB = cursor_cost;
  }
  if (building == "tree") {
    buildingOC = 1; 
    costOB = tree_cost;
    
  }
  if (building == "shed") {buildingOC = 2; costOB = shed_cost;}
  if (building == "farm") {buildingOC = 3; costOB = farm_cost;}
  if (building == "orange-orchard") {buildingOC = 4; costOB = orange_orchard_cost;}
  console.log(building);
  let array = ["cursor", "tree", "shed", "farm", "orange-orchard"]

  if (score >= costOB) {
    score -= costOB;
    if (buildingOC == 0) {
      cursor_cost = Math.floor(cursor_cost * Math.pow(1.15, buildings[0]));
      if (cursor_cost == 10) {
        cursor_cost ++;
      }
    }
    if (buildingOC == 1) {
      cps += 1;
      tree_cost = Math.floor(tree_cost * Math.pow(1.15, buildings[1]));
      if (tree_cost == 100) {
        tree_cost += 10;
      }
    }
    if (buildingOC == 2) {
      cps += 10;
      shed_cost = Math.floor(shed_cost * Math.pow(1.15, buildings[2]));
      if (shed_cost == 1000) {
        shed_cost += 100;
      }
    }
    if (buildingOC == 3) {
      cps += 100;
      farm_cost = Math.floor(farm_cost * Math.pow(1.15, buildings[3]));
      if (farm_cost == 10000) {
        farm_cost += 1000;
      }
    }
    if (buildingOC == 4) {
      cps += 1000;
      orange_orchard_cost = Math.floor(orange_orchard_cost * Math.pow(1.15, buildings[4]));
      if (orange_orchard_cost == 100000) {
        orange_orchard_cost += 10000;
      }
    }
    buildings[buildingOC]++;
    setCookies(score, buildings, cps, cursor_cost, tree_cost, shed_cost, farm_cost, orange_orchard_cost); 
    updateUI(); 
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

  updateUI();
  setCookies(score, buildings, cps, cursor_cost, tree_cost, shed_cost, farm_cost, orange_orchard_cost);

  if (clicks === 1000000 && shown == false) {
    alert("How the hell did you click so many damn times? A million is too much man. Touch grass.");
    shown = true;
  }
}

function updateScore() { score += cps; }

function reset() {
  clicks = 0;
  score = 0;
  cps = 0;
  for (let i = 0; i < buildings.length; i++) {
    buildings[i] = 0;
  }
  cursor_cost = 10;
  tree_cost = 100;
  shed_cost = 1000;
  farm_cost = 10000;
  orange_orchard_cost = 100000;
  setCookies(score, buildings, cps, cursor_cost, tree_cost, shed_cost, farm_cost, orange_orchard_cost);
}


window.purchase = purchase;
window.scoreUpdate = scoreUpdate;
window.opensavemenus = opensavemenus;
window.generatesavecode = generatesavecode;
window.importsavecode = importsavecode;

setInterval(updateCounter, 1); 
setInterval(updateScore, 1000);
