var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("Welcome to the Movie Search API v1.0");
});
/* GET Movie search. */
router.get("/api/search", getMovies);

async function getMovies(req, res, next) {
  let { keyword } = req.query;
  // allow cors for localhost and all
  res.header("Access-Control-Allow-Origin", "*");
  // if keyword not found then simply return not found res
  if (!keyword) {
    res.send({ status: 404, message: "Nothing Found", data: [] });
  }

  let apiURL = `http://www.omdbapi.com/?apikey=f887b97&s=${req.query.keyword}`;

  let pageOne = await fetch(`${apiURL}&page=1`)
    .then(data => data.json())
    .then(data => data);

  let pageTwo = await fetch(`${apiURL}&page=2`)
    .then(data => data.json())
    .then(data => data);

  res.send({
    status: 200,
    message: "Result Found",
    data: [...(pageOne.Search || []), ...(pageTwo.Search || [])]
  });
}

module.exports = router;
