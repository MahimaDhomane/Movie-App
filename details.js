let API_key="your_api_key";

function getQueryParam(param){
    let urlparam= new URLSearchParams(window.location.search);
    return urlparam.get(param);
}

let movieTitle= getQueryParam("title");
console.log(movieTitle);

if(movieTitle){
    fetch("http://localhost:5500/movies.json")
    .then(response =>response.json())
    .then(movies=>{
        let movie= movies.find(m=> m.Title.trim().toLowerCase()===movieTitle.toLowerCase());
        if(movie){
            displaymovies(movie);
        }
        else{
            fetch(`http://www.omdbapi.com/?apikey=${API_key}&t=${encodeURIComponent(movieTitle)}`)
            .then(response =>response.json())
            .then(movies=>{
            if(movies.Response==="True"){
                console.log(movies);
                displaymovies(movies);
            }
            })
            .catch(error => console.error("error fetching details",error));
            }
    })
    .catch(error => console.error("error fetching details",error));
}
else{
    alert("movie not found");
}

function displaymovies(movie){
    if(movie){
        let rating = movie.Ratings && movie.Ratings.length > 1 ? movie.Ratings[1].Value : movie.Ratings;
        document.getElementById("movieDetails").innerHTML=
        `<h2>Movie Name: ${movieTitle}</h2>
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h3>Director :${movie.Director}</h3>
        <h3>Actors :${movie.Actors}</h3>
        <h3>Genre :${movie.Genre}</h3>
        <p><strong>Plot :${movie.Plot}</strong></p>
        <h3>Year :${movie.Year}</h3>
        <h3>Ratings :${rating}</h3>`;
    }
}

document.getElementById('back').addEventListener('click', ()=> {
    window.history.back();
});
