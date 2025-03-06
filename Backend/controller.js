const User = require("./user");

const home = async (req, res) => {
  res.send("<h1>Vishal</h1>");
};

const create = async (req, res) => {
  const { name, email, image } = req.body;
  const data = await User.create({
    name,
    email,
    image,
  });
  res.status(200).json({
    success: true,
    message: "User Created",
    data,
  });
};


const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const editUser = async (req, res) => {
  try {
    const { name, email, image } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { name: name, email: email, image: image },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

const read = async (req, res) => {
  const data = await User.find();
  res.status(201).send(data);
};

const findone = async ( req,res) => {
   
  try {
   const user = await User.findById(req.params.id)
   if(!user)
   {
     return res.status(404).json({
       message : "User Not Found"
     })
   }

   res.status(200).json({
     message : "User Found",
     user
   })

  }
  catch(error) {
    res.status(501).json({
     message : "Server Error"
    })
  }
}

module.exports = { home, create, read, deleteUser, editUser,findone};
