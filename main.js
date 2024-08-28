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
let cost_list = [
  "cursor_cost",
  "tree_cost",
  "shed_cost",
  "farm_cost",
  "orange_orchard_cost",
];
let building_cost = [
  "cursor-cost",
  "tree-cost",
  "shed-cost",
  "farm-cost",
  "orange-orchard-cost",
];
let building_owned = [
  "cursor-owned",
  "tree-owned",
  "shed-owned",
  "farm-owned",
  "orange-orchard-owned",
];
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
        let dcodeca = JSON.parse(newcookie);
        return dcodeca; // Return the parsed buildings array
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
  //console.log(score);
  //console.log(buildings);
  let buildingcookie = (document.cookie =
    "buildings=" + JSON.stringify(buildings) + "; path=/");
  //console.log(buildingcookie);
  //console.log(scorecookie);
}

// load cookies on page load and update score value accordingly.
if (getcookies("score") != null) {
  $(".scorenum").text(getcookies("score"));
  score = getcookies("score"); // update score value to avoid re-calculating it in case of page refresh or back navigation.
}

buildings = getcookies("buildings");
console.log(buildings);
if (buildings !== null && Array.isArray(buildings)) {
  if (
    buildings.length > 0 &&
    buildings[0] !== "undefined" &&
    buildings[0] !== "NaN"
  ) {
    console.log(buildings);
    $(document).ready(function () {
      for (var i = 0; i < 5; i++) {
        let costaddon;

        if (i == 2) {
          costaddon = 100;
        } else if (i == 3) {
          costaddon = 1000;
        } else if (i == 4) {
          costaddon = 10000;
        } else {
          costaddon = 10;
        }

        cursor_cost = 10 * Math.pow(2, buildings[0]);
        tree_cost = 100 * Math.pow(2, buildings[1]);
        shed_cost = 1000 * Math.pow(2, buildings[2]);
        farm_cost = 10000 * Math.pow(2, buildings[3]);
        orange_orchard_cost = 100000 * Math.pow(2, buildings[4]);
        console.log(building_owned[i]);
        console.log(building_cost[i]);
        $(building_owned[i]).text("You Own: " + buildings[i]);
        $(building_cost[i]).text(
          "Cost: " + costaddon * Math.pow(2, buildings[i])
        );

        let test = $(building_owned[i]);
        console.log(test);

        updatecounter();
      }
    });
    /*
    $(".cursor-owned").text("You Own: " + buildings[0]);
    $(".cursor-cost").text("Cost: " + 10 * Math.pow(2, buildings[0]));
    cursor_cost = 10 * Math.pow(2, buildings[0]);
    tree_cost = 10 * Math.pow(2, buildings[1]);
    $(".tree-owned").text("You Own: " + buildings[1]);
    $(".tree-cost").text("Cost: " + 100 * Math.pow(2, buildings[1]));
    shed_cost = 1000 * Math.pow(2, buildings[2]);
    $(".shed-owned").text("You Own: " + buildings[2]);
    $(".shed-cost").text("Cost: " + 1000 * Math.pow(2, buildings[2]));
    farm_cost = 10000 * Math.pow(2, buildings[3]);
    $(".farm-owned").text("You Own: " + buildings[3]);
    $(".farm-cost").text("Cost: " + 10000 * Math.pow(2, buildings[3]));
    orange_orchard_cost = 100000 * Math.pow(2, buildings[4]);
    $(".orange-orchard-owned").text("You Own: " + buildings[4]);
    $(".orange-orchard-cost").text("Cost: " + 100000 * Math.pow(2, buildings[4]));
    */
  }
} else {
  buildings = [0, 0, 0, 0, 0];
  setcookies(score, buildings);
  cursor_cost = 10 * Math.pow(2, buildings[0]);
  $(".cursor-owned").text("You Own: " + buildings[0]);
  $(".cursor-cost").text("Cost: " + 10 * Math.pow(2, buildings[0]));
  tree_cost = 100 * Math.pow(2, buildings[1]);
  $(".tree-owned").text("You Own: " + buildings[1]);
  $(".tree-cost").text("Cost: " + 100 * Math.pow(2, buildings[1]));
  farm_cost = 10000 * Math.pow(2, buildings[3]);
  $(".farm-owned").text("You Own: " + buildings[3]);
  $(".farm-cost").text("Cost: " + 10000 * Math.pow(2, buildings[3]));
}

async function scoreupdate() {
  score++;
  if (buildings[0] > 0) {
    let totcursor = buildings[0];
    let upgradebonus = 0;
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
  if (building == "cursor") {
    if (score >= cursor_cost) {
      score -= cursor_cost;
      updatecounter();
      console.log(buildings);
      buildings.splice(0, 1, buildings[0] + 1);
      console.log(buildings);
      setcookies(score, buildings);
      cursor_cost = 10 * Math.pow(2, buildings[0]);
      if (cursor_cost >= 1000) {
        cursor_cost = cursor_cost / 2;
        if (typeof cursor_cost === "number" && !Number.isInteger(cursor_cost)) {
          cursor_cost = Math.floor(cursor_cost);
        }
      }
      if (cursor_cost >= 10000) {
        cursor_cost = cursor_cost * cursor_cost_decrease;
        if (typeof cursor_cost === "number" && !Number.isInteger(cursor_cost)) {
          cursor_cost = Math.floor(cursor_cost);
        }
      }
      $(".cursor-owned").text("You Own: " + buildings[0]);
      $(".cursor-cost").text("Cost: " + cursor_cost);
    } else {
      alert("Not enough points!");
    }
  }
  if (building == "tree") {
    if (score >= tree_cost) {
      score -= tree_cost;
      updatecounter();
      console.log(buildings);
      buildings.splice(1, 1, buildings[1] + 1);
      console.log(buildings);
      setcookies(score, buildings);
      tree_cost = 100 * Math.pow(2, buildings[1]);
      if (tree_cost >= 10000) {
        tree_cost = tree_cost / 2;
        if (typeof tree_cost === "number" && !Number.isInteger(tree_cost)) {
          tree_cost = Math.floor(tree_cost);
        }
      }
      if (tree_cost >= 100000) {
        tree_cost = tree_cost * tree_cost_decrease;
        if (typeof tree_cost === "number" && !Number.isInteger(tree_cost)) {
          tree_cost = Math.floor(tree_cost);
        }
      }
      $(".tree-owned").text("You Own: " + buildings[1]);
      $(".tree-cost").text("Cost: " + tree_cost);
    } else {
      alert("Not enough points!");
    }
  }
  if (building == "shed") {
    if (score >= shed_cost) {
      score -= shed_cost;
      updatecounter();
      console.log(buildings);
      buildings.splice(2, 1, buildings[2] + 1);
      console.log(buildings);
      setcookies(score, buildings);
      shed_cost = 1000 * Math.pow(2, buildings[2]);
      if (shed_cost >= 100000) {
        shed_cost = shed_cost / 2;
        if (typeof shed_cost === "number" && !Number.isInteger(shed_cost)) {
          shed_cost = Math.floor(shed_cost);
        }
      }
      if (shed_cost >= 1000000) {
        shed_cost = shed_cost * shed_cost_decrease;
        if (typeof shed_cost === "number" && !Number.isInteger(shed_cost)) {
          shed_cost = Math.floor(shed_cost);
        }
      }
      $(".shed-owned").text("You Own: " + buildings[2]);
      $(".shed-cost").text("Cost: " + shed_cost);
    } else {
      alert("Not enough points!");
    }
  }
  if (building == "farm") {
    if (score >= farm_cost) {
      score -= farm_cost;
      updatecounter();
      console.log(buildings);
      buildings.splice(3, 1, buildings[3] + 1);
      console.log(buildings);
      setcookies(score, buildings);
      farm_cost = 10000 * Math.pow(2, buildings[3]);
      if (farm_cost >= 1000000) {
        farm_cost = farm_cost / 2;
        if (typeof farm_cost === "number" && !Number.isInteger(farm_cost)) {
          farm_cost = Math.floor(farm_cost);
        }
      }
      if (farm_cost >= 10000000) {
        farm_cost = farm_cost * farm_cost_decrease;
        if (typeof farm_cost === "number" && !Number.isInteger(farm_cost)) {
          farm_cost = Math.floor(farm_cost);
        }
      }
      $(".farm-owned").text("You Own: " + buildings[3]);
      $(".farm-cost").text("Cost: " + farm_cost);
    } else {
      alert("Not enough points!");
    }
  }
  if (building == "orange orchard") {
    if (score >= orange_cost) {
      score -= orange_cost;
      updatecounter();
      console.log(buildings);
      buildings.splice(4, 1, buildings[4] + 1);
      console.log(buildings);
      setcookies(score, buildings);
      orange_cost = 100000 * Math.pow(2, buildings[4]);
      if (orange_cost >= 1000000) {
        orange_cost = orange_cost / 2;
        if (typeof orange_cost === "number" && !Number.isInteger(orange_cost)) {
          orange_cost = Math.floor(orange_cost);
        }
      }
      if (orange_cost >= 10000000) {
        orange_cost = orange_cost * orange_cost_decrease;
        if (typeof orange_cost === "number" && !Number.isInteger(orange_cost)) {
          orange_cost = Math.floor(orange_cost);
        }
      }
      $(".orange-owned").text("You Own: " + buildings[4]);
      $(".orange-cost").text("Cost: " + orange_cost);
    }
  }
}
async function updatecounter() {
  let h3text = parseInt($(".scorenum").text());
  if (h3text < score || h3text > score) {
    $(".scorenum").text(score);
    $(h3).addClass("scoreupd");
    await sleep(51);
    $(h3).removeClass("scoreupd");
  }
  if (buildings[1] > 0) {
    let tottree = buildings[1];
    let upgradebonus = 0;
    if (buildings[1] > 10) {
      let treebonus = tottree + upgradebonus + 5 * 2;
      score += treebonus;
    }
    score += tottree;
    score += upgradebonus;
    $(".scorenum").text(score);
    $(h3).addClass("scoreupd");
    await sleep(51);
    $(h3).removeClass("scoreupd");
  }
  if (buildings[2] > 0) {
    let totshed = buildings[2];
    totshed = totshed * 10;
    let upgradebonus = 0;
    if (buildings[1] > 10) {
      let shedbonus = totshed + upgradebonus + 5 * 2;
      score += shedbonus;
    }
    score += totshed;
    score += upgradebonus;
    $(".scorenum").text(score);
    $(h3).addClass("scoreupd");
    await sleep(51);
    $(h3).removeClass("scoreupd");
  }
  if (buildings[3] > 0) {
    let totalfarm = buildings[3];
    totalfarm = totalfarm * 100;
    let upgradebonus = 0;
    if (buildings[1] > 10) {
      let farmbonus = totfarm + upgradebonus + 5 * 2;
      score += farmbonus;
    }
    score += totalfarm;
    score += upgradebonus;
    $(".scorenum").text(score);
    $(h3).addClass("scoreupd");
    await sleep(51);
    $(h3).removeClass("scoreupd");
  }
  if (buildings[4] > 0) {
    let totalorange = buildings[4];
    totalorange = totalorange * 1000;
    let upgradebonus = 0;
    if (buildings[1] > 10) {
      let orchardbonus = totorange + upgradebonus + 5 * 2;
      score += orchardbonus;
    }
    score += totalorange;
    score += upgradebonus;
    $(".scorenum").text(score);
    $(h3).addClass("scoreupd");
    await sleep(51);
    $(h3).removeClass("scoreupd");
  }
  setcookies(score, buildings);
}
setInterval(updatecounter, 1000);
