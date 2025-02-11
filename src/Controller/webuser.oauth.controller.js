export const googleOauthController = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    if (!email || !username) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    let user;
    if (existingUser.rows.length >= 1) {
      user = existingUser.rows[0];
    } else {
      const query = `
          INSERT INTO users (username, email, phoneNumber) 
          VALUES ($1, $2, $3) 
          RETURNING *;
        `;
      const values = [username, email, phoneNumber];
      const result = await pool.query(query, values);
      user = result.rows[0];
    }

    const token = jwt.sign({ id: user._id }, process.env.SecretKey, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: user
        ? "User logged in successfully."
        : "User created successfully.",
      data: user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
