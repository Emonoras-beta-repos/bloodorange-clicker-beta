// score, upgrades, and buildings variables
let score = 0;
let buildings = [0, 0, 0, 0, 0];
// cost variables
let ccost = 10;
// extra variables
let h3 = document.getElementsByClassName("scorenum");

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
  console.log(score);
  console.log(buildings);
  let buildingcookie = (document.cookie =
    "buildings=" + JSON.stringify(buildings) + "; path=/");
  console.log(buildingcookie);
  console.log(scorecookie);
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
    $(".cursor-owned").text("You Own: " + buildings[0]);
    $(".cursor-cost").text("Cost: " + 10 * Math.pow(2, buildings[0]));
    ccost = 10 * Math.pow(2, buildings[0]);
  }
} else {
  buildings = [0, 0, 0, 0, 0];
  setcookies(score, buildings);
  ccost = 10 * Math.pow(2, buildings[0]);
  $(".cursor-owned").text("You Own: " + buildings[0]);
  $(".cursor-cost").text("Cost: " + 10 * Math.pow(2, buildings[0]));
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
    if (score >= ccost) {
      score -= ccost;
      scoreupdate();
      console.log(buildings);
      buildings.splice(0, 1, buildings[0] + 1);
      console.log(buildings);
      setcookies(score, buildings);
      $(".cursor-owned").text("You Own: " + buildings[0]);
      $(".cursor-cost").text("Cost: " + 10 * Math.pow(2, buildings[0]));
      ccost = 10 * Math.pow(2, buildings[0]);
    } else {
      alert("Not enough points!");
    }
  }
}
async function updatecounter() {
  let h3text = parseInt($(".scorenum").text());
  if (h3text < score) {
    $(".scorenum").text(score);
    $(h3).addClass("scoreupd");
    await sleep(51);
    $(h3).removeClass("scoreupd");
  }
  setcookies(score, buildings);
}
setInterval(updatecounter, 1000);
