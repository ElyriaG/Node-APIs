require("dotenv").config();

const axios = require("axios");
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");

let term = process.argv.slice(3);
let searchThis = term.join(" ");

if (process.argv[2] === "spotify-this") {
var spotify = new Spotify(keys.spotify);

spotify
    .search({
        type: 'track',
        query: searchThis,
        limit: 1
    })
    .then(function (response) {
        let songInfo = response;
        let artistName = songInfo.tracks.items[0].artists[0].name
        let songName = songInfo.tracks.items[0].name;
        let songLink = songInfo.tracks.items[0].href
        let albumName = songInfo.tracks.items[0].album.name

        
        console.log(`
        Song: ${songName}
        Artist: ${artistName}
        Album: ${albumName}
        Link: ${songLink}`);
    })
    .catch(function (err) {
        console.log(err);
    });
} else if (process.argv[2] === "concert-this") {
    console.log("bandsintown");
} else if (process.argv[2] === "movie-this") {
    let term = process.argv.slice(3);
    let searchThis = term.join("+");

var queryURL = "https://www.omdbapi.com/?t=" + searchThis + "&apikey=b77b73a0";

axios.get(queryURL)
    .then(
        function (response) {
            // let movieName = response.data.Title;
            // let movieYear = response.data.Year;
            let movieRating = JSON.stringify(response.data.Ratings);

            console.log(movieRating);
            // console.log("The movie's rating is: " + response.data.imdbRating);
        }
    )
    .catch(function(error) {
        console.log(error);
})
} else {
    console.log("reads random.txt");
}

