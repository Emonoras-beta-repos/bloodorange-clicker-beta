// score, upgrades, and buildings variables
let score = 0;
let buildings = [0, 0, 0, 0, 0];

// Cost variables with their initial values
let cursor_cost = 10;
let tree_cost = 100;
let shed_cost = 1000;
let farm_cost = 10000;
let orange_orchard_cost = 100000;

// Extra variables
const h3 = $(".scorenum");
const building_cost = [
  "cursor-cost",
  "tree-cost",
  "shed-cost",
  "farm-cost",
  "orange-orchard-cost",
];
const building_owned = [
  "cursor-owned",
  "tree-owned",
  "shed-owned",
  "farm-owned",
  "orange-orchard-owned",
];

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
  }
  return null;
}

function setCookies(score, buildings) {
  document.cookie = `score=${score}; path=/`;
  document.cookie = `buildings=${JSON.stringify(buildings)}; path=/`;
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

// Update costs and UI on page load
function updateCostsAndUI() {
  cursor_cost = 10 * 2 ** buildings[0];
  tree_cost = 100 * 2 ** buildings[1];
  shed_cost = 1000 * 2 ** buildings[2];
  farm_cost = 10000 * 2 ** buildings[3];
  orange_orchard_cost = 100000 * 2 ** buildings[4];

  const cost_list = [
    cursor_cost,
    tree_cost,
    shed_cost,
    farm_cost,
    orange_orchard_cost,
  ];

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
  const savecode = `${buildings.join(".")}-${score}`;
  savecodetxt.innerHTML = savecode;
  diag.showModal();
}

function importsavecode() {
  const input = document.getElementById("imported-save-code").value;
  if (!input) return;

  const [buildingsArray, scoreCode] = input.split("-");
  if (scoreCode) score = parseInt(scoreCode.trim());

  if (buildingsArray.includes(".")) {
    buildings = buildingsArray.split(".").map(Number);
  } else {
    buildings = buildingsArray.split("").map(Number);
  }

  updateCostsAndUI(); // Update UI after importing
}

/* Score update function */
async function scoreupdate() {
  score++;
  if (buildings[0] > 0) {
    score += buildings[0]; // Add the cursor income
  }
  $(".scorenum").text(score);
  h3.addClass("scoreupd");
  await sleep(51);
  h3.removeClass("scoreupd");
  setCookies(score, buildings);
}

/* Purchase function */
function purchase(building) {
  const buildingIndex = {
    cursor: { itemIndex: 0 },
    tree: { itemIndex: 1 },
    shed: { itemIndex: 2 },
    farm: { itemIndex: 3 },
    "orange orchard": { itemIndex: 4 },
  };

  const buildingData = buildingIndex[building];
  if (!buildingData) {
    alert("Invalid building type.");
    return;
  }

  const { itemIndex } = buildingData;
  const currentCost = 10 * 2 ** buildings[itemIndex]; // Dynamic cost calculation

  if (score >= currentCost) {
    score -= currentCost;
    buildings[itemIndex]++;
    setCookies(score, buildings); // Ensure cookies are updated
    updateCostsAndUI(); // Update display after purchase
  } else {
    alert("Not enough points");
  }
}

/* Update counter function */
async function updateCounter() {
  const h3text = parseInt($(".scorenum").text());

  if (h3text !== score) {
    $(".scorenum").text(score);
    h3.addClass("scoreupd");
    await sleep(51);
    h3.removeClass("scoreupd");
  }

  updateCostsAndUI();

  setCookies(score, buildings);
}

setInterval(updateCounter, 1000);