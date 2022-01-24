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
  return {
    username: user.username,
    avatar: user.avatar
  }
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
  const {avatar} = users.find(u => u.username === tweet.username);
  if (tweets.length >= MAX_SIZE) tweets.shift();
  tweets.push({...tweet, avatar});
  res.status(OK).send("OK");
});
app.get("/tweets/:username?", (req, res) => {
  let username =  req.params.username;
  console.log(username);
  let messages = (username !== undefined) 
    ? tweets.filter(t => t.username === username) 
    : tweets;
  res.send(messages);
});


app.listen(port);