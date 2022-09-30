const express = require("express");
const router = express.Router();

const mySqlContext = require("../db/mySqlContext");

router.get("/", async (req, res) => {
  try {
    var users = await mySqlContext.query(`SELECT * FROM final.users`);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router