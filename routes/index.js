var express = require('express');
var mongoose = require('mongoose');
var Playlist = require('../models/playlist')
var  { google } = require('googleapis');
const youtube = google.youtube({
  version: "v3",
  auth: "AIzaSyAuDufoS-oL1jdo30epc7yA-wXoB_1yxrY",
})
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST create playlist. */
router.post('/create-playlist', async (req, res, next) => {
  try {
  const db = mongoose.connection

  console.log(req.body.playlisturl)

  let response = await youtube.playlistItems.list({
    part: "snippet",
    playlistId: req.body.playlisturl,
  })

  // gets title
  let responses = await youtube.playlists.list({
    part: "snippet",
    id: req.body.playlisturl,
  })

  console.log('response ' + response)

  let tempVideoIds = []

  for (let i = 0; i < response.data.items.length; i++) {
    tempVideoIds.push(response.data.items[i].snippet.resourceId.videoId)
  }

  const playlist = new Playlist({
    title: responses.data.items[0].snippet.title,
    channel: responses.data.items[0].channelTitle,
    thumbnail: responses.data.items[0].snippet.thumbnails.default,
    playlistid: req.body.playlisturl,
    videoids: tempVideoIds,
  })

  db.collection('playlist').save(playlist)

  res.redirect(`/playlist/${req.body.playlisturl}`)
}
catch (err) {
  console.log(err)
  next(err)
}
});

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
    const db = mongoose.connection
    db.collection('playlist')

    Playlist.find()
        .then((result) => {
      console.log(result)
    res.render('dashboard', { playlists: result });
  })
  .catch(err => {
    console.log(err)
  })

});

/* GET create quiz page. */
router.get('/create-quiz', function(req, res, next) {
    // const id = req.params.id;
    res.render('create', { title: 'Express' });
});

/* GET playlist page. */
router.get('/playlist/:id', async (req, res, next) => {
  const id = req.params.id;

    ///returns an array of videos based on given playlist id
    var videos = []
    const respond = await youtube.playlistItems.list({
      part:"snippet",
      playlistId: id, ///this is to be replaced by a variable later that represents the ID of the playlist
    })

    // console.log(respond)
    console.log(respond.data.items[0].snippet)
    // res.send(respond)
    let titles = []
    for (let i = 0; i < respond.data.items.length; i++){
        titles.push(respond.data.items[i].snippet.title)
        videos.push(respond.data.items[i].snippet.resourceId.videoId)
    }

    console.log()
    console.log(videos)
    console.log(titles)

  
    ///turn video ids into embedded video url
    embedded_vids = []
    for (let i = 0; i < videos.length; i++){
      const response = await youtube.videos.list({
        part:'player',
        id: videos[i]
      })

      embedded_vids.push(response.data.items[0].player) /// embedded_vids is a array variable containing embedded url objects
    }

    console.log(embedded_vids)

    res.render('playlist', {iframes: embedded_vids, titles: titles, creator: respond.data.items[0].snippet.videoOwnerChannelTitle})

});

/* GET quiz page. */
router.get('/quiz/:id', function(req, res, next) {
    const id = req.params.id;
    res.render('quiz', { title: 'Express' });
});


module.exports = router;
