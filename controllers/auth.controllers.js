const Artist = require('../models/artist.model.js')

const register = async (req, res) => {
  try {
    const { name, email, password, phoneNo, genre, availability} = req.body
    let artist = await Artist.findOne({ email })
    if (artist) {
      return res.status(400).json({ message: "Artist already exists" });
    }
    artist = new Artist({
      name,
      email,
      password,
      phoneNo,
      genre,
      availability,
    });
    await artist.save();
    // Generate JWT token
    const token = generateToken(artist);
    console.log("token is: ", token)

    // Return artist data without password
    res.status(201).json({
      token,
      artist: artist.getPublicProfile()
  }) 
} catch (error) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });  }
}

/**
 * @desc    Login artist
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if artist exists
    const artist = await Artist.findOne({ email });
    if (!artist) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await artist.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(artist);

    // Return artist data without password
    res.json({
      token,
      artist: artist.getPublicProfile()
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateArtist = async (req, res) => {
    try {
        const artistId = req.params.id;
        const updates = req.body;
    
        // Find and update the artist
        const artist = await Artist.findByIdAndUpdate(artistId, updates, {
        new: true
        });
    
        if (!artist) {
        return res.status(404).json({ message: 'Artist not found' });
        }
    
        res.json({ artist: artist.getPublicProfile() });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * @desc    Delete artist
 * @route   POST /api/auth/delete
 * @access  Private
 */
const deleteArtist = async(req, res) => {
    try {
        const artistId = req.params.id;
        Artist.findByIdAndDelete(artistId)
        res.json({message: 'Artist Deleted'})
    } catch (error) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Server error" });
    }

}

module.exports = {
    login,
    register,
    updateArtist,
    deleteArtist
}