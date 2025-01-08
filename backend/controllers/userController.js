import User from "../models/User.js";

// create new User

export const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();

    res.status(200).json({
      sucess: true,
      message: "Sucessfully Created",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: "Failed to create. try again",
    });
  }
};

//update User
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      sucess: true,
      message: "Sucessfully Updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: "Failed to update",
    });
  }
};

//delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      sucess: true,
      message: "Sucessfully Deleted",
      data: deleteUser,
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: "Failed to delete",
    });
  }
};

//  getSingleUser
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    res.status(200).json({
      sucess: true,
      message: "Sucessfull",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      sucess: false,
      message: "not found",
    });
  }
};

//getAll User
export const getAllUser = async (req, res) => {

  try {
    const users = await User.find({});

    res.status(200).json({
      sucess: true,
      message: "Sucessfull",
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      sucess: false,
      message: "not found",
    });
  }
};
