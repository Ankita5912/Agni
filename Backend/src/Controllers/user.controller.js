import { User } from '../Models/user.model.js';

//fetch user Api
export const fetchAllUser = async (req, res) => {
  try {
    const search = req.query.search || "";
    const users = await User.find({
      username: { $regex: `^${search}`, $options: "i" }
    }).limit(20).select("username _id"); // only return 20 max
    res.json(users);
    console.log(users)
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}


//fetch user by ID 
export const fetchById = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found"
      })
    }

    return res.status(200).json({
      user,
      message: 'User created successfully'
    })
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Internal server error",
        error: error.message
      })
  }
}