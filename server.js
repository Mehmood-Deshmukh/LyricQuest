// const express = require("express");
// const bodyParser = require("body-parser");
// const axios = require("axios");
// const getLyrics = require("./lib/getLyrics");
// const getSong = require("./lib/getSong");
// const app = express();
// require('dotenv').config();
// const port = 3000;
// const cors = require("cors");
// const searchSong = require("./lib/searchSong");
// const getSongById = require('./lib/getSongById')
// app.use(cors());

// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("hello");
// });
// app.post("/", async (req, res) => {
//   const options = {
//     apiKey: process.env.KEY,
//     title: req.body.song,
//     artist: req.body.artist,
//     optimizeQuery: true,
//   };
//   try{
//     const song = await searchSong(options);
//       let perfectMatch = [];
    
//       let suggest = []; 
//       for(let i = 0; i < song.length; i++){
//         if(song[i].title.startsWith(req.body.song)){
//           console.log("perfect match song title : ", song[i].title);
//           perfectMatch.push(song[i]);
//         }else{
//           suggest.push(song[i]);
//         }
//       }
    
//       console.log("perfect match : ", perfectMatch);
//       let songs = perfectMatch.concat(suggest);
//       console.log("song : ");
//       console.log("song original array : ", song);
    
//       console.log("Final array: ", songs);
      
//       res.json(songs);
//   }catch(error){
//     res.json({error: "No songs found that match your search request...."})
//   }
// });

// app.post("/lyrics", async (req, res) => {
//   console.log("req.body : ", req.body);
//   console.log("song id : ",req.body.songId);
//   const options = {
//     id: req.body.songId,
//     apiKey: process.env.KEY,
//     title: req.body.song,
//     artist: req.body.artist,
//     optimizeQuery: true,
//   };
//   let id = req.body.songId;
//   let apiKey =  process.env.KEY;
//   try{
//     const song = await getSongById(id, apiKey);
//     console.log(song);
//     res.json(song);
//   }catch(e){
//     res.json("error: No such song");
//     console.log(e);
//   }
// })

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
