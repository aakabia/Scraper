const puppeteer = require("puppeteer"); // use puppeteer module

async function getTeamsDataByYear(year) {
  // Above we create our fucntion and pass in a year to be able to get data for a specific year.
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(
      `https://www.basketball-reference.com/leagues/NBA_${year}.html`
    );

    // Above we launch puppeteer with our url and year as a string

    const makeCsvDataAppear = await page.evaluate(() => {
      const perGameDiv = document.querySelector("#all_per_game_team-opponent");
      const totalStatsDiv = document.querySelector("#all_totals_team-opponent");
      const per100PosDiv = document.querySelector(
        "#all_per_poss_team-opponent"
      );
      const advanceStatsDiv = document.querySelector("#all_advanced_team");
      const teamShootingStatsDiv = document.querySelector(
        "#all_shooting_team-opponent"
      );

      // In page.evaluate we query select our most outter divs the csv data lives in

      let teamStatsArray = [
        perGameDiv,
        totalStatsDiv,
        per100PosDiv,
        advanceStatsDiv,
        teamShootingStatsDiv,
      ];
      let buttons = [];

      // We store these divs in a array and initalize an empty buttons array

      for (const div of teamStatsArray) {
        let headingDiv = div.children[1];
        let headingTextDiv = headingDiv.children[2];
        let ul = headingTextDiv.firstElementChild;
        let buttonLi = ul.children[1];
        let buttondiv = buttonLi.children[1];
        let buttonDivUL = buttondiv.firstElementChild;
        let csvButtonLi = buttonDivUL.children[2];
        let csvButton = csvButtonLi.firstElementChild;

        if (csvButton) {
          buttons.push(csvButton);
        } else if (!csvButton) {
          console.log(
            "OOP one or more divs in teamStatsArray not returning a csvButton"
          );
        }
      }

      // we loop through all our divs and travers the dom to get to the button
      // if the button exists we push it to our buttons array

      buttons.forEach((button) => {
        console.log(`Clicking button:`, button.innerHTML);
        button.click();
      });

      // loop through each button and click it to show csv data.
    });

    await page.waitForSelector("#csv_per_game-team");
    await page.waitForSelector("#csv_totals-team");
    await page.waitForSelector("#csv_per_poss-team");
    await page.waitForSelector("#csv_advanced-team");
    //await page.waitForSelector("#csv_shooting-team");

    // Above waits for the page to load these selectors once the button is clicked 

    const csvObjects = await page.evaluate(() => {
      const perGamePre = document.querySelector("#csv_per_game-team");
      const totalStatsPre = document.querySelector("#csv_totals-team");
      const per100PosPre = document.querySelector("#csv_per_poss-team");
      const advanceStatsPre = document.querySelector("#csv_advanced-team");
      //const teamShootingStatsPre = document.querySelector("#csv_shooting-team");

      // Get the text content from our CSV elements
      const perGameCSV = perGamePre ? perGamePre.textContent : null;
      const totalStatsCSV = totalStatsPre ? totalStatsPre.textContent : null;
      const per100PosCSV = per100PosPre ? per100PosPre.textContent : null;
      const advancedStatsCSV = advanceStatsPre
        ? advanceStatsPre.textContent
        : null;
      /*const teamShootingCSV = teamShootingStatsPre
        ? teamShootingStatsPre.textContent
        : null;*/
      // get the text content from our csv elements

      return {
        perGameCSV,
        totalStatsCSV,
        per100PosCSV,
        advancedStatsCSV,
        //teamShootingCSV,
      };
      // return object with our csv content
    });

    for(key in csvObjects){
        let rawData = csvObjects[key];

        let headerIndex = rawData.indexOf("Rk");
        // Step 2: Extract the data starting from "Rk"
        let cleanedData = rawData.slice(headerIndex).trim();

        let rows = cleanedData.split('\n');

        let filteredRows = rows.filter(row => !row.includes('League Average'));

        let cleanedCSV = filteredRows.join('\n');

        // Above, clears a certain row out of our data 


        csvObjects[key] = cleanedCSV;

    }

    //console.log(csvObjects);


    await new Promise((resolve) => setTimeout(resolve, 10000));

    await browser.close();

    return csvObjects

  } catch (error) {
    console.error("Error getting CSV Objects:", error);
    throw error;
  }
}





module.exports = getTeamsDataByYear;
