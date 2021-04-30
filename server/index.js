const path = require("path");
const express = require("express");
const axios = require("axios");

const app = express();
const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.get("/reddit/auth", async (req, res) => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", process.env.REDDIT_USERNAME);
  params.append("password", process.env.REDDIT_PASSWORD);

  const { data } = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    params,
    {
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.CLIENT_SECRET,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res.json({ accessToken: data.access_token });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.listen(port, () => {
  console.log("Server is up!");
});
