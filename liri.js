require("dotenv").config();

const axios = require("axios");
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");


if (process.argv[2] === "spotify-this") {
var spotify = new Spotify(keys.spotify);

spotify
    .search({
        type: 'artist',
        query: 'the word alive',
        limit: 5
    })
    .then(function (response) {
        console.log(response);
        console.log(response.artists.items)
    })
    .catch(function (err) {
        console.log(err);
    });
} else if (process.argv[2] === "concert-this") {
    console.log("bandsintown");
}

// // OMDB ajax
// var title = "the dark knight";
// var queryURL = "https://www.omdbapi.com/?t=" + title + "&apikey=b77b73a0";

// axios.get(queryURL)
//     .then(
//         function (response) {
//             console.log("The movie's rating is: " + response.data.imdbRating);
//         }
//     );