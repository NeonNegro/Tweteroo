import express from "express";
import cors from 'cors';
import { hasEmpty, BAD_REQUEST, OK, MAX_SIZE } from "./utils.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

const users = [];
const tweets = [];


function newUser(user) {
  return { ...user };
}






app.post("/sign-up", (req, res) => {
  const user = req.body;
  const test = Object.keys(user);
  if(test.length !== 2 
    || test.find(t => t === 'username') === undefined 
    || test.find(t => t === 'avatar') === undefined
    || hasEmpty(user)
  )
    res.status(BAD_REQUEST).send("Todos os campos são obrigatórios!");
    
  users.push(newUser(user));
  res.status(OK).send("OK");
  
});
app.post("/tweets", (req, res) => {
  const tweet = req.body;
  if (tweets.length >= MAX_SIZE) tweets.shift();
  tweets.push(tweet);
  res.status(OK).send("OK");
});
// app.get('/sample/:id', routes.sample);
app.get("/tweets/:username?", (req, res) => {
  let username =  req.params.username;
  console.log(username);
  let messages = (username !== undefined) ? tweets.filter(t => t.username === username) : tweets;
  // messages = tweets.map((t) => {
  //   t["avatar"] = users.find((u) => u.username === t.username).avatar;
  //   return t;
  // });
  res.send(messages);
});


app.listen(port);