import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res) => {
  try {
    const { name, gender, email, password, confirmPassword } = req.body;

    if (!name || !gender || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      gender,
      email,
      password,
    });

    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            
            generateToken(res, user._id);
            
            res.json({ message: "Login successful!" });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) { 
        res.status(500).json({ message: error.message });
     }
};

export const getProfile = (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

export const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
};