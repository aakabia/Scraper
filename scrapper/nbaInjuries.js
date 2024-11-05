const { lstat } = require("fs");
const puppeteer = require("puppeteer"); // use puppeteer module

async function injuryScrapper() {
  const browser = await puppeteer.launch({ headless: false }); // headless: false allows you to see the browser
  const page = await browser.newPage();
  await page.goto(process.env.INJURIESURL);

  await page.waitForSelector("div > .TableBaseWrapper");

  const data = await page.evaluate(() => {
    const items = document.querySelectorAll(".TableBaseWrapper");

    // Above, gets all our divs we want to traverse through

    if (!items) {
      console.log("No elements to scrape from;");
      return;
    }

    // Above checks if we have any items to get information from

    function getTeamTitle(element) {
      try {
        if (!element) {
          console.log("No Element to scrape team title from!");
          return;
        }

        let firstDiv = element.firstElementChild;
        let titleH4 = firstDiv.firstElementChild;
        let teamLogo = titleH4.firstElementChild;
        let teamNameEntryDiv = teamLogo.children[1];
        let teamNameInnerDiv = teamNameEntryDiv.firstElementChild;
        let teamName = teamNameInnerDiv.firstElementChild.textContent.trim();

        return teamName;
      } catch (error) {
        console.error("Error Getting Team Name:", error);
        throw error;
      }
    }

    function getInjuryReportBody(element) {
      try {
        if (!element) {
          console.log("No Element to scrape table body from !");
          return;
        }

        let firstDiv = element.firstElementChild;
        let tableEntry = firstDiv.children[1];
        let tableEntryDiv = tableEntry.firstElementChild;
        let table = tableEntryDiv.firstElementChild;
        let tableBody = table.children[2];

        return tableBody;
      } catch (error) {
        console.error("Error Getting Player Injury Report From Body!:", error);
        throw error;
      }
    }

    function getDataForInjury(element) {
      try {
        if (!element) {
          console.log("No Element to scrape Data from!");
          return;
        }

        let playerNameData;
        let playerPositionData;
        let lastUpdatedData;
        let injuryTypeData;
        let injuryStatusData;

        let playerNameWrapper = element.firstElementChild;
        let playerNameCell = playerNameWrapper.firstElementChild;
        playerNameData = playerNameCell.firstElementChild.textContent.trim();
        playerPositionData = element.children[1].textContent
          .trim()
          .replace(/\s+/g, " ");
        lastUpdatedData =
          element.children[2].firstElementChild.textContent.trim();
        injuryTypeData = element.children[3].textContent.trim();
        injuryStatusData = element.children[4].textContent.trim();

        return {
          playerNameData,
          playerPositionData,
          lastUpdatedData,
          injuryTypeData,
          injuryStatusData,
        };
      } catch (error) {
        console.error("Error Getting Injury Data:", error);
        throw error;
      }
    }

    // Above are helper functions that traverse through the dom and extract data from a element.

    let results = [];

    for (const item of items) {
      let newTableBody = getInjuryReportBody(item);
      let teamNameData = getTeamTitle(item);

      for (const child of newTableBody.children) {
        let {
          playerNameData,
          playerPositionData,
          lastUpdatedData,
          injuryTypeData,
          injuryStatusData,
        } = getDataForInjury(child);

        let teamDataOBJ = {
          teamName: teamNameData,
          teamInjuredPlayer: {
            Name: playerNameData,
            Position: playerPositionData,
            lastUpdated: lastUpdatedData,
            injuryType: injuryTypeData,
            injuryStatus: injuryStatusData,
          },
        };

        results.push(teamDataOBJ);
      }
    }

    // Above, loops through our items and uses our helper functions to extract data from the dom.
    // We format this data into a object and push it to our results array.

    return results;
  });

  //console.log(data);

  await new Promise((resolve) => setTimeout(resolve, 10000));

  await browser.close();

  return data;

  // Above, returns our data.
}

module.exports = injuryScrapper;
