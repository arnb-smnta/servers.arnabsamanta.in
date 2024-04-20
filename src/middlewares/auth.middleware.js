import { AvailableUserRoles } from "../constants";
import { ApiError } from "../utils/ApiError";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "unauthorised request");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await user
      .findById(decodedToken?._id)
      .select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
      );
    if (!user) {
      throw new ApiError(401, "Invalid Access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
