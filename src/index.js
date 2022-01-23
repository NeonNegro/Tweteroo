import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

const users = [];
const tweets = [];
const MAX_SIZE = 10;

function newUser(user) {
  return { ...user };
}

app.post("/sign-up", (req, res) => {
  const user = req.body;
  users.push(newUser(user));
  res.send("OK");
  
});
app.post("/tweets", (req, res) => {
  const tweet = req.body;
  if (tweets.length >= MAX_SIZE) tweets.shift();
  tweets.push(tweet);
  res.send("OK");
});
app.get("/tweets", (req, res) => {
  const messages = tweets.map((t) => {
    t["avatar"] = users.find((u) => u.username === t.username).avatar;
    return t;
  });
  res.send(messages);
});


app.listen(port);