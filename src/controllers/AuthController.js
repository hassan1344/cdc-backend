import Auth from "../models/Auth.js";
import CustomSuccess from "../utils/customResponse/customSuccess.js";
import CustomError from "../utils/customResponse/customError.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

const signUp = async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await Auth.query().findOne({ email });
    if (existingUser) throw CustomError.badRequest("User already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = await Auth.query().insert({
      email,
      password: hashedPassword,
      role,
    });

    return next(CustomSuccess.created(newUser, "User created successfully"));
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await Auth.query().findOne({ email });
    if (!user) throw CustomError.badRequest("Invalid credentials");

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = await generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return next(
      CustomSuccess.createSuccess(
        {
          user: { id: user.id, email: user.email, role: user.role },
          token,
        },
        "Login successful",
        200
      )
    );
  } catch (err) {
    next(err);
  }
};

const AuthController = {
  signUp,
  login,
};
export default AuthController;
