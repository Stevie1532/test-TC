import express from "express";
import User from "../models/user.mjs";

const router = express.Router();

//   @openapi
//   /api/users/register:
//     post:
//       summary: Register a new user
//       tags: [Users]
//       requestBody:
//         required: true
//         content:
//           application/json:
//             schema:
//               $ref: "#/components/schemas/User"
//       responses:
//         201:
//           description: User registered successfully
//           content:
//             application/json:
//               schema:
//                 $ref: "#/components/schemas/User"
//         400:
//           description: Bad request (e.g., missing fields)

// Register a new user
router.post("/register", async (req, res) => {
  const { username, words, location } = req.body;

  try {
    const newUser = new User({
      username,
      words,
      location: {
        type: "Point",
        coordinates: location,
      },
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @openapi
//  /api/users/find:
//    get:
//      summary: Find active users within a 20-meter radius
//      tags: [Users]
//      parameters:
//        - in: query
//          name: longitude
//          schema:
//            type: number
//          required: true
//          example: -73.935242
//        - in: query
//          name: latitude
//          schema:
//            type: number
//          required: true
//          example: 40.730610
//      responses:
//        200:
//          description: List of active users
//          content:
//            application/json:
//              schema:
//                type: array
//                items:
//                  $ref: "#/components/schemas/User"
//        500:
//          description: Server error

// Find active users within a 20-meter radius
router.get("/find", async (req, res) => {
  const { longitude, latitude } = req.query;

  try {
    const users = await User.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 20, // 20 meters
        },
      },
      isActive: true,
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
