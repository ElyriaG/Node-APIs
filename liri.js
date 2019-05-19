require("dotenv").config();

const axios = require("axios");
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const moment = require("moment")

let term = process.argv.slice(3);
let searchThis = term.join(" ");


//SPOTIFY
if (process.argv[2] === "spotify-this") {
    if (!searchThis) {
        var spotify = new Spotify(keys.spotify);
        spotify
            .search({
                type: 'track',
                query: "The sign",
                limit: 20
            })
            .then(function (response) {
                let songInfo = response.tracks.items[7];
                let artistName = songInfo.artists[0].name
                let songName = songInfo.name;
                let songLink = songInfo.href;
                let albumName = songInfo.album.name;

                
                console.log(artistName)
                    console.log(`
                Song: ${songName}
                Artist: ${artistName}
                Album: ${albumName}
                Link: ${songLink}`);
            })
            .catch(function (err) {
                console.log(err);
            });
    } else {
        var spotify = new Spotify(keys.spotify);

        spotify
            .search({
                type: 'track',
                query: searchThis,
                limit: 1
            })
            .then(function (response) {
                let songInfo = response.tracks.items[0];
                let artistName = songInfo.artists[0].name
                let songName = songInfo.name;
                let songLink = songInfo.href;
                let albumName = songInfo.album.name;


                console.log(`
        Song: ${songName}
        Artist: ${artistName}
        Album: ${albumName}
        Link: ${songLink}`);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}
//BANDSINTOWN
else if (process.argv[2] === "concert-this") {
    let term = process.argv.slice(3);
    let searchThis = term.join("+");
    let queryURL = "https://rest.bandsintown.com/artists/" + searchThis + "/events?app_id=codingbootcamp";

    axios.get(queryURL)
        .then(
            function (response) {
                let bandVenue = response.data[0].venue.name;
                let venueLocation = response.data[0].venue.city + ", " + response.data[0].venue.country;
                let eventDateUnfixed = response.data[0].datetime;
                let eventDateSliced = eventDateUnfixed.slice(0, 10);
                let eventDate = moment(eventDateSliced).format("MM/DD/YYYY");

                console.log(`
                Name of Venue: ${bandVenue}
                Venue Location: ${venueLocation}
                Date of Event: ${eventDate}`);

            })
        .catch(function (error) {
            console.log(error);
        })
}
//OMDB
else if (process.argv[2] === "movie-this") {
    let term = process.argv.slice(3);
    let searchThis = term.join("+");

    let queryURL = "https://www.omdbapi.com/?t=" + searchThis + "&apikey=b77b73a0";

    axios.get(queryURL)
        .then(
            function (response) {
                let nickname = response.data
                let movieName = nickname.Title;
                let movieYear = nickname.Year;
                let movieRatingOmdb = nickname.Ratings[0].Value;
                let movieRatingRotten = nickname.Ratings[1].Value;
                let movieCountry = nickname.Country;
                let movieLanguage = nickname.Language;
                let moviePlot = nickname.Plot;
                let movieActors = nickname.Actors

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
}
//TEXT READ
else {
    console.log("reads random.txt");
}

