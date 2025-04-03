const User = require('../models/user.model.js')
const { generateToken } = require('../utils/helpers.js')

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({
      name,
      email,
      password,
      role: role || 'user' // Default to 'user' if not provided
    });
    await user.save();
    // Generate JWT token
    const token = generateToken(user);
    console.log("token is: ", token)

    // Return user data without password
    res.status(201).json({
      token,
      user: user.getPublicProfile()
  }) 
} catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });  }
}

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);
    console.log("token is: ", token)

    // Return user data without password
    res.json({
      token,
      user: user.getPublicProfile()
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
    
        // Find and update the user
        const user = await User.findByIdAndUpdate(userId, updates, {
        new: true
        });
    
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
    
        res.json({ user: user.getPublicProfile() });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * @desc    Delete user
 * @route   POST /api/auth/delete
 * @access  Private
 */
const deleteUser = async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Server error" });
    }

}

module.exports = {
    login,
    register,
    updateUser,
    deleteUser
}