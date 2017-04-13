var Twitter = require('twitter');
var request = require("request");
var spotify = require("spotify");
var keys = require("./keys.js");
var fs = require("fs");

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

//twitter stuff
if (process.argv[2] === "my-tweets"){
    var params = {screen_name: 'Zachary_f_Smith'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for(i=0;i<20;i++){
            console.log(tweets[i].text);
            console.log("Created on: " + tweets[i].created_at);
        }
      }
    });
}

//spotify stuff
if (process.argv[2] === "spotify-this-song" || process.argv[2] === "do-what-it-says"){
    
    var input = "";
    if(process.argv[2] === "do-what-it-says"){
        fs.readFile("random.txt", "utf8", function(error,data){
            var dataIn = data.split(",");
            input = dataIn[1].replace(/['"]+/g,'');
            search();
        })
    }else{
        for(i=3;i<process.argv.length;i++){ 
            input = input + process.argv[i] + " ";
        } 
        search();
    }
    function search(){
        spotify.search({ type: 'track', query: input }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
            for(i=0;i<data.tracks.items.length;i++){
                if(data.tracks.items[i].name+" " === input){
                console.log(data.tracks.items[i].album.artists[0].name);
                console.log(data.tracks.items[i].name);
                console.log(data.tracks.items[i].preview_url);
                console.log(data.tracks.items[i].album.name);
                process.exit();
                }   
            }
            console.log(data.tracks.items[0].album.artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url);
            console.log(data.tracks.items[0].album.name);  
        });
    }
}

//OMDB stuff
if (process.argv[2] === "movie-this"){
    var input = "";
    for(i=3;i<process.argv.length;i++){ 
        input = input + process.argv[i] + " ";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&r=json";
    request(queryUrl, function(error, response, body){
        if(!error && response.statusCode === 200){ 
            var movie = JSON.parse(body);
            console.log(movie.Title);
            console.log(movie.Ratings[0].Value);
            console.log(movie.Country);
            console.log(movie.Language);
            console.log(movie.Plot);
            console.log(movie.Actors);
            console.log(movie.Ratings[1].Value);
            console.log(movie.Ratings[2].Value);
        }
    })
}

if (process.argv[2] === "do-what-it-says"){

}