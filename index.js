import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    var activity = req.body.activity;
    var participants = req.body.participants;
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?activity=${activity}&participants=${participants}`);
    const postReq = response.data
    res.render("index.ejs", {data : postReq[Math.floor(Math.random() * postReq.length)]})
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {error: "No activities that match your criteria.",});
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
