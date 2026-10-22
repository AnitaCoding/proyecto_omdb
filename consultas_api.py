import requests as consulta
from apikey import APIKEY as apiKey

#Obtiene películas por título
def get_movies(title:str):
    movies = consulta.get(f"http://www.omdbapi.com/?s={title}&type=movie&apikey={apiKey}")
    movies_list = movies.json()
    return movies_list

#Obtiene películas por año
def get_movies_by_year(title:str, year:str):
    movies = consulta.get(f"http://www.omdbapi.com/?s={title}&type=movie&y={year}&apikey={apiKey}")
    movies_list = movies.json()
    return movies_list

#Obtiene películas por id
def get_movie_by_id(imdb_id:str):
    movie = consulta.get(f"http://www.omdbapi.com/?i={imdb_id}&apikey={apiKey}")
    selected_movie = movie.json()
    return selected_movie

