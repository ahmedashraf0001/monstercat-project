const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/deezer", async (req, res) => {
  const { Title } = req.query;
  try {
    const response = await axios.get(`https://api.deezer.com/search/album?q=${Title}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching album data" });
  }
});

app.get("/api/tracklist", async (req, res) => {
  const { url } = req.query; 
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tracklist data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
