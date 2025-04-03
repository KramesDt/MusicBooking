const Artist = require("../models/artist.model.js");

const register = async (req, res) => {
  try {
    const { name, email, password, phoneNo, genre, availability } = req.body;
    let artist = await Artist.findOne({ email });
    if (artist) {
      return res.status(400).json({ message: "Artist already exists" });
    }
    artist = new Artist({
      name,
      email,
      phoneNo,
      genre,
      availability,
    });
    await artist.save();
    // Return artist data without password
    res.status(201).json({
      artist
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json({ artists });
  } catch (err) {
    console.error("Get all artists error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

const getArtistById = async (req, res) => {
  try {
    const artistId = req.params.id;
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.json({ artist });
  } catch (err) {
    console.error("Get artist by ID error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

const updateArtist = async (req, res) => {
  try {
    const artistId = req.params.id;
    const updates = req.body;

    // Find and update the artist
    const artist = await Artist.findByIdAndUpdate(artistId, updates, {
      new: true,
    });

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.json({ artist: artist });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Delete artist
 * @route   POST /api/auth/delete
 * @access  Admin
 */
const deleteArtist = async (req, res) => {
  try {
    const artistId = req.params.id;
    Artist.findByIdAndDelete(artistId);
    res.json({ message: "Artist Deleted" });
  } catch (error) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
};
