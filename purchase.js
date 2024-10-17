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