const User=require('../models/user')

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field?.trim() === "")) {
      return  res.status(400).json({ Success: false, message: "All fields are required" });
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(409).json({ Success: false, message: "User with this email already exist" });
    }

    const createdUser = await User.create(req.body)

    return res.status(200).json({Success:true,message:"User registered successfully",createdUser})


  } catch (err) {
    res.status(500).json({ Success: false, message: "Something went wrong" });
    console.log(err);
  }
};

const Login =async (req, res) =>{

    try{
        const {email, password} = req.body

      if ([email, password].some((field) => field?.trim() === "")) {
        return  res.status(400).json({ Success: false, message: "All fields are required" });
      }
    

    const user = await User.findOne({email})

    if (!user) {
        return  res.status(404).json({ Success: false, message: "User doesn't exist" });
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    return  res.status(401).json({ Success: false, message: "Invalid Credentials" });
    }

//    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password")

    return  res.status(200).json({ Success: true, message: "User logged in Successfully", loggedInUser });

    // const options = {
    //     httpOnly: true,
    //     secure: true
    // }

    // return res
    // .status(200)
    // .cookie("accessToken", accessToken, options)
    // .cookie("refreshToken", refreshToken, options)
    // .json(
    //     new ApiResponse(
    //         200, 
    //         {
    //             user: loggedInUser, accessToken, refreshToken
    //         },
    //         "User logged In Successfully"
    //     )
    // )
    }
    catch(err){
        res.status(500).json({ Success: false, message: "Something went wrong" });
        console.log(err);
    }

}

module.exports={Register,Login}
