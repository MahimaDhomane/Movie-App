let API_key="43b1926b";
let movies=[];

fetch("movies.json")
.then(response => response.json())
.then(data=>{
    movies=data;
})
.catch(error=>console.error("error loading movies",error));

let inputsearch=document.getElementById('search');
let datalist = document.getElementById("movieSuggestions");

inputsearch.addEventListener("input",function() {
  let inputs=this.value.toLowerCase();
 
  if (!datalist) {
    console.error("Datalist not found.");
    return;
  }
  datalist.innerHTML = "";
  if(inputs.length<3) return; 

  let filtervalue=movies.filter(movie => movie.Title && movie.Title.toLowerCase().includes(inputs));

  if(filtervalue.length===0)
  {
        fetch(`http://www.omdbapi.com/?apikey=${API_key}&s=${encodeURIComponent(inputs)}`)
        .then(response => response.json())
        .then(data=>{
            if(data.Search){
                data.Search.forEach(movie =>{
                  let option = document.createElement("option");
                  option.value = movie.Title; 
                  datalist.appendChild(option);
                });
            }
            })
        .catch(error=>console.error("error loading movies",error));
  }
  else{
    filtervalue.forEach(movie => {
        let option = document.createElement("option");
        option.value = movie.Title;
        datalist.appendChild(option);
    });
  }
}); 

 
inputsearch.addEventListener("change",()=>{
    let selectedtitle=inputsearch.value.trim();
    console.log(selectedtitle);
    fetch(`http://www.omdbapi.com/?apikey=${API_key}&t=${encodeURIComponent(selectedtitle)}`)
    .then(response => response.json())
    .then(data=>{
        if(data.Response==="True"){
        window.location.href=`details.html?title=${encodeURIComponent(selectedtitle)}`;
        }
        else{
            alert("Movie not found");
        }
    })
    .catch(error => console.log("error loading movies",error));
});
