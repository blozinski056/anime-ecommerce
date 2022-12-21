require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// USER ROUTES

// create user
app.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
      [username, password]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    res.json({ duplicate: "duplicate" });
  }
});

// get all users
app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a user
app.get("/api/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await pool.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// change user's password
app.put("/api/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { oldPassword, newPassword } = req.body;
    await pool.query(
      "UPDATE users SET password = $1 WHERE username = $2 AND password = $3",
      [newPassword, username, oldPassword]
    );
    res.json(`${username}'s password was updated!`);
  } catch (err) {
    console.error(err.message);
  }
});

// delete user
app.delete("/api/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { password } = req.body;
    await pool.query("DELETE FROM cart WHERE username = $1", [username]);
    await pool.query(
      "DELETE FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    res.json(`User ${username} was deleted`);
  } catch (err) {
    console.error(err.message);
  }
});

// CART ROUTES

// add to cart
app.post("/api/users/:username/cart", async (req, res) => {
  try {
    const { username } = req.params;
    const { itemid, size, quantity } = req.body;
    const newItem = await pool.query(
      "INSERT INTO cart(username, itemid, size, quantity) VALUES($1, $2, $3, $4) RETURNING *",
      [username, itemid, size, quantity]
    );
    res.json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all user's items
app.get("/api/users/:username/cart", async (req, res) => {
  try {
    const { username } = req.params;
    const usersCart = await pool.query(
      "SELECT * FROM cart WHERE username = $1",
      [username]
    );
    res.json(usersCart.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get an item
app.get("/api/users/:username/cart/:itemid", async (req, res) => {
  try {
    const { username, itemid } = req.params;
    const { size } = req.body;
    const item = await pool.query(
      "SELECT * FROM cart WHERE username = $1 AND itemid = $2 AND size = $3",
      [username, itemid, size]
    );
    res.json(item.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// change quantity of item
app.put("/api/users/:username/cart/:itemid", async (req, res) => {
  try {
    const { username, itemid } = req.params;
    const { size, quantity } = req.body;
    const item = await pool.query(
      "UPDATE cart SET quantity = $1 WHERE username = $2 AND itemid = $3 AND size = $4 RETURNING *",
      [quantity, username, itemid, size]
    );
    res.json(item.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete an item
app.delete("/api/users/:username/cart/:itemid", async (req, res) => {
  try {
    const { username, itemid } = req.params;
    const { size } = req.body;
    await pool.query(
      "DELETE FROM cart WHERE username = $1 AND itemid = $2 AND size = $3",
      [username, itemid, size]
    );
    res.json(`Removed all of item ${itemid}`);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
