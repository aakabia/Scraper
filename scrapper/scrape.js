const puppeteer = require("puppeteer"); // use puppeteer module

async function scrapper() {
  const browser = await puppeteer.launch({ headless: false }); // headless: false allows you to see the browser
  const page = await browser.newPage();
  await page.goto(process.env.URL);

  // Above creates our puppeteer instance

  await page.waitForSelector("div > .bet-packs-wrapper");

  // Above, waits for a specific selector to become ready on the dom.

  const data = await page.evaluate(() => {
    // page.evaluate is where the functionality for our scrape will take place.
    
    const element = document.querySelectorAll(".bet-packs-wrapper");
    let liveBets;
    let upcomingBets;

    if (element.length > 1) {
      liveBets = element[0];
      upcomingBets = element[1];
    } else {
      upcomingBets = element[0];
    }

    // our page is dynamic so we want to make sure we grab the right div containing .bet-packs-wrapper each time we run the script.

    function getGameTitleAndDate(element) {
      try {
        const div = element;
        const divData = div.firstElementChild;
        const gameTitle = divData.children[0].firstElementChild.textContent;

        const tableElement = divData.children[1].firstElementChild;
        const tableHead = tableElement.firstElementChild;
        const tableHeadRow = tableHead.firstElementChild;
        const date =
          tableHeadRow.querySelector(".Ta\\(start\\)").firstElementChild
            .textContent;

        return { gameTitle, date };
      } catch (error) {
        console.error("Error Getting title and Date:", error);
        throw error;
      }
    }

    function getFirstTeamInformation(element) {
      try {
        const divData = element.firstElementChild;
        const tableElement = divData.children[1].firstElementChild;
        const tableBody = tableElement.children[1];
        const firstTeamRow = tableBody.firstElementChild;
        const firstTeamRowData1 = firstTeamRow.firstElementChild;
        const firstTeamRowData2 = firstTeamRow.children[1];
        const firstTeamRowData3 = firstTeamRow.children[2];
        const firstTeamRowData4 = firstTeamRow.children[3];

        const firstTeamRowDiv = firstTeamRowData1.firstElementChild;
        const firstTeamName = firstTeamRowDiv.children[1].textContent;
        const firstTeamRecord = firstTeamRowDiv.children[2].textContent;
        const firstTeamOdds = getTeamodds(firstTeamRowData2);
        const firstTeamSpread = getTeamodds(firstTeamRowData3);
        const firstTeamPointTotal = getTeamodds(firstTeamRowData4);
        const drawOddsdata = getDrawOdds(tableBody);

        return {
          firstTeamName,
          firstTeamRecord,
          firstTeamOdds,
          firstTeamSpread,
          firstTeamPointTotal,
          tableBody,
          drawOddsdata,
        };
      } catch (error) {
        console.error("Error Getting first team row! :", error);
        throw error;
      }
    }

    function getSecondTeamInformation(element) {
      try {
        const secondTeamRow = element.children[1];
        const secondTeamRowData1 = secondTeamRow.firstElementChild;
        const secondTeamRowData2 = secondTeamRow.children[1];
        const secondTeamRowData3 = secondTeamRow.children[2];
        const secondTeamRowData4 = secondTeamRow.children[3];

        const secondTeamRowDiv = secondTeamRowData1.firstElementChild;
        const secondTeamName = secondTeamRowDiv.children[1].textContent;
        const secondTeamRecord = secondTeamRowDiv.children[2].textContent;
        const secondTeamOdds = getTeamodds(secondTeamRowData2);
        const secondTeamSpread = getTeamodds(secondTeamRowData3);
        const secondTeamPointTotal = getTeamodds(secondTeamRowData4);

        return {
          secondTeamName,
          secondTeamRecord,
          secondTeamOdds,
          secondTeamPointTotal,
          secondTeamSpread,
        };
      } catch (error) {
        console.error("Error Getting first team row! :", error);
        throw error;
      }
    }

    function getTeamodds(element) {
      try {
        const teamDataDiv = element.firstElementChild;
        const teamDataInnerDiv = teamDataDiv.firstElementChild;
        let teamDataButton;
        let teamDataSpan
        let teamInfo

        if(teamDataInnerDiv.children.length >= 2){
            teamDataButton = teamDataInnerDiv.children[1];        
            teamDataSpan = teamDataButton.children[1];
            teamInfo = teamDataSpan.firstElementChild.textContent;
        }
    
  

        return teamInfo ? teamInfo : "No odds publised yet!";
      } catch (error) {
        console.error("Error Getting first team row! :", error);
        throw error;
      }
    }

    function getDrawOdds(element) {
      try {
        let drawRow;
        let drawOdds;

        if (element.children[2]) {
          drawRow = element.children[2];
          const drawdata = drawRow.children[1];
          drawOdds = getTeamodds(drawdata);
        }

        return drawOdds ? drawOdds : "No draws for this game!";
      } catch (error) {
        console.error("Error Getting drawOdds!:", error);
        throw error;
      }
    }

    // Above our helper functions that assist with traversing the dom and retrieving a certain element or elements.
    // They all take in a element begin searching the dom from that element.
    // getTeamodds is used in both getSecondTeamInformation and getFirstTeamInformation to extract data from the table.
    // getdrawOdds is used in only getFirstTeamInformation to extract the draw odds for both teams in the table.

    let allTeamsInfo = [];
    // Above initializes our results array.

    for (const child of upcomingBets.children) {
      const { gameTitle, date } = getGameTitleAndDate(child);
      const {
        firstTeamName,
        firstTeamRecord,
        firstTeamOdds,
        firstTeamSpread,
        firstTeamPointTotal,
        tableBody,
        drawOddsdata,
      } = getFirstTeamInformation(child);

      const {
        secondTeamName,
        secondTeamRecord,
        secondTeamOdds,
        secondTeamPointTotal,
        secondTeamSpread,
      } = getSecondTeamInformation(tableBody);

      allTeamsInfo.push({
        gameTitle,
        date,
        firstTeamName,
        firstTeamRecord,
        firstTeamOdds,
        firstTeamSpread,
        firstTeamPointTotal,
        drawOddsdata,
        secondTeamName,
        secondTeamRecord,
        secondTeamOdds,
        secondTeamSpread,
        secondTeamPointTotal,
      });
    }

    // Above we loop through our parent element, use destructuring for results and pass its children through getGameTitleAndDate to get the game title and date.
    // Also we pass the children to getFirstTeamInformation to get the information for team 1
    // next we pass the table body from getFirstTeamInformation results into getSecondTeamInformation to get the information for team 2.
    // Last we push our results for each child as one object into the  allTeamsInfo array.

    return allTeamsInfo;

    // Above, we return our result
  });

  //console.log(data);

  await new Promise((resolve) => setTimeout(resolve, 10000));

  // Above keeps our browser instance running for ten seconds with setTimeout and resolve.

  await browser.close();

  // Above, we close our browser

  return data;
  // Above, our outter function scrapper returns our data.
}

module.exports = scrapper;
// Above, we export our function for use.

