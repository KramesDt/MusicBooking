const express = require("express");
const router = express.Router();
const Event = require("../models/event.model");
const Artist = require("../models/artist.model");

/**
 * @desc    Create event
 * @route   POST /api/event/
 * @access  Private
 */
const createEvent = async (req, res) => {
  try {
    const artist = await Artist.findById(req.body.artist);
    if (!artist) return res.status(400).send("Artist not found");

    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * @desc    Get all events
 * @route   GET /api/event/
 * @access  Private
 */
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("artist", "name genre");
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * @desc    Get Event By Id
 * @route   POST /api/event/:id
 * @access  Private
 */
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("artist");
    if (!event) return res.status(404).send();
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * @desc    Update event
 * @route   PUT /api/event/update/:id
 * @access  Private
 */
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) return res.status(404).send();
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * @desc    Update event status
 * @route   PUT /api/event/status/:id
 * @access  Private
 */
const updateEventStatus = async (req, res) => {
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
};

/**
 * @desc    Delete event
 * @route   DELETE /api/event/:id
 * @access  Private
 */
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).send();
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    updateEventStatus,
    deleteEvent
};
