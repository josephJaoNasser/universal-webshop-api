const express = require('express')
const router = express.Router()

router.get("/api/ping", (req, res) => {
  return res
    .status(200)
    .send(
      "PING PING PING! Successfully connected to API! This is the connection test route"
    );
});

module.exports = router