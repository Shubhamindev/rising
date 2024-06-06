const Profile =require("./models/Profile");
const User = require("./models/User");;
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");


dotenv.config();
const PORT = process.env.PORT || 10000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:process.env.SITEURL,
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//def route

app.post("/signUp",async (req, res) => {
	try {
	  // Destructure fields from the request body
	  const {
		firstName,
		lastName,
		email,
		password,
		confirmPassword,
		accountType,
		contactNumber,
		otp,
	  } = req.body;
	  // Check if All Details are there or not
	  if (
		!firstName ||
		!lastName ||
		!email ||
		!password ||
		!confirmPassword ||
		!otp
	  ) {
		return res.status(403).send({
		  success: false,
		  message: "All Fields are required",
		});
	  }
	  // Check if password and confirm password match
	  if (password !== confirmPassword) {
		return res.status(400).json({
		  success: false,
		  message:
			"Password and Confirm Password do not match. Please try again.",
		});
	  }
  
	  // Check if user already exists
	  const existingUser = await User.findOne({ email });
	  if (existingUser) {
		return res.status(400).json({
		  success: false,
		  message: "User already exists. Please sign in to continue.",
		});
	  }
  
	  // Find the most recent OTP for the email
	  const response = ["123123"]
	  console.log(response);
	  if (response.length === 0) {
		// OTP not found for the email
		return res.status(400).json({
		  success: false,
		  message: "The OTP is not valid",
		});
	  } else if (otp !== 123123) {
		// Invalid OTP
		return res.status(400).json({
		  success: false,
		  message: "The OTP is not valid",
		});
	  }
  
	  // Hash the password
	  const hashedPassword = await bcrypt.hash(password, 10);
  
	  // Create the user
	  let approved = "";
	  approved === "Instructor" ? (approved = false) : (approved = true);
  
	  // Create the Additional Profile For User
	  const profileDetails = await Profile.create({
		gender: null,
		dateOfBirth: null,
		about: null,
		contactNumber: null,
	  });
	  const user = await User.create({
		firstName,
		lastName,
		email,
		contactNumber,
		password: hashedPassword,
		accountType: accountType,
		approved: approved,
		additionalDetails: profileDetails._id,
		image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
	  });
  
	  return res.status(200).json({
		success: true,
		user,
		message: "User registered successfully",
	  });
	} catch (error) {
	  console.error(error);
	  return res.status(500).json({
		success: false,
		message: "User cannot be registered. Please try again.",
	  });
	}
  })
  

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

