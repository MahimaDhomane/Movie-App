let movies_per_page=20;
let current_page=1;
let total_pages=0;
let moviesdata=[];

function displaymovies(current_page){

    const startIndex=(current_page-1)*movies_per_page;
    const endIndex=startIndex+movies_per_page;
    const movies_show=moviesdata.slice(startIndex,endIndex);
      
      const container=document.getElementById("container");
      container.innerHTML="";
    
      movies_show.forEach(movie =>{
        const moviecard=document.createElement("div");
        moviecard.classList.add("movie_card");
    
        moviecard.innerHTML=`
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        `;
    
        moviecard.addEventListener("click", ()=>{
            window.location.href=`details.html?title=${encodeURIComponent(movie.Title)}`;
        });
    
        container.appendChild(moviecard);
      });
      pagination();
    }

async function fetchMovies() {
    try {
        const response = await fetch("http://localhost:5500/movies.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        moviesdata = await response.json();
        totalMovies=moviesdata.length ;
        displaymovies(current_page); 
    } catch (error) {
        console.error("Error fetching JSON:", error);
    }
}

function pagination(){
    document.getElementById("prev").disabled=current_page===1;
    document.getElementById("next").disabled=current_page*movies_per_page>=totalMovies;
}

document.getElementById("prev").addEventListener("click",()=>{
    if(current_page>1){
        current_page--;
        displaymovies(current_page);
    }
});

document.getElementById("prev").addEventListener("click",()=>{
    if(current_page*movies_per_page < totalMovies){
        current_page++;
        displaymovies(current_page);
    }
});

fetchMovies();

