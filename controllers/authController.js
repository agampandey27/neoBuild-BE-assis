import jwt from "jsonwebtoken";

const preDefinedUser = {
    username: "naval.ravikant",
    password: "05111974"
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (username !== preDefinedUser.username || password !== preDefinedUser.password) {
        return res.status(402).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ JWT: token });
};