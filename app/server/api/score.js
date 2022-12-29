const router = require("express").Router()

router.post('/score', async (req, res) => {
  if (req.body.lat && req.body.lon) {
    res.status(200).json({
      "lat": req.body.lat,
      "long": req.body.long
    })
  } else {
    res.status(400).json({ 
      "error": true, 
      "message": "Please provide a lat and long field in the body" })
  }
  res.status(500).json({
    "error": true,
    "message": "Something when wrong :("
  })
});

module.exports = router

