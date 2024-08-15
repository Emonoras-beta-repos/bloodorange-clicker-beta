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
  let newcookie;
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (neededcookie === "score") {
      if (cookie.startsWith("score=")) {
        score = parseInt(cookie.substring("score=".length));
        return score;
      }
    }
    if (neededcookie === "buildings") {
      if (cookie.startsWith("buildings=")) {
        console.log(cookie);
        if (cookie.charAt(9) == "=") {
          newcookie = cookie.replace("=", " ");
          newcookie.trim();
        }
        console.log(i);
        console.log(newcookie);
        let dcodeca = JSON.parse(
          "[" + newcookie.substring("buildings".length) + "]"
        );
        console.log(newcookie);
        console.log(dcodeca);
        if (
          typeof dcodeca != "undefined" &&
          dcodeca != "NaN" &&
          dcodeca != null
        ) {
          buildings = dcodeca;
        }
      }
    }
  }
}

function setcookies(score, buildings) {
  document.cookie = "score=" + score + "; path=/";
  console.log(score);
  console.log(buildings);
  let buildingcookie = (document.cookie =
    "buildings=" + JSON.stringify(buildings) + "; path=/");
  console.log(buildingcookie);
}

// load cookies on page load and update score value accordingly.
buildings = getcookies("buildings");
console.log(buildings);
if (getcookies("score") != null) {
  $(".scorenum").text(getcookies("score"));
  score = getcookies("score"); // update score value to avoid re-calculating it in case of page refresh or back navigation.
}
if (
  buildings !== null &&
  typeof buildings !== "undefined" &&
  buildings !== "NaN"
) {
  buildings = getcookies("buildings"); // update buildings value to avoid re-calculating it in case of page refresh or back navigation.
  console.log(buildings);
  if (buildings != "undefined" && buildings != "NaN" && buildings != null) {
    console.log(buildings);
    $(".cursor-owned").text("You Own: " + buildings[0]);
    $(".cursor-cost").text("Cost: " + 10 * Math.pow(2, buildings[0]));
    ccost = 10 * Math.pow(2, buildings[0]);
  }
  //buildings = [0,0,0,0,0];
  console.log(buildings);
} else {
  buildings = [0, 0, 0, 0, 0];
  setcookies(score, buildings);
  setcookies(score, buildings); // update buildings value to avoid re-cal
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
      scoreupdate(score);
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
