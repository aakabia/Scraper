let NbaTeamAbrs = {
  "Cleveland Cavaliers": "CLE",
  "Detroit Pistons": "DET",
  "Sacramento Kings": "SAC",
  "Atlanta Hawks": "ATL",
  "Chicago Bulls": "CHI",
  "Houston Rockets": "HOU",
  "Boston Celtics": "BOS",
  "Toronto Raptors": "TOR",
  "Memphis Grizzlies": "MEM",
  "Phoenix Suns": "PHX",
  "Los Angeles Clippers": "LAC",
  "New York Knicks": "NYK",
  "Oklahoma City Thunder": "OKC",
  "Orlando Magic": "ORL",
  "Dallas Mavericks": "DAL",
  "Indiana Pacers": "IND",
  "Minnesota Timberwolves": "MIN",
  "Brooklyn Nets": "BKN",
  "Golden State Warriors": "GSW",
  "Milwaukee Bucks": "MIL",
  "San Antonio Spurs": "SAS",
  "Los Angeles Lakers": "LAL",
  "Portland Trail Blazers": "POR",
  "New Orleans Pelicans": "NOP",
  "Miami Heat": "MIA",
  "Washington Wizards": "WAS",
  "Charlotte Hornets": "CHA",
  "Utah Jazz": "UTA",
  "Denver Nuggets": "DEN",
  "Philadelphia 76ers": "PHI",
};

function getTeamAbr(teamName) {

    if(!teamName){
        console.log("team Name required!")
        return
    }

    let teamAbr= NbaTeamAbrs[teamName];

    if (!teamAbr) {
        console.log(`Abbreviation not found for team: ${teamName}`);
        return;
    }

    return teamAbr
}


module.exports = { getTeamAbr };