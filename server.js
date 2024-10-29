require('dotenv').config(); // for environment variables
const scrapper = require("./scrapper/scrape");

async function test(){
   console.log( await scrapper());
}

test();

// Above is a async test function to test our scrapper function from the scrape script.