const express = require("express");
const router = express.Router();
const Artist = require("../models/artist.model");

/**
 * @desc    Register a new artist
 * @route   POST /api/auth/register
 * @access  Public
 */ 
router.post("/", );

// Get all artists
router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();
    res.send(artists);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get single artist
router.get("/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).send();
    res.send(artist);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update artist
router.patch("/:id", async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!artist) return res.status(404).send();
    res.send(artist);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete artist
router.delete("/:id", async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) return res.status(404).send();
    res.send(artist);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
