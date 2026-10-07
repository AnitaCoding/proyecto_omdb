import requests as consulta

def get_movies(title, apiKey):
    movies = consulta.get(f"http://www.omdbapi.com/?s={title}&type=movie&apikey={apiKey}")
    movies_list = movies.json()
    return movies_list

def get_movies_by_year(title, year, apiKey):
    movies = consulta.get(f"http://www.omdbapi.com/?s={title}&type=movie&y={year}&apikey={apiKey}")
    movies_list = movies.json()
    return movies_list

def get_movie_by_id(imdb_id, apiKey):
    movie = consulta.get(f"http://www.omdbapi.com/?i={imdb_id}&apikey={apiKey}")
    selected_movie = movie.json()
    return selected_movie

