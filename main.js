// score, upgrades, and buildings variables
let score = 0;
let buildings = [0, 0, 0, 0, 0];
// cost variables
let cursor_cost = 10;
let cursor_cost_decrease = 0.25;
let tree_cost = 100;
let tree_cost_decrease = 0.35;
let shed_cost = 1000;
let shed_cost_decrease = 0.45;
let farm_cost = 10000;
let farm_cost_decrease = 0.55;
let orange_orchard_cost = 100000;
let orange_orchard_cost_decrease = 0.65;
// extra variables
let h3 = document.getElementsByClassName("scorenum");
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

function getcookies(neededcookie) {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (neededcookie === "score" && cookie.startsWith("score=")) {
      score = parseInt(cookie.substring("score=".length));
      return score;
    }
    if (neededcookie === "buildings" && cookie.startsWith("buildings=")) {
      let newcookie = cookie.substring("buildings=".length).trim();
      try {
        return JSON.parse(newcookie); // Return the parsed buildings array
      } catch (e) {
        console.error("Failed to parse buildings cookie:", e);
        return null; // Handle JSON parsing errors
      }
    }
  }
  return null; // Default return value if cookie is not found
}

function setcookies(score, buildings) {
  let scorecookie = (document.cookie = "score=" + score + "; path=/");
  let buildingcookie = (document.cookie = `buildings=${JSON.stringify(
    buildings
  )}; path=/`);
}

/* Load cookie values on page (re)load */

if (getcookies("score") != null) {
  $(".scorenum").text(getcookies("score"));
  score = getcookies("score"); // update score value to avoid re-calculating it in case of page refresh or back navigation.
}

buildings = getcookies("buildings");
if (buildings !== null && Array.isArray(buildings)) {
  if (buildings.length > 0 && buildings[0] !== "undefined" && buildings[0] !== "NaN") {
    $(document).ready(function () {
      for (let i = 0; i < 5; i++) {
        // Cost Variable factoring
        cursor_cost = 10 * 2 ** buildings[0];
        tree_cost = 100 * 2 ** buildings[1];
        shed_cost = 1000 * 2 ** buildings[2];
        farm_cost = 10000 * 2 ** buildings[3];
        orange_orchard_cost = 100000 * 2 ** buildings[4];

        const cost_list = [
          cursor_cost, tree_cost, shed_cost, farm_cost, orange_orchard_cost,
        ];

        // Actual update function
        $(`.${building_owned[i]}`).text(`You Own: ${buildings[i]}`);
        $(`.${building_cost[i]}`).text(`Cost: ${cost_list[i]}`);

        // Factor in lost currency gain during loading sequence
        updatecounter();
      }
    });
  }
} else {
  buildings = [0, 0, 0, 0, 0];
  setcookies(score, buildings);
  for (let i = 0; i < 5; i++) {
    // Cost Variable factoring
    cursor_cost = 10 * 2 ** buildings[0];
    tree_cost = 100 * 2 ** buildings[1];
    shed_cost = 1000 * 2 ** buildings[2];
    farm_cost = 10000 * 2 ** buildings[3];
    orange_orchard_cost = 100000 * 2 ** buildings[4];

    const cost_list = [
      cursor_cost, tree_cost, shed_cost, farm_cost, orange_orchard_cost,
    ];

    $(`.${building_owned[i]}`).text(`You Own: ${buildings[i]}`);
    $(`.${building_cost[i]}`).text(`Cost: ${cost_list[i]}`);
  }
}

/* 
Save Menu functions
*/

function opensavemenus(menu) {
  const diag = document.getElementById(menu);
  diag.showModal();
}

function generatesavecode() {
  const diag = document.getElementById("save-code-made");
  let savecodetxt = document.getElementById("savecode");
  let savecode;
  if (buildings[0] > 9 || buildings[1] > 9 || buildings[2] > 9 || buildings[3] > 9 || buildings[4] > 9) {
    savecode = [
      buildings[0], ".", buildings[1], ".", buildings[2], ".", buildings[3], ".", buildings[4], "-", score,
    ];
  } else {
    savecode = [
      buildings[0], ".", buildings[1], ".", buildings[2], ".", buildings[3], ".", buildings[4], "-", score,
    ];
  }
  savecodetxt.innerHTML = savecode;
  diag.showModal();
}

function importsavecode() {
  let input = document.getElementById("imported-save-code").value;
  let inputvalue = input;
  let array;
  console.log(inputvalue);
  inputvalue.replace(",", " ");
  //TODO: Make sure this code works
  if (inputvalue == null) {
    return;
  }
  const splitcode = inputvalue.split("-");
  console.log(splitcode);
  console.log(splitcode);
  const buildings_array = splitcode[0];
  const scorecode = splitcode[1];
  const strtonum = (num) => Number(num);
  if (buildings_array.includes(".")) {
    const buildingsplitcode = buildings_array.split(".");
    const splitedcode = buildingsplitcode;
    array = Array.from(String(splitedcode), strtonum);
  } else {
    array = Array.from(String(buildings_array), strtonum);
  }

  for (var i = 0; i < 6; i++) {
    buildings[i] = array[i];
  }

  for (var i = 0; i < 5; i++) {
    // Cost Variable factoring
    cursor_cost = 10 * 2 ** buildings[0];
    tree_cost = 100 * 2 ** buildings[1];
    shed_cost = 1000 * 2 ** buildings[2];
    farm_cost = 10000 * 2 ** buildings[3];
    orange_orchard_cost = 100000 * 2 ** buildings[4];

    const cost_list = [
      cursor_cost, tree_cost, shed_cost, farm_cost, orange_orchard_cost,
    ];

    $(`.${building_owned[i]}`).text(`You Own: ${buildings[i]}`);
    $(`.${building_cost[i]}`).text(`Cost: ${cost_list[i]}`);
  }
}

/* Other Utility Functions (score, update GUI, etc.)*/

async function scoreupdate() {
  score++;
  if (buildings[0] > 0) {
    const totcursor = buildings[0];
    const upgradebonus = 0;
    score += totcursor;
    score += upgradebonus;
  }
  $(".scorenum").text(score);
  $(h3).addClass("scoreupd");
  await sleep(51);
  $(h3).removeClass("scoreupd");
  setcookies(score, buildings);
}

function purchase(building) {
  const buildingIndex = {
    cursor: { itemIndex: 0, baseCost: 10, ownedClass: ".cursor-owned", costClass: ".cursor-cost" },
    tree: { itemIndex: 1, baseCost: 100, ownedClass: ".tree-owned", costClass: ".tree-cost" },
    shed: { itemIndex: 2, baseCost: 1000, ownedClass: ".shed-owned", costClass: ".shed-cost" },
    farm: { itemIndex: 3, baseCost: 10000, ownedClass: ".farm-owned", costClass: ".farm-cost" },
    "orange orchard": { itemIndex: 4, baseCost: 100000, ownedClass: ".orange-owned", costClass: ".orange-cost" },
  };

  const buildingData = buildingIndex[building];

  if (!buildingData) {
    alert("There is a code error, please contact the developer. Code: 01");
    return;
  }

  const { itemIndex, baseCost, ownedClass, costClass } = buildingData;

  let currentCost = baseCost * Math.pow(2, buildings[itemIndex]);
  
  if (score >= currentCost) {
    score -= currentCost;
    buildings[itemIndex]++;
    updateCounter();
    setCookies(score, buildings);

    $(ownedClass).text(`You Own: ${buildings[itemIndex]}`);
    $(costClass).text(`Cost: ${currentCost}`);
  } else {
    alert("Not enough points!");
  }
}


async function updateCounter() {
  const h3text = parseInt($(".scorenum").text());

  // Update score display if the score has changed
  if (h3text !== score) {
    $(".scorenum").text(score);
    $(h3).addClass("scoreupd");
    await sleep(51);
    $(h3).removeClass("scoreupd");
  }

  const buildingBonuses = [
    { multiplier: 1, threshold: 10, bonusMultiplier: 5, base: 0 },    // Cursor
    { multiplier: 1, threshold: 10, bonusMultiplier: 5, base: 0 },    // Tree
    { multiplier: 10, threshold: 10, bonusMultiplier: 5, base: 0 },   // Shed
    { multiplier: 100, threshold: 10, bonusMultiplier: 5, base: 0 },  // Farm
    { multiplier: 1000, threshold: 10, bonusMultiplier: 5, base: 0 }, // Orange Orchard
  ];

  for (let i = 1; i < buildings.length; i++) {
    if (buildings[i] > 0) {
      let total = buildings[i] * buildingBonuses[i].multiplier;
      if (buildings[i] > buildingBonuses[i].threshold) {
        const bonus = total + buildingBonuses[i].base + (buildingBonuses[i].bonusMultiplier * 2);
        score += bonus;
      }
      score += total;
    }
  }

  $(".scorenum").text(score);
  $(h3).addClass("scoreupd");
  await sleep(51);
  $(h3).removeClass("scoreupd");

  setcookies(score, buildings);
}

setInterval(updatecounter, 1000);