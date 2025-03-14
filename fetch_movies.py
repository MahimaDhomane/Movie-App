import requests
import json
import random
import time

API_key="43b1926b"
movie_details=[]
count=0
movie_id=set()

try:
    while count<100:
        for page in range(1,30):
            url=f"http://www.omdbapi.com/?apikey={API_key}&s=movie&page={page}"
            response=requests.get(url)
            
            if response.status_code==200:
                data=response.json()
                
                if data["Response"] == "True":
                    movies=data["Search"]
                    if "Search" not in data:
                        continue

                    random.shuffle(movies)  

                    for movie in movies:
                        if len(movie_id) >= 100:
                            break

                        imdb_id=movie["imdbID"]
                        if imdb_id in movie_id:
                            continue
                        
                        movie_url=f"http://www.omdbapi.com/?apikey={API_key}&i={movie['imdbID']}"
                        movie_response=requests.get(movie_url)

                        if movie_response.status_code==200:
                            movies_data=movie_response.json()

                            if movies_data.get("Response") == "False":
                                continue

                            movie={
                                "Title":movies_data.get("Title"),
                                "Poster":movies_data.get("Poster"),
                                "Director":movies_data.get("Director"),
                                "Actors":movies_data.get("Actors"),
                                "Genre":movies_data.get("Genre"),
                                "Plot":movies_data.get("Plot"),
                                "Year":movies_data.get("Year"),
                                "Ratings":movies_data.get("Ratings")
                            }
                            movie_details.append(movie)
                            movie_id.add(imdb_id)
                            count+=1
                            print(f"Fetched {count} movies")
                        
                        time.sleep(2)
except requests.exceptions.RequestException as e:
    print(f"an error occured {e}")        

with open("movies.json","w") as file:
    json.dump(movie_details,file,indent=4)
    print("success")

