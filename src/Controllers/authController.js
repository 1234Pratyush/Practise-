const authModel = require("./src/models/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.registerUser =  async(req,res) =>{

 const { email, password } = req.body;
  try {
    const user = await authModel.findOne({ email });
    if (user) return res.send("User with this email already exists!");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        await authModel.create({ email, password: hash });
        res.redirect("/sign-in");
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

exports.loginUser = async(req,res) =>{
      const { email, password } = req.body;
      try {
        const user = await authModel.findOne({ email });
        if (!user) return res.send(" User not found. Please register first.");
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.send(" Incorrect password.");
    
        //  Create and store JWT token in cookie
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/create"); 
      } catch (err) {
        res.send(err.message);
      }
    };

    exports.logoutUser = async(req,res) =>{

      res.clearCookie("token");
  res.redirect("/sign-in");
};