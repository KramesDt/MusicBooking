const express = require("express");
const router = express.Router();
const Event = require("../models/event.model");
const Artist = require("../models/artist.model");

// Create event
router.post("/", async (req, res) => {
  try {
    const artist = await Artist.findById(req.body.artist);
    if (!artist) return res.status(400).send("Artist not found");

    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("artist", "name genre");
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("artist");
    if (!event) return res.status(404).send();
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update event details
router.patch("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) return res.status(404).send();
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update event status
router.patch("/:id/status", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!event) return res.status(404).send();
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).send();
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
