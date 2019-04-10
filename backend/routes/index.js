var express = require("express");
var router = express.Router();
const authRoutes = require("./auth");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send({"message": "Welcome to the React Node Stack API v1.0", "status": 200});
});

router.use("/auth", authRoutes)

module.exports = router;
