import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiErrors.js"
import { User } from "../models/user.model.js"
import { uploadOnCloundinary } from "../utils/cloudnary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asynchandler(async (req, res) => {

    //get user details from frontend
    const { fullname, username, email, password } = req.body
    console.log("email", email)
    //validation--not empty
    /* if(fullname === ""){
         throw new ApiError (408,"fullname is requried")
     }*/
    if (
        [fullname, username, email, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are requried")
    }

    // check if already exits
    const existedUser =await User.findOne({
        $or:[{ username},{email}]
    })
    if (existedUser) {
        throw new ApiError(409, "user with email or username")
    }
    // check  for image and avtar

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is requried")
    }
    // upload them cloudinary avatar
    const avatar = await uploadOnCloundinary(avatarLocalPath)
    const coverImage = await uploadOnCloundinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "avatar files is requried")
    }

    // create user object
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password,
    })
    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createUser){
        throw new ApiError(500,"somthing went worong while registering the user")
    }
    // remove password and refresh token field from response
    //check for user creation
    // return res
    return res.status(201).json(
        new ApiResponse(200,createUser,"created user successfully")
    )
})

export { registerUser }