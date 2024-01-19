const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const getLyrics = require("./lib/getLyrics");
const getSong = require("./lib/getSong");
const app = express();
const port = 3000;
const cors = require("cors");
const searchSong = require("./lib/searchSong");
const getSongById = require('./lib/getSongById')
app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/", async (req, res) => {
  const options = {
    apiKey: "rqJLvAfvBfA-2sm7daZxqwqoGEVIAO6__uMFuE3WsUrkx5Na0N_X2WpwsR-kipmW",
    title: req.body.song,
    artist: req.body.artist,
    optimizeQuery: true,
  };
  const song = await searchSong(options);
  // let songs = song.filter((s) => s.title.strartsWith(req.body.song))
  // console.log(songs);
  let perfectMatch = [];
  // let index = 0;
  let suggest = []; 
  for(let i = 0; i < song.length; i++){
    if(song[i].title.startsWith(req.body.song)){
      console.log("perfect match song title : ", song[i].title);
      perfectMatch.push(song[i]);
    }else{
      suggest.push(song[i]);
    }
  }
  // song.forEach((s) => {
  //   if(s.title.startsWith(req.body.song)){
  //     console.log(s.title);
  //     perfectMatch.push(song.pop(s));
  //   }
  // })
  // console.log(perfectMatch);
  // console.log(suggest);
  console.log("perfect match : ", perfectMatch);
  let songs = perfectMatch.concat(suggest);
  console.log("song : ");
  console.log("song original array : ", song);

  console.log("Final array: ", songs);
  // console.log(typeof JSON.stringify(songs)); 
  res.json(songs);
});

app.post("/lyrics", async (req, res) => {
  console.log("req.body : ", req.body);
  console.log("song id : ",req.body.songId);
  const options = {
    id: req.body.songId,
    apiKey: "rqJLvAfvBfA-2sm7daZxqwqoGEVIAO6__uMFuE3WsUrkx5Na0N_X2WpwsR-kipmW",
    title: req.body.song,
    artist: req.body.artist,
    optimizeQuery: true,
  };
  let id = req.body.songId;
  let apiKey =  "rqJLvAfvBfA-2sm7daZxqwqoGEVIAO6__uMFuE3WsUrkx5Na0N_X2WpwsR-kipmW";
  try{
    const song = await getSongById(id, apiKey);
    console.log(song);
    res.json(song);
  }catch(e){
    res.send("Some error occurred");
    console.log(e);
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});