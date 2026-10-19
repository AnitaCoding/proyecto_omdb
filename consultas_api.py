import requests as consulta
from apikey import APIKEY as apiKey

def get_movies(title):
    movies = consulta.get(f"http://www.omdbapi.com/?s={title}&type=movie&apikey={apiKey}")
    movies_list = movies.json()
    return movies_list

def get_movies_by_year(title, year):
    movies = consulta.get(f"http://www.omdbapi.com/?s={title}&type=movie&y={year}&apikey={apiKey}")
    movies_list = movies.json()
    return movies_list

def get_movie_by_id(imdb_id):
    movie = consulta.get(f"http://www.omdbapi.com/?i={imdb_id}&apikey={apiKey}")
    selected_movie = movie.json()
    return selected_movie

