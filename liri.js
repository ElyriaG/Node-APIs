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
    let term = process.argv.slice(3);
    let searchThis = term.join("+");
    let queryURL = "https://rest.bandsintown.com/artists/" + searchThis + "/events?app_id=codingbootcamp";

    axios.get(queryURL)
        .then(
            function (response) {
                let bandVenue = response.data[0].venue.name
                let venueLocation = response.data[0].venue.city + ", " + response.data[0].venue.country;
                let eventDateUnfixed = response.data[0].datetime
                let eventDateSliced = eventDateUnfixed.slice(0, 10)
                console.log(eventDateFixed);

            })
        .catch(function (error) {
            console.log(error);
        })
} else if (process.argv[2] === "movie-this") {
    let term = process.argv.slice(3);
    let searchThis = term.join("+");

    let queryURL = "https://www.omdbapi.com/?t=" + searchThis + "&apikey=b77b73a0";

    axios.get(queryURL)
        .then(
            function (response) {
                let movieName = response.data.Title;
                let movieYear = response.data.Year;
                let movieRatingOmdb = response.data.Ratings[0].Value;
                let movieRatingRotten = response.data.Ratings[1].Value;
                let movieCountry = response.data.Country;
                let movieLanguage = response.data.Language;
                let moviePlot = response.data.Plot;
                let movieActors = response.data.Actors

                console.log(`
            Movie: ${movieName}
            Year: ${movieYear}
            Actors: ${movieActors}
            Plot: ${moviePlot}
            Language: ${movieLanguage}
            Country: ${movieCountry}
            Rating (OMDB): ${movieRatingOmdb}
            Rating (Rotten Tomatoes): ${movieRatingRotten}`);

            }
        )
        .catch(function (error) {
            console.log(error);
        })
} else {
    console.log("reads random.txt");
}

